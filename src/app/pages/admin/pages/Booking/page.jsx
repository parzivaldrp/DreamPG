'use client'
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';


export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [previousTotal, setPreviousTotal] = useState(0); // Change ref to state
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/auth/Booking');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        console.log('Fetched bookings data:', data);

        const newBookings = data.bookings.map(booking => ({
          ...booking,
          actionTaken: booking.status !== 'pending'
        }));
        console.log('Processed bookings:', newBookings);

        // Check if there are new bookings
        const currentTotal = newBookings.length;
        console.log('Previous total:', previousTotal);
        console.log('Current total:', currentTotal);

        if (currentTotal - previousTotal === 1) {
          toast.success('New booking received!');
        }
        setPreviousTotal(currentTotal); // Update the previous total

        setBookings(newBookings);
      } catch (error) {
        console.error('Error fetching booking data:', error);
        toast.error('Failed to fetch booking data.');
      }
    };

    fetchBookings();
    const interval = setInterval(fetchBookings, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [previousTotal]); // Add previousTotal to dependency array

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };
  const sendEmailNotification = (booking, action) => {
    const templateParams = {
      to_name: booking.name,
      message: `Your booking has been ${action}.`,
      to_email: booking.email,
      from_name: 'DREAMPG',
  };
    emailjs.send('service_7byo5sc', 'template_vcrzjwa', templateParams, 'FggqdsxjOOkM7zz4l')
      .then((response) => {
        console.log('Email sent successfully:', response.status, response.text);
      }, (error) => {
        console.error('Failed to send email:', error);
      });
  };

  const handleAccept = async (id, index) => {
    try {
      const response = await fetch(`/api/auth/stpg/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'accepted' })
      });
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Failed to accept the booking: ${errorData.error}`);
        return;
      }
      toast.success('Booking accepted successfully!');
      const updatedBookings = [...bookings];
      updatedBookings[index] = {
        ...updatedBookings[index],
        status: 'accepted',
        actionTaken: true
      };
      setBookings(updatedBookings);
      sendEmailNotification(updatedBookings[index], 'accepted');
    } catch (error) {
      console.error('Error accepting booking:', error);
      toast.error('Failed to accept the booking.');
    }
  };

  const handleReject = async (id, index) => {
    try {
      const response = await fetch(`/api/auth/stpg/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'rejected' })
      });
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Failed to reject the booking: ${errorData.error}`);
        return;
      }
      toast.success('Booking rejected successfully!');
      const updatedBookings = [...bookings];
      updatedBookings[index] = {
        ...updatedBookings[index],
        status: 'rejected',
        actionTaken: true
      };
      setBookings(updatedBookings);
      sendEmailNotification(updatedBookings[index], 'rejected');
    } catch (error) {
      console.error('Error rejecting booking:', error);
      toast.error('Failed to reject the booking.');
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h1 className="text-center mb-4 animate__animated animate__fadeInDown">Bookings</h1>
      <div className="d-flex justify-content-between mb-3">
        <p>Total Bookings: {bookings.length}</p>
        {notificationCount > 0 && <p>New Bookings: {notificationCount}</p>}
      </div>
      <table className="table table-hover animate__animated animate__fadeInUp">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Message</th>
            <th>Booking Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking._id} className="animate__animated animate__fadeIn">
              <td>{booking.name}</td>
              <td>{booking.phoneNumber}</td>
              <td>{booking.email}</td>
              <td>{booking.message}</td>
              <td>{formatDate(booking.createdAt)}</td>
              <td>
                {booking.status !== 'pending' ? (
                  <span className={`badge ${booking.status === 'accepted' ? 'bg-success' : 'bg-danger'}`}>
                    {booking.status === 'accepted' ? 'Accepted' : 'Rejected'}
                  </span>
                ) : (
                  <>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => handleAccept(booking._id, index)}
                      disabled={booking.actionTaken}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleReject(booking._id, index)}
                      disabled={booking.actionTaken}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
