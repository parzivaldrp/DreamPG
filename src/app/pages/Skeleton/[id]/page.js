'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from 'react-toastify'; // Import toastify

const Skeleton = () => {
  const { id } = useParams();
  const [pg, setPg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    message: '',
  });

  const fetchPgData = async () => {
    try {
      const res = await fetch(`/api/spg/${id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch PG');
      }
      const data = await res.json();
      setPg(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      toast.error('Failed to fetch PG'); // Display error toast notification
    }
  };

  useEffect(() => {
    if (id) {
      fetchPgData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/Booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error('Failed to submit booking');
      }
      toast.success('Booking submitted successfully!');
      setFormData({
        name: '',
        phoneNumber: '',
        email: '',
        message: '',
      }); // Display success toast notification
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error('Failed to submit booking'); // Display error toast notification
    }
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'Wifi':
        return 'fa-wifi';
      case 'parking':
        return 'fa-parking';
      case 'Ac':
        return 'fa-snowflake';
      case 'LaundryMachine':
        return 'fa-tshirt';
      case 'gym':
        return 'fa-dumbbell';
      case 'FullyFurnished':
        return 'fa-utensils';
      default:
        return 'fa-check-circle';
    }
  };

  if (loading) {
    
    return <div className="text-center">Loading...</div>;
  }

  if (!pg) {
    toast.error('PG not Found data...');
    return <div className="text-center">PG not found</div>;
  }

  return (
    <div className="container-fluid mt-5 px-5">
      <div className="text-center mb-5">
        <h2 className="text-primary">{pg.propertyName} PG Rooms</h2>
      </div>
      <div className="row">
        <div className="col-lg-8 mb-4">
          <div id="pgCarousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              {pg.propertyImages.map((image, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <img src={image} className="d-block w-100" alt={`Slide ${index}`} />
                </div>
              ))}
            </div>
            
          </div>
          <div className="mt-4">
            <h4 className="text-secondary">Description</h4>
            <p>{pg.description}</p>
          </div>
          <div className="mt-4">
            <h4 className="text-secondary">PG Rules</h4>
            <ul>

            </ul>
          </div>
          <div className="mt-4">
            <h4 className="text-secondary">Amenities</h4>
            <div className="row">
              {Object.keys(pg.amenities).map((amenity, index) => (
                <div key={index} className="col-md-4 mb-2">
                  <p>
                    <i className={`fa ${getAmenityIcon(amenity)} text-secondary mr-2`}></i>
                    <span className="text-muted">{amenity.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-secondary">Agreement Details</h4>
            <p>Agreement Duration: {pg.agreementDuration}</p>
            <p>Security Deposit Duration: {pg.securityDepositDuration}</p>
            <p>Notice Period: {pg.noticePeriod}</p>
          </div>
          <div className="mt-4">
            <h4 className="text-secondary">Rent Details</h4>
            <p>Rent Cycle: {pg.rentCycle}</p>
            <p>Late Payment Fine: {pg.latePaymentFine}</p>
          </div>
          <div className="mt-4">
            <h4 className="text-secondary">Budget and Extra Charges</h4>
            <p>Budget Range: {pg.budgetRange}</p>
            <p>Extra Charge: {pg.extraCharge}</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title text-primary">Owner Details</h5>
              <p>Owner Name: {pg.ownerName}</p>
              <p>Owner Email: {pg.ownerEmail}</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-primary">Contact Form</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    className="form-control"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    className="form-control"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
