'use client'
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {jwtDecode }from 'jwt-decode'; // Correct import
import 'animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [previousBookings, setPreviousBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
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

        const response = await fetch(`/api/history?email=${email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data);
        setPreviousBookings(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast.error('Failed to fetch bookings');
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkBookingUpdates();
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [bookings]);

  const checkBookingUpdates = async () => {
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

      const response = await fetch(`/api/history?email=${email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      
      // Compare the new data with the previous data to find updates
      if (JSON.stringify(data) !== JSON.stringify(previousBookings)) {
        setBookings(data);
        setPreviousBookings(data);
        
        // Find out which bookings have changed and show relevant toast messages
        data.forEach((booking, index) => {
          if (JSON.stringify(booking) !== JSON.stringify(previousBookings[index])) {
            if (booking.status === 'accepted') {
              toast.success(`Booking for ${booking.name} has been accepted!`);
            } else if (booking.status === 'rejected') {
              toast.error(`Booking for ${booking.name} has been rejected.`);
            } else {
              toast.info(`There are updates to your booking status for ${booking.name}!`);
            }
          }
        });
      }
    } catch (error) {
      console.error('Error checking booking updates:', error);
      toast.error('Failed to check booking updates');
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2 className="mb-4 animate__animated animate__fadeInDown text-center">Booking History</h2>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="card p-4 shadow-lg animate__animated animate__fadeInUp">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking._id} className="mb-3">
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title"><strong>Name:</strong> {booking.name}</h5>
                    <p className="card-text"><strong>Email:</strong> {booking.email}</p>
                    <p className="card-text"><strong>Phone Number:</strong> {booking.phoneNumber}</p>
                    <p className="card-text"><strong>Message:</strong> {booking.message}</p>
                    <p className="card-text"><strong>Status:</strong> {booking.status}</p>
                    <p className="card-text"><strong>Created At:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;

function getEmailFromToken(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded.email;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}
