import React from 'react'
import Sidebar from '../components/Sidebar'

const PrivacyPolicy = () => {
  return (
<div className='container pt-5 mt-5 height-screen'>
        <div className='row'>
            <Sidebar/>
            <div className='col-md-8'>
                <h1>Privacy Policy</h1>
                <p>At Safegaurd, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, safeguard, or use our services. Please read this policy carefully. If you do not agree with the terms of this policy, please do not access the site or use our services.</p>

                <p>We may collect personal information in a variety of ways, including:</p>
                <ul>
                    <li>Personal Data: We collect personally identifiable information, such as your name, email address, phone number, and demographic information (e.g., age, gender) when you voluntarily submit it to us.</li>
                    <li>Usage Data: We collect information automatically when you use our website, such as your IP address, browser type, operating system, and usage patterns (e.g., pages viewed, time spent on site).</li>
                    <li>Cookies and Tracking Technologies: We use cookies and similar tracking technologies to enhance your experience and collect information about your interactions with our site.</li>
                </ul>
            </div>
        </div>
    </div>  )
}

export default PrivacyPolicy