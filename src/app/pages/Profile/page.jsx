'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {jwtDecode }from 'jwt-decode';
import 'animate.css';
import { Card, Button, Form } from 'react-bootstrap';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('No token found');
          return;
        }
        const email = getEmailFromToken(token);
        if (!email) {
          toast.error('Failed to extract email from token');
          return;
        }
        const response = await fetch(`/api/okk?email=${email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();  // Parse JSON response
        setUser(data);  // Update user state
        setFormData(data);  // Update form data state
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('Failed to fetch user profile');
      }
    };
    

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token'); // or get the token from cookies
      if (!token) {
        toast.error('No token found');
        return;
      }
      const email = getEmailFromToken(token);
      if (!email) {
        toast.error('Failed to extract email from token');
        return;
      }
  
      const response = await fetch(`/api/okk?email=${email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
  
      const data = await response.json(); // Parse JSON response
      setUser(data); // Update user state
      setEditMode(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };
  

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2 className="mb-4 text-center animate__animated animate__fadeInDown">My Profile</h2>
      {user ? (
        <Card className="p-4 shadow-lg animate__animated animate__fadeInUp">
          {editMode ? (
            <div className="animate__animated animate__fadeIn">
              <Form>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Enter your name" 
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    disabled 
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="mobile">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="mobile" 
                    value={formData.mobile} 
                    onChange={handleChange} 
                    placeholder="Enter your mobile number" 
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="age">
                  <Form.Label>Age</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="age" 
                    value={formData.age} 
                    onChange={handleChange} 
                    placeholder="Enter your age" 
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleSave}>Save</Button>
                <Button variant="secondary" className="ms-2" onClick={() => setEditMode(false)}>Cancel</Button>
              </Form>
            </div>
          ) : (
            <div className="animate__animated animate__fadeIn">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Mobile:</strong> {user.mobile}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <Button variant="primary" onClick={() => setEditMode(true)}>Edit</Button>
            </div>
          )}
        </Card>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default Profile;

function getEmailFromToken(token) {
  try {
    const decoded = jwtDecode(token);
    console.log(decoded);
    return decoded.email;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}
