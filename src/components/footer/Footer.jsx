import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { FaHome, FaUserMd , FaMobileAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="text-white text-center text-lg-start  martop"> 
      <div className="row mt-4">
        <div className="col-lg-4 col-md-12 mb-4 mb-md-0" style={{ paddingLeft: '30px' }}>
          <h5 className="text-uppercase mb-4">About company</h5>
          <p style={{ color: 'white' }}>
            We’re on a mission to strengthen the human-animal bond through better pet care, and we started with a new approach: urgent care.
          </p>
          <p style={{ color: 'white' }}>
            Our medical team, for whom a broad case mix provides opportunities to learn, grow and practice at the top of their license. Diverse cases keep the team engaged and deepens their passion for veterinary medicine.
          </p>
        </div>

        <div className="col-lg-4 col-md-12 mb-4 mb-md-0" style={{ paddingLeft: '100px' }}>
        <h5 className="text-uppercase mb-4">Contact</h5>
          <div className="form-outline form-white mb-4"></div>
          <ul className="fa-ul" style={{ marginLeft: '1.65em', color: 'white' }}>
            <li className="mb-3">
              <span className="fa-li"><FaUserMd/></span><span className="ms-2"> Dr. John Doe</span>
            </li>
            <li className="mb-3">
              <span className="fa-li"><FaHome /></span><span className="ms-2"> 1st Floor, ABC Building, Purok 8, Taguig City</span>
            </li>
            <li className="mb-3">
              <span className="fa-li"><FaEnvelope /></span><span className="ms-2">petcareest.20224@gmail.com</span>
            </li>
            <li className="mb-3">
              <span className="fa-li"><FaPhone /></span><span className="ms-2">+ 654456456</span>
            </li>
            <li className="mb-3">
              <span className="fa-li"><FaMobileAlt /></span><span className="ms-2">+ 091 234 567 89</span>
            </li>
          </ul>
        </div>

        <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
          <h5 className="text-uppercase mb-4">Opening hours</h5>
          <table className="table text-center text-white">
            <tbody className="font-weight-normal">
              <tr>
                <td>Mon - Fri:</td>
                <td>8am - 5pm</td>
              </tr>
            </tbody>
          </table>
          <h5 className="text-uppercase mb-4">Social Links</h5>
          <div className="mt-4">
            <a href="https://www.facebook.com/" target="_blank" className="btn btn-floating btn-primary btn-lg"><FaFacebookF /></a>
            <a href="https://twitter.com/" target="_blank" className="btn btn-floating btn-primary btn-lg"><FaTwitter /></a>
            <a href="https://instagram.com/" target="_blank" className="btn btn-floating btn-primary btn-lg"><FaInstagram /></a>
          </div>
        </div>          
      </div>
      <div className="text-center p-3" style={{ backgroundColor: '#226c97', color: 'white' }}>
        Copyright © 2024 PetCare.All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
