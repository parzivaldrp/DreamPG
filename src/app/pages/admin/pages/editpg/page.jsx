'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditPG = () => {
  const router = useRouter();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    propertyName: '',
    ownerName: '',
    ownerEmail: '',
    mobileNumber: '',
    address: '',
    houseFlatBlockNo: '',
    pincode: '',
    city: '',
    state: '',
    totalRooms: '',
    vacantRooms: ''
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPG = async () => {
      try {
        const response = await fetch(`/api/auth/epg/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching PG data');
        }
        const data = await response.json();
        setFormData(data.pg);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching PG data:', error);
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPG();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/auth/epg/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Error updating PG');
      }
      router.push('/pages/admin/pages/pg');
    } catch (error) {
      console.error('Error updating PG:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit PG Details</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="propertyName" className="form-label">Property Name</label>
            <input
              type="text"
              className="form-control"
              id="propertyName"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ownerName" className="form-label">Owner Name</label>
            <input
              type="text"
              className="form-control"
              id="ownerName"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ownerEmail" className="form-label">Owner Email</label>
            <input
              type="email"
              className="form-control"
              id="ownerEmail"
              name="ownerEmail"
              value={formData.ownerEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
            <input
              type="text"
              className="form-control"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="houseFlatBlockNo" className="form-label">House/Flat/Block No</label>
            <input
              type="text"
              className="form-control"
              id="houseFlatBlockNo"
              name="houseFlatBlockNo"
              value={formData.houseFlatBlockNo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pincode" className="form-label">Pincode</label>
            <input
              type="text"
              className="form-control"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="state" className="form-label">State</label>
            <input
              type="text"
              className="form-control"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="totalRooms" className="form-label">Total Rooms</label>
            <input
              type="number"
              className="form-control"
              id="totalRooms"
              name="totalRooms"
              value={formData.totalRooms}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="vacantRooms" className="form-label">Vacant Rooms</label>
            <input
              type="number"
              className="form-control"
              id="vacantRooms"
              name="vacantRooms"
              value={formData.vacantRooms}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update PG
          </button>
        </form>
      )}
    </div>
  );
};

export default EditPG;
