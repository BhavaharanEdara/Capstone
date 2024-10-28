import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import EmailVerification from './pages/EmailVerification';
import Home from './pages/Home';
import Profile from './pages/Profile';
import PhoneVerification from './pages/PhoneVerification';
import axios from 'axios';
import About from './pages/About';
import Contact from './pages/Contact';
import KYCapplication from './pages/KYCapplication';
import Purchases from './pages/Purchases';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Policies from './pages/Policies';


// Set default withCredentials to true
axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="emailVerify" element={<EmailVerification />} />
            <Route path="phoneVerify" element={<PhoneVerification />} />
            <Route path="profile" element={<Profile />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="kycVerification" element={<KYCapplication />} />
            <Route path="purchases" element={<Purchases />} />
            <Route path='policies' element={<Policies/>}/>
            <Route path="privacy" element={<PrivacyPolicy />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
