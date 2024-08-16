import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AgreementDetailsForm = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    agreementDuration: '',
    securityDepositDuration: '',
    noticePeriod: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { agreementDuration, securityDepositDuration, noticePeriod } = formData;

    if (!agreementDuration) {
      toast.error('Please select agreement duration.');
      return false;
    }
    if (!securityDepositDuration) {
      toast.error('Please select security deposit duration.');
      return false;
    }
    if (!noticePeriod) {
      toast.error('Please select notice period.');
      return false;
    }

    return true;
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Agreement Details Form Data:', formData);
      onNext(formData);
      toast.success('Form submitted successfully');
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
      <div className="row align-items-center">
        {/* Left side image */}
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src="/pg5.jpg" 
            alt="Agreement Details"
            className="img-fluid rounded" // Add rounded corners
          />
        </div>

        {/* Right side form */}
        <div className="col-md-6">
          <h2 className="mb-4 text-center text-md-start">Step 3: Agreement Details</h2>
          <form className="row g-3">
            {/* Agreement Duration */}
            <div className="col-md-12">
              <label htmlFor="agreementDuration" className="form-label">Agreement Duration</label>
              <select
                className={`form-select`}
                id="agreementDuration"
                name="agreementDuration"
                value={formData.agreementDuration}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option value="15 days">15 days</option>
                <option value="1 month">1 month</option>
                <option value="2 months">2 months</option>
                <option value="3 months">3 months</option>
              </select>
            </div>

            {/* Security Deposit Duration */}
            <div className="col-md-12">
              <label htmlFor="securityDepositDuration" className="form-label">Security Deposit Duration</label>
              <select
                className={`form-select`}
                id="securityDepositDuration"
                name="securityDepositDuration"
                value={formData.securityDepositDuration}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option value="15 days">15 days</option>
                <option value="1 month">1 month</option>
                <option value="2 months">2 months</option>
                <option value="3 months">3 months</option>
              </select>
            </div>

            {/* Notice Period */}
            <div className="col-md-12">
              <label htmlFor="noticePeriod" className="form-label">Notice Period</label>
              <select
                className={`form-select`}
                id="noticePeriod"
                name="noticePeriod"
                value={formData.noticePeriod}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option value="15 days">15 days</option>
                <option value="1 month">1 month</option>
                <option value="2 months">2 months</option>
                <option value="3 months">3 months</option>
              </select>
            </div>

            {/* Navigation buttons */}
            <div className="col-md-12 mt-4 d-flex justify-content-center">
              <button className="btn btn-secondary me-2" onClick={onBack}>
                Back
              </button>
              <button className="btn btn-primary" onClick={handleNextClick}>
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgreementDetailsForm;
