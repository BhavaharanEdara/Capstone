import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { deleteUser, logoutUser, updateUser } from '../features/users/userSlice';
import { deleteKyc, removeKyc } from '../features/kyc/kycSlice';


let schema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required"),
  username: Yup.string().required("User name is required"),
});

const Profile = () => {
    const {user} = useSelector(state=>state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const form = useFormik({
      initialValues:{
        fullname:user?.fullname,
        username:user?.username,
        email:user?.email,
        phone:user?.phone
      },
      validationSchema:schema,
      onSubmit:(values)=>{
        dispatch(updateUser(values))
      }
    })
    const handleDelete = ()=>{
      dispatch(deleteKyc());
      dispatch(deleteUser())

}
    const handleLogout = ()=>{
      dispatch(logoutUser(null))
    }
      const isFormSameAsUser = (formValues, user) => {
        return (
          formValues.fullname === user?.fullname &&
          formValues.username === user?.username &&
          formValues.email === user?.email &&
          formValues.phone === user?.phone
        );
      };
    
    useEffect(()=>{
      if(!user){
        navigate("/login")
      }

    }, [user])
  return (
    <div className='container mt-5 pt-5'>
      <div className='row'>
        <Sidebar/>
        <form className='col-md-8 ' onSubmit={form.handleSubmit}>
          <label>Full Name:</label>
          <input className='form-control mb-3' value={form.values.fullname} onChange={form.handleChange("fullname")} onBlur={form.handleBlur}/>
          <div className="text-danger text-sm pb-3">{form.touched.fullname && form.errors.fullname}</div>
          <label>User Name:</label>
          <input className='form-control mb-3' value={form.values.username} onChange={form.handleChange("username")} onBlur={form.handleBlur}/>
          <div className="text-danger text-sm pb-3">{form.touched.username && form.errors.username}</div>
          <label>Email:</label>
          <div className='d-flex'>
          <input className='form-control mb-3'value={user?.email}  disabled={true}/>
          {!user?.isEmailVerified && <Link to="/emailVerify" className='mb-3 rounded btn btn-primary'>Verify</Link>}
          </div>
          <label>Phone:</label>
          <div className='d-flex'>
          <input className='form-control mb-3' value={user?.phone} disabled={true}/>
          {!user?.isPhoneVerified && <Link to="/phoneVerify" className='mb-3 rounded btn btn-primary'>Verify</Link>}
          </div>

          <div className='d-flex justify-content-between'>
            {!isFormSameAsUser(form.values, user) ? <button className='btn btn-primary' type='submit'> Update</button> : <button className='btn disabled btn-secondary'> Update</button>}
            
            <div>
              <button className='btn btn-danger ms-3' onClick={handleLogout} type="button">Logout</button>
              <button className='btn btn-danger ms-3' type='button' onClick={handleDelete}>Delete</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Profile