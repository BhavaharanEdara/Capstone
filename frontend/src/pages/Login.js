import React, { useEffect } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, loginUser } from '../features/users/userSlice';


const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
})
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, error} = useSelector(state=>state.user)
  const form = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validationSchema:schema,
    onSubmit:(values)=>{
      dispatch(loginUser(values));
    }
  })
  useEffect(()=>{
    if (error) {
      return () => {
          dispatch(clearError());
      };
    }
    if(user){
      navigate("/profile")
    }
  }, [error, user, navigate, dispatch]);

  useEffect(()=>{
    if(user){
      navigate("/profile")
    }
  },[])
  return (
    <div>
        <Header/>
        <div className='bg-color'>
        <div className="container h-screen">
            <form className=' col-md-5 col-8 mt-5 px-3 px-md-4 py-5 bg-white rounded text-center'  onSubmit={form.handleSubmit}>
                <h5 className='text-center py-2'>Login</h5>
                <input className='w-100 px-2 py-1 rounded-1 border border-secondary' placeholder='example@gmail.com'  onChange={form.handleChange("email")}
                  onBlur={form.handleBlur}
                  value={form.values.email}/>
                <div className="text-danger text-sm pb-3">{form.touched.email && form.errors.email}</div>
                <input className='w-100 px-2 py-1 rounded-1 border border-secondary' placeholder='********' type='password'  onChange={form.handleChange("password")}
                  onBlur={form.handleBlur}
                  value={form.values.password}/>
                <div className="text-danger text-sm pb-3">{form.touched.password && form.errors.password}</div>
                <div className='d-flex justify-content-end w-100 pt-0'>
                    <Link>Forgot password?</Link>
                </div>
                <button className='mt-3 btn btn-secondary w-100 bg-btn text-white border-0'>Login</button>
                {error && <p className='text-sm text-danger'>{error}</p>}
                <Link to="/signup" className='mt-1'>Dont have an account? >></Link>
            </form>
        </div>
        </div>
    </div>
  )
}

export default Login