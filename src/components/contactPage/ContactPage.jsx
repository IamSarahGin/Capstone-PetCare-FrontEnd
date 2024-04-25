import React, { useState, useEffect } from "react";
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./ContactPage.scss"; 

const ContactForm = () => {
    useEffect(() => {
        const handleScroll = () => {
            AOS.refresh();
        };

        AOS.init({ duration: 1000 });
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  const [formData, setFormData] = useState({
   name: '',
        email: '',
        subject: '',
        message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('/contact', formData);
        alert('Email sent successfully');
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    } catch (err) {
        console.error(err);
        alert('Failed to send email');
    }
};


  return (
    <div className="container"  data-aos="fade-up">
      <div className="form-container">
        <div className="left-container">
          <div className="left-inner-container">
            <h2>Let's Chat</h2>
            <p>
              Whether you have a question or simply
              want to connect.
            </p>
            <br />
            <p>Feel free to send us a message in the contact form</p>
          </div>
        </div>
        <div className="right-container">
          <div className="right-inner-container">
            <form onSubmit={handleSubmit}>
              <h2 className="lg-view">Contact</h2>
              <h2 className="sm-view">Let's Chat</h2>

              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                value={formData.name}
                onChange={handleChange}
                required 
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                required 
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required 
              />

              <textarea
                rows="4"
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required 
              ></textarea>
              <button className="btn-submit" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
