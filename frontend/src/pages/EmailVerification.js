import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux';
import { verifyUser } from '../features/users/userSlice';
import axios from "axios"
import { config } from '../utils/headerConfig';


const EmailVerification = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(state=>state.user)
  const sendOtp = async()=>{
      axios.post("http://localhost:5000/api/user/send-otp-mail", null, config())
  .then(response => {
    console.log(response);
    setMessage("OTP sent to mail");
  })
  .catch(error => {
    console.log(error);
    setMessage("Failed to send OTP");

  });
  }
  const handleOtp = ()=>{
    dispatch(verifyUser({otp:otp}));
  }
  useEffect(()=>{
    if(!user){
      navigate("/login");
    }
    if(user && user?.isEmailVerified){
      navigate("/phoneVerify")
    }
  }, [user])
  useEffect(()=>{
    
  }, [])
  return (
    <div>
        <Header/>
        <div className='bg-color'>
        <div className="container h-screen">
            <div className=' col-lg-5 col-md-6 col-11 mt-5 px-3 px-md-4 py-5 bg-white rounded text-center'>
                <h5 className='text-center pt-2'>Email Verification</h5>
                <div className='text-success pb-2'>{message}</div>
                <input className='w-100 px-2 py-1 rounded-1 my-3 border border-secondary' placeholder='6 Digit OTP' value={otp} onChange={(e)=>setOtp(e.target.value)}/>
                <br/>
                <div className='d-flex justify-content-end w-100 pt-0 gap-4'>
                    <Link to="/profile">Skip</Link>
                </div>
                
                <button className='mt-3 btn btn-secondary  bg-btn text-white border-0' onClick={sendOtp}>Send OTP</button>
                
                <button className='mt-3 btn btn-secondary w-25 bg-btn text-white border-0 ms-5' onClick={handleOtp}>Verify</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default EmailVerification