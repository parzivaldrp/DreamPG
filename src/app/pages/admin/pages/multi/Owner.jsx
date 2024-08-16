'use client'
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Owner = ({ onSubmit, onBack, formData, setFormData }) => {
  const [localFormData, setLocalFormData] = useState({
    budgetRange: formData.budgetRange || '',
    extraCharge: formData.extraCharge || '',
    propertyImages: formData.propertyImages || [], // Initialize as an array
    description: formData.description || '',
    notARobot: formData.notARobot || false,
  });

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageFiles = [];

    for (let i = 0; i < files.length; i++) {
      imageFiles.push(files[i]);
    }

    setLocalFormData({ ...localFormData, propertyImages: imageFiles });
  };
  const validateForm = () => {
    const { budgetRange, extraCharge, description, notARobot, propertyImages } = localFormData;

    if (!budgetRange) {
      toast.error('Please select a budget range.');
      return false;
    }
    if (!extraCharge) {
      toast.error('Please select if you take extra charge.');
      return false;
    }
    if (!description) {
      toast.error('Please provide a description.');
      return false;
    }
    if (!notARobot) {
      toast.error('Please confirm you are not a robot.');
      return false;
    }
    if (propertyImages.length === 0) {
      toast.error('Please upload at least one property image.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Convert the File objects to base64
      const imageDataPromises = localFormData.propertyImages.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      // Wait for all image conversions to complete
      const base64Images = await Promise.all(imageDataPromises);

      // Update the shared formData state with Owner data including base64 image data
      const updatedFormData = {
        ...formData,
        ...localFormData,
        propertyImages: base64Images, // Update with base64 images
      };

      setFormData(updatedFormData);

      // Submit the form data to the server
      const formDataJSON = JSON.stringify(updatedFormData);
      console.log('Form data to send:', formDataJSON);
      onSubmit(formDataJSON);

      toast.success('PG ADDED successfully');
    }
  };
  return (
    <div className="container mt-5">
      <ToastContainer/>
      <h2 className="text-center mb-4">Step 5: Property Details</h2>
      <form className="row g-3" onSubmit={handleSubmit}>
        {/* Left side: Image */}
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="propertyImages" className="form-label">Property Images</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              id="propertyImages"
              name="propertyImages"
              multiple // Allow multiple file selection
              onChange={handleImageChange}
            />
            {localFormData.propertyImages.length > 0 && (
              <div className="mt-2 d-flex flex-wrap">
                {localFormData.propertyImages.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Property Image ${index + 1}`}
                    className="img-fluid mb-2 me-2 rounded"
                    style={{ maxWidth: '150px' }} // Adjust width as needed
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side: Form inputs */}
        <div className="col-md-6">
          {/* Budget Range */}
          <div className="mb-3">
            <label htmlFor="budgetRange" className="form-label">Budget Range</label>
            <select
              className="form-select"
              id="budgetRange"
              value={localFormData.budgetRange}
              onChange={(e) => {
                setLocalFormData({ ...localFormData, budgetRange: e.target.value });
              }}
            >
              <option value="">Select budget range</option>
              <option value="0-1000">₹0 - ₹1000</option>
              <option value="1000-2000">₹1000 - ₹2000</option>
              <option value="2000-3000">₹2000 - ₹3000</option>
              <option value="3000-4000">₹3000 - ₹4000</option>
              <option value="4000-5000">₹4000 - ₹5000</option>
              <option value="5000-6000">₹5000 - ₹6000</option>
              <option value="6000-7000">₹6000 - ₹7000</option>
              <option value="7000-8000">₹7000 - ₹8000</option>
              <option value="8000-9000">₹8000 - ₹9000</option>
              <option value="9000-10000">₹9000 - ₹10000</option>
            </select>
          </div>

          {/* Extra Charge */}
          <div className="mb-3">
            <label htmlFor="extraCharge" className="form-label">Do you take extra charge?</label>
            <select
              className="form-select"
              id="extraCharge"
              name="extraCharge"
              value={localFormData.extraCharge}
              onChange={(e) => {
                setLocalFormData({ ...localFormData, extraCharge: e.target.value });
              }}
            >
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              value={localFormData.description}
              onChange={(e) => {
                setLocalFormData({ ...localFormData, description: e.target.value });
              }}
            />
          </div>

          {/* Not a Robot Checkbox */}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="notARobot"
              name="notARobot"
              checked={localFormData.notARobot}
              onChange={(e) => {
                setLocalFormData({ ...localFormData, notARobot: e.target.checked });
              }}
            />
            <label className="form-check-label" htmlFor="notARobot">I am not a robot</label>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="col-12 d-flex justify-content-center mt-4">
          <button type="button" className="btn btn-secondary me-2" onClick={onBack}>Back</button>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Owner;
