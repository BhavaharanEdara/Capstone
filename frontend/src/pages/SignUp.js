import React, { useEffect } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, createUser } from '../features/users/userSlice';

let schema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required"),
  username: Yup.string().required("User name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^\91\d{10}$/, "Phone number must be in the format +91XXXXXXXXXX")
    .required("Phone number is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const {user,error} = useSelector(state=>state.user);
  
  const navigate = useNavigate();
  const form = useFormik({
    initialValues:{
      fullname:"",
      username:"",
      email:"",
      phone:"",
      password:""
    },
    validationSchema:schema,
    onSubmit:(values)=>{
      dispatch(createUser(values))
    }
  })

  useEffect(()=>{
    if(error){
      dispatch(clearError);
      return;
    }
    if (user) {
      navigate('/emailVerify');
    }
  },  [error, user, dispatch, navigate])

  useEffect(()=>{
    if(user){
      navigate("/emailVerify");
    }
  },[])

  return (
    <div>
        <Header/>
        <div className='bg-color'>
        <div className="container h-screen">
            <form className=' col-md-5 col-8 mt-5 px-3 px-md-4 py-5 bg-white rounded text-center'  onSubmit={form.handleSubmit}>
                <h5 className='text-center py-2'>SignUp</h5>
                
                <input
                  className='w-100 px-2 py-1 rounded-1  border border-secondary'
                  placeholder='FullName'
                  onChange={form.handleChange("fullname")}
                  onBlur={form.handleBlur}
                  value={form.values.fullname}
                />
                <div className="text-danger text-sm pb-3">{form.touched.fullname && form.errors.fullname}</div>
                
                <input
                  className='w-100 px-2 py-1 rounded-1  border border-secondary'
                  placeholder='UserName'
                  onChange={form.handleChange("username")}
                  onBlur={form.handleBlur}
                  value={form.values.username}
                />
                <div className="text-danger text-sm pb-3">{form.touched.username && form.errors.username}</div>
                
                <input
                  className='w-100 px-2 py-1 rounded-1  border border-secondary'
                  placeholder='example@gmail.com'
                  onChange={form.handleChange("email")}
                  onBlur={form.handleBlur}
                  value={form.values.email}
                />
                <div className="text-danger text-sm pb-3">{form.touched.email && form.errors.email}</div>
                
                <input
                  className='w-100 px-2 py-1 rounded-1  border border-secondary'
                  placeholder='+91 XXXXXXXXXX'
                  type='number'
                  onChange={form.handleChange("phone")}
                  onBlur={form.handleBlur}
                  value={form.values.phone}
                />
                <div className="text-danger text-sm pb-3">{form.touched.phone && form.errors.phone}</div>
                
                <input
                  className='w-100 px-2 py-1 rounded-1 border border-secondary'
                  placeholder='********'
                  type="password"
                  onChange={form.handleChange("password")}
                  onBlur={form.handleBlur}
                  value={form.values.password}
                />
                <div className="text-danger text-sm pb-3">{form.touched.password && form.errors.password}</div>
                
                <button className='mt-3 btn btn-secondary w-100 bg-btn text-white border-0' type='submit'>Signup</button>
                {error&&<div className="text-danger text-sm pb-2">{error}</div>}
                <Link to="/login" className='mt-1'>Already have an account? >></Link>
            </form>
        </div>
        </div>
    </div>
  )
}

export default SignUp;
