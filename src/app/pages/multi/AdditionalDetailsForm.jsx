'use client'
import React, { useState } from 'react';

const AdditionalDetailsForm = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    whoCanStay: '',
    idealFor: '',
    registrationFor: '',
    roomOptions: {
      totalRooms: '',
      occupied: '',
      vacantRooms: '',
      occupancy: ''
    },
    amenities: {
      food: false,
      wifi: false,
      fullyFurnished: false,
      roWater: false,
      cctv: false,
      ac: false,
      geyser: false,
      laundryMachine: false,
      tv: false
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const intValue = type === 'number' ? parseInt(value) : null;
    const updatedFormData = { ...formData };
    if(name===occupancy){
      updatedFormData.roomOptions.occupancy = value;
 
    }

    if (name === 'totalRooms' || name === 'occupied') {
      updatedFormData.roomOptions[name] = value;
      if (!isNaN(intValue)) {
        updatedFormData.roomOptions[name] = intValue;
      } else {
        updatedFormData.roomOptions[name] = '';
      }
      const { totalRooms, occupied, occupancy } = updatedFormData.roomOptions;
      const filledFields = [totalRooms, occupied, occupancy].filter(val => !isNaN(val));
      const filledCount = filledFields.length;

      if (filledCount >= 2) {
        if (filledFields.includes(totalRooms) && filledFields.includes(occupied)) {
          updatedFormData.roomOptions.vacantRooms = totalRooms - occupied;
        } else if (filledFields.includes(totalRooms) && filledFields.includes(occupancy)) {
          updatedFormData.roomOptions.vacantRooms = totalRooms - occupancy;
        } else if (filledFields.includes(occupied) && filledFields.includes(occupancy)) {
          updatedFormData.roomOptions.vacantRooms = totalRooms - occupied;
        }
      } else {
        updatedFormData.roomOptions.vacantRooms = '';
      }
    } else if (
      name === 'food' ||
      name === 'wifi' ||
      name === 'fullyFurnished' ||
      name === 'roWater' ||
      name === 'cctv' ||
      name === 'ac' ||
      name === 'geyser' ||
      name === 'laundryMachine' ||
      name === 'tv'
    ) {
      updatedFormData.amenities[name] = checked;
    } else {
      updatedFormData[name] = value;
    }

    setFormData(updatedFormData);
  };

  const handleNextClick = () => {
    console.log('Additional Property Details Form Data:', formData);
    onNext(formData);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Step 2: Additional Details</h2>
      <form className="row g-3">
        {/* Section 1: Basic Information */}
        <div className="col-12 mb-4">
          <h3 className="mb-3">Basic Information</h3>
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="whoCanStay" className="form-label">Who Can Stay</label>
              <select className="form-select" id="whoCanStay" name="whoCanStay" value={formData.whoCanStay} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="Boys">Boys</option>
                <option value="Girls">Girls</option>
                <option value="Co-living">Co-living</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="idealFor" className="form-label">Ideal For</label>
              <select className="form-select" id="idealFor" name="idealFor" value={formData.idealFor} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="Student">Student</option>
                <option value="Working Professional">Working Professional</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="registrationFor" className="form-label">Registration For</label>
              <select className="form-select" id="registrationFor" name="registrationFor" value={formData.registrationFor} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="Whole Building">Whole Building</option>
                <option value="House">House</option>
                <option value="Room">Room</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Room Options */}
        <div className="col-12 mb-4">
          <h3 className="mb-3">Room Options</h3>
          <div className="row">
            <div className="col-md-3">
              <label htmlFor="totalRooms" className="form-label">Total Rooms</label>
              <input type="number" className="form-control" id="totalRooms" name="totalRooms" value={formData.roomOptions.totalRooms} onChange={handleChange} />
            </div>
            <div className="col-md-3">
              <label htmlFor="occupied" className="form-label">Occupied</label>
              <input type="number" className="form-control" id="occupied" name="occupied" value={formData.roomOptions.occupied} onChange={handleChange} />
            </div>
            <div className="col-md-3">
              <label htmlFor="vacantRooms" className="form-label">Vacant Rooms</label>
              <input type="number" className="form-control" id="vacantRooms" name="vacantRooms" value={formData.roomOptions.vacantRooms} onChange={handleChange} readOnly />
            </div>
            <div className="col-md-3">
              <label htmlFor="occupancy" className="form-label">Occupancy</label>
              <select className="form-select" id="occupancy" name="occupancy" value={formData.roomOptions.occupancy} onChange={handleChange}>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Triple">Triple</option>
                <option value="3+">3+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Amenities */}
        <div className="col-12 mb-4">
          <h3 className="mb-3">Amenities</h3>
          <div className="row">
            {Object.keys(formData.amenities).map((amenity) => (
              <div className="col-md-4 mb-3 form-check" key={amenity}>
                <input 
                  type="checkbox"
                  className="form-check-input"
                  id={amenity}
                  name={amenity}
                  checked={formData.amenities[amenity]}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor={amenity}>
                  {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="col-12 d-flex justify-content-end mt-4">
          <button className="btn btn-secondary me-2" onClick={onBack}>
            Back
          </button>
          <button className="btn btn-primary" onClick={handleNextClick}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdditionalDetailsForm;