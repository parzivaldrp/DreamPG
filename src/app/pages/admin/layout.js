// AdminLayout.js
"use client"
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Bootstrap from './Bootstrap';
import Login from '../admin/pages/Login/page';
import Sidebar from '../admin/component/Navbar';

export default function AdminLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // Sidebar state

  useEffect(() => {
    const token = localStorage.getItem('admintoken');
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admintoken');
    setIsLoggedIn(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div>Loading...</div>
          </div>
        ) : (
          isLoggedIn ? (
            <>
              <Sidebar />
              <div className="col" style={{ marginLeft: isOpen ? '280px' : '60px', transition: 'margin-left 0.5s' }}>
                <div className="d-flex justify-content-end p-3">
                  <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                </div>
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
                <Bootstrap />
                {children}
              </div>
            </>
          ) : (
            <div className="col-12 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
              <Login/>
            </div>
          )
        )}
      </div>
    </div>
  );
}
