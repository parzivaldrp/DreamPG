// Import necessary hooks and components
'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    setIsLoggedIn(token); // Set isLoggedIn to true if token exists, otherwise false
  }, []);

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Update isLoggedIn state
    router.push('/pages/Login');
    toast.success('Logged out successfully');
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-4 sticky-top">
      <div className="container-fluid">
        <div href="/" style={{ textDecoration: 'none', color: 'white' }}>
          <div className="navbar-brand">
            <img src="/LOGO1.png" alt="Dream_PG Logo" width="135" height="44"/>
          </div>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span> {/* Three lines for small screens */}
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-auto">
            <li className="nav-item"style={{ marginRight: '10px' }}>
              <div onClick={() => router.push('/')} style={{ textDecoration: 'none', color: 'white' }}>
                <div className="btn btn-outline-light">Home</div>
              </div>
            </li>
            <li className="nav-item"style={{ marginRight: '10px' }}>
              <div onClick={() => router.push("/pages/Findpg")} style={{ textDecoration: 'none', color: 'white' }}>
                <div className="btn btn-outline-light">FindMyPg</div>
              </div>
            </li>
            <li className="nav-item"style={{ marginRight: '10px' }}>
              <div onClick={() => router.push("/pages/About")} style={{ textDecoration: 'none', color: 'white' }}>
                <div className="btn btn-outline-light">About</div>
              </div>
            </li>
            <li className="nav-item"style={{ marginRight: '10px' }}>
              <div onClick={() => router.push("/pages/Contact")} style={{ textDecoration: 'none', color: 'white' }}>
                <div className="btn btn-outline-light ">Contact</div>
              </div>
            </li>
          </ul>
          {isLoggedIn ? (
            <div className="dropdown">
              <div className="dropdown-toggle d-flex align-items-center hidden-arrow" href="#" id="navbarDropdownMenuAvatar" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="rounded-circle" height="25" alt="Black and White Portrait of a Man" loading="lazy" />
              </div>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar"style={{ backgroundColor: '#0056b3',  // Dark blue background
              borderRadius: '8px' // Rounded corners for a softer look
             }}>
                <li>
                  <div className="dropdown-item" onClick={() => router.push("/pages/Profile")} style={{ color: 'black',  // White text
                  fontSize: '16px' // Larger font size for better readability
                 }}>My profile</div>
                </li>
                <li>
                  <div className="dropdown-item" onClick={() => router.push("/pages/BookingHistory")} style={{ color: 'black',  // White text
                  fontSize: '16px' // Larger font size for better readability
                 }}>History</div>
                </li>
                <li>
                  <div className="dropdown-item" onClick={handleLogout} style={{ color: 'black',  // White text
                  fontSize: '16px' // Larger font size for better readability
                 }}>Logout</div>
                </li>
              </ul>
            </div>
          ) : (
            <div onClick={() => {router.push("/pages/Login"); }}>
              <div className="btn btn-outline-light">Login</div>
            </div>
          )}
        
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
