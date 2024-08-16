'use client'
import React from 'react';
import emailjs from 'emailjs-com';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'; // Import icons
import { ToastContainer, toast } from 'react-toastify'; // Import toastify

function Contact() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use EmailJS to send the email
    try {
      const result = await emailjs.sendForm('service_01v8mip', 'template_5qdlyti', e.target, '2L-RXrzJUdTAJQ8yu');
      console.log(result.text);
      toast.success('Message sent successfully'); // Toast for success
      // Add any success message or redirection here
    } catch (error) {
      console.log(error.text);
      toast.error('Failed to send message'); // Toast for error
      // Add any error handling here
    }

    // Clear the form after submission (optional)
    e.target.reset();
  };

  return (
    <section className="py-5 bg-white text-black">
      <ToastContainer/>
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-8 col-xxl-7">
            <span className="text-muted">Get in Touch</span>
            <h2 className="display-5 fw-bold mb-3">Contact Dream PG</h2>
            <p className="lead">Have any questions or inquiries? We're here to help! Please feel free to reach out to us using the form below or the contact information provided.</p>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-lg-6">
            <h5 className="fw-semibold mb-3">Send us a message</h5>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text"><FaUser /></span> {/* Add icon */}
                      <input className="form-control bg-light text-dark" name="name" placeholder="First name" type="text" required />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text"><FaEnvelope /></span> {/* Add icon */}
                      <input className="form-control bg-light text-dark" name="email" placeholder="Email address" type="email" required />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text"><FaMapMarkerAlt /></span> {/* Add icon */}
                      <textarea className="form-control bg-light text-dark" name="message" placeholder="Your message" rows="4" required></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ms-auto">
                <div className="d-grid">
                  <button className="btn btn-primary" type="submit">Send message</button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-5 mt-5 mt-lg-0">
            <div className="mb-4">
              <h5><FaMapMarkerAlt /> Address</h5> {/* Add icon */}
              <p>Navsari</p>
            </div>
            <div className="mb-4">
              <h5><FaPhone /> Phone</h5> {/* Add icon */}
              <p>9978493054</p>
            </div>
            <div className="mb-4">
              <h5><FaEnvelope /> Email</h5> {/* Add icon */}
              <p>mc356220@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
