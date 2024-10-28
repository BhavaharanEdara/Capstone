import React from 'react'
import { Link } from 'react-router-dom';
import banner from "../images/banner.png"
import Header from '../components/Header';

const Home = () => {
    return (
        <>
          <div className='container'>
            
        <div className='d-flex w-screen mt-5 pt-5 pb-4 mt-2'>
          <div className='w-50 d-flex flex-column justify-content-around gap-4 pe-4 py-5'>
            <h1 className='banner-heading'>Protect What Matters Most</h1>
            <p className='banner-text'>Your life, health, and assets deserve the best protection. At [Insurance Company Name], we offer comprehensive insurance solutions designed to safeguard everything that matters most. Whether it’s securing your family’s future, protecting your home, or planning for life’s uncertainties, our experts are here to guide you every step of the way. Get the peace of mind you deserve with coverage that’s tailored to your needs.</p>
            <div>
              <Link className=' banner-btn me-4 ' to="/login">Login</Link>
              <Link className=' banner-btn ' to="/signUp">Register</Link>
            </div>
          </div>
          <img src={banner} className='img img-fluid w-50'/>
        </div>
        <hr/>
        </div>
        </>
    
      );
    }

export default Home