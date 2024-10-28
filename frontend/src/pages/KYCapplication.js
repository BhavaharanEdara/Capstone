import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { config, getTokenFromLocalStorage } from '../utils/headerConfig';
import { useDispatch, useSelector } from 'react-redux';
import { applyKyc, fetchKyc, updateKyc } from '../features/kyc/kycSlice';
import { Link, useNavigate } from 'react-router-dom';
import Stepper from 'react-stepper-horizontal';

const KYCapplication = () => {
    const [file1, setFile1] = useState();
    const [file2, setFile2] = useState();
    const [message, setMessage] = useState();
    const {application, error, loading} = useSelector(state=>{return state.kyc;});
    const navigate = useNavigate();
    const {user} = useSelector(state=>state.user);
    const dispatch = useDispatch()
    let activeS = 0;
    if(application?.status === "Processing"){
      activeS = 1;
    }
    if(application?.status === "Approved"){
      activeS = 2;
    }
    
  const handleSubmit = async()=>{
    const formData = new FormData()
    if(!file1 || !file2){
      setMessage("Please Upload file");
      return
    }
    if(file1?.size > 1*1024*1024 || file2?.size > 1*1024*1024){
      return;
    }
    if(file1.type !== 'application/pdf' || file2.type!=='application/pdf'){
      return;
    }
    formData.append("id",file1);
    formData.append("address",file2);
    if(!application){
    dispatch(applyKyc(formData))
  }
  else{
    dispatch(updateKyc(formData))
  }
  }
  useEffect(()=>{
    dispatch(fetchKyc())
  },[])
  useEffect(()=>{
    if(!user){
      navigate("/login")
    }

  }, [user])

  return (
    <div className='container pt-5 mt-5'>
      {loading && <div className='text-center'>
                    <div className="spinner-border" role="status">
                      <span className="sr-only"></span>
                    </div>
                  </div>}
        <div className='row'>
            <Sidebar/>
            {application  && application?.status!=="Rejected" &&
            <div className='col-md-8'>
            <h1>KYC Verification</h1>
            <p className='mt-3'>Application Id: {application?._id}</p>
            <p>Application Status: {application?.status}</p>
            <div>
      <Stepper steps={ [{title: 'Pending'}, {title: 'Processing'}, {title: 'Approved'}] } activeStep={ activeS } />
    </div>

            {(application?.status==="Pending" || application?.status==="Processing") && <p className='pt-4'>Verification may take up to 24 hours</p>}
          </div>}

            {(application==null || application?.status=="Rejected") && user?.isEmailVerified && <div className='col-md-8'>

              <h1>KYC Verification</h1>
              {application?.status==="Rejected" && <p className='text-danger '>Your application got rejected please apply again</p>}

              <p>Please upload your ID and Address proof for identity verification.</p>
              <label>Valid ID:</label>
              <input type="file" onChange={(e)=>{setFile1(e.target.files[0])}} className='form-control'/>
              <p className={`${file1 && file1?.type!=="application/pdf" ? "mb-0":"mb-3"} pb-0 text-sm text-secondary`}>*Please upload a file of type PDF not exceeding 1mb</p>
              <div className='d-flex gap-4'>
                {file1 && file1?.type!=="application/pdf" && <p className='pb-3 text-danger text-sm'>Wrong format</p>}
                {file1?.size > 1*1024*1024 && <p className='text-danger text-sm'>Size limit exceeded</p>}
                {!file1 && message && <p className='text-sm text-danger'>{message}</p>}
              </div>
              <label>Address Proof:</label>
              <input type="file" onChange={(e)=>{setFile2(e.target.files[0])}} className='form-control '/>
              <p className={`${(file2 && file2?.type!=="application/pdf" || file2?.size > 1*1024*1024 )? "mb-0":"mb-3"} pb-0 text-sm text-secondary`}>*Please upload a file of type PDF not exceeding 1mb</p>
              {file2 && file2.type!=="application/pdf" && <p className='pb-3 text-danger text-sm'>Wrong format</p>}
              {file2?.size > 1*1024*1024 && <p className='text-danger text-sm'>Size limit exceeded</p>}
              {!file2 && message && <p className='text-sm text-danger'>{message}</p>}

              <button type="submit" className='btn btn-primary' onClick={handleSubmit}>Submit for Verification</button> 

            </div>}
            {user && !user?.isEmailVerified && 
              <div className='col-md-8'>
              <h1>KYC Verification</h1>
              <p>Please verify your Email and Phone to apply for KYC</p>
              <Link to="/emailVerify" className='btn btn-primary'>Verify</Link>
              </div>
            }
        </div>
    </div>
  )
}

export default KYCapplication