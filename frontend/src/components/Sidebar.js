import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
              <div className='col-md-3 bd-danger pb-3 mb-4'>
        <div className='pe-5 align-items-center'>
          <img src="https://placehold.co/260x260/png" alt="profile" className='img img-fluid rounded-4'/>
          <div className='mt-2  px-3 border border-3 rounded-3'>
            <Link className='no-underline' to="/profile"><h6 className='py-3 mb-0 side-icon'>Profile</h6></Link>
            <Link className='no-underline' to="/kycVerification"><h6 className='py-3 mb-0 side-icon'>KYC Application</h6></Link>
            <Link className='no-underline' to="/purchases"><h6 className='py-3 mb-0 side-icon'>Purchases</h6></Link>
            <Link className='no-underline' to="/policies"><h6 className='py-3 mb-0 side-icon'>Policies</h6></Link>
            <Link className='no-underline' to="/privacy"><h6 className='py-3 mb-0 side-icon'>Privacy Policy</h6></Link>
          </div>

        </div>

    </div>
  )
}

export default Sidebar