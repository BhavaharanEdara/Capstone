import React from 'react'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom' 
const Header = () => {
  const {user} = useSelector(state=>state.user);
  return (
<div className="bg-orange fixed-top">
      <div className="container ">
        <nav className="navbar navbar-expand-lg navbar-light py-3 ">
          <div className="container-fluid px-0">
            <div className="w-33">
              <Link
                className="navbar-brand text-color-header mx-lg-0 fs-5 fw-bold "
                to="/"
              >
                Safeguard Insure
              </Link>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse " id="navbarContent">
              <div className="d-lg-flex justify-content-lg-end pt-lg-0 pt-3 w-100">
                <div className="d-lg-flex align-items-center  text-white mt-3 mt-md-0 w-33 gap-5">
                <Link to="/" className='nav-link fw-semibold py-2'>
                      Home
                  </Link>
                  <Link to="/about" className='nav-link fw-semibold py-2'>
                      About
                  </Link>
                  <Link to="/contact" className='nav-link fw-semibold py-2'>
                      Contact
                  </Link>

                  <Link to="/login" className='nav-link fw-semibold py-2'>
                      {!user ? "Login" : "Profile"}
                  </Link>
                  
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>  )
}

export default Header