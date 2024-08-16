'use client'
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const PropertyDetailsForm = ({ onNext }) => {
  const [formData, setFormData] = useState({
    propertyName: '',
    ownerName: '',
    ownerEmail: '',
    mobileNumber: '',
    address: '',
    houseFlatBlockNo: '',
    pincode: '',
    city: '',
    state: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} with value: ${value}`);
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const {
      propertyName, ownerName, ownerEmail, mobileNumber, address,
      houseFlatBlockNo, pincode, city, state
    } = formData;

    if (!propertyName) {
      toast.error('Please enter the property name.');
      return false;
    }
    if (!ownerName) {
      toast.error('Please enter the owner name.');
      return false;
    }
    if (!ownerEmail || !/\S+@\S+\.\S+/.test(ownerEmail)) {
      toast.error('Please enter a valid email address.');
      return false;
    }
    if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
      toast.error('Please enter a valid 10-digit mobile number.');
      return false;
    }
    if (!address) {
      toast.error('Please enter the address.');
      return false;
    }
    if (!houseFlatBlockNo) {
      toast.error('Please enter the house/flat/block number.');
      return false;
    }
    if (!pincode || !/^\d{6}$/.test(pincode)) {
      toast.error('Please enter a valid 6-digit pincode.');
      return false;
    }
    if (!city) {
      toast.error('Please enter the city.');
      return false;
    }
    if (!state) {
      toast.error('Please enter the state.');
      return false;
    }

    return true;
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Property Details Form Data:', formData);
      onNext(formData);
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <Image
            src="/pg4.jpg"
            alt="Property Image"
            width={500}
            height={400}
            layout="responsive"
          />
        </div>
        <div className="col-md-6">
          <h2>Step 1: Property Details</h2>
          <form className="row g-3">
            {/* Property Name */}
            <div className="col-md-12 form-floating">
              <input
                type="text"
                className="form-control"
                id="propertyName"
                name="propertyName"
                value={formData.propertyName}
                onChange={handleChange}
              />
              <label htmlFor="propertyName">Property Name</label>
            </div>

            {/* Owner Name */}
            <div className="col-md-12 form-floating">
              <input
                type="text"
                className="form-control"
                id="ownerName"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
              />
              <label htmlFor="ownerName">Owner Name</label>
            </div>

            {/* Owner Email and Mobile Number */}
            <div className="col-md-6 form-floating">
              <input
                type="email"
                className="form-control"
                id="ownerEmail"
                name="ownerEmail"
                value={formData.ownerEmail}
                onChange={handleChange}
              />
              <label htmlFor="ownerEmail">Owner Email</label>
            </div>
            <div className="col-md-6 form-floating">
              <input
                type="tel"
                className="form-control"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
              <label htmlFor="mobileNumber">Mobile Number</label>
            </div>

            {/* Address */}
            <div className="col-12 form-floating">
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              <label htmlFor="address">Address</label>
            </div>

            {/* House/Flat/Block No., Pincode, and City */}
            <div className="col-md-4 form-floating">
              <input
                type="text"
                className="form-control"
                id="houseFlatBlockNo"
                name="houseFlatBlockNo"
                value={formData.houseFlatBlockNo}
                onChange={handleChange}
              />
              <label htmlFor="houseFlatBlockNo">House/Flat/Block No.</label>
            </div>
            <div className="col-md-4 form-floating">
              <input
                type="text"
                className="form-control"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
              <label htmlFor="pincode">Pincode</label>
            </div>
            <div className="col-md-4 form-floating">
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              <label htmlFor="city">City</label>
            </div>

            {/* State */}
            <div className="col-12 form-floating">
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
              <label htmlFor="state">State</label>
            </div>

            {/* Next Button */}
            <div className="col-12 text-center">
              <button className="btn btn-primary" type="button" onClick={handleNextClick}>
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsForm;
