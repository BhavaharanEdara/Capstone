import React from 'react'
import Sidebar from '../components/Sidebar'

const Purchases = () => {
  return (
    <div className='container pt-5 mt-5 height-screen'>
        <div className='row'>
            <Sidebar/>
            <div className='col-md-8'>
                <h1>Your Purchases</h1>
                <p>You haven not made any purchase yet</p>
            </div>
        </div>
    </div>
  )
}

export default Purchases