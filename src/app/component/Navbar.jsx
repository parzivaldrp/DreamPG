// components/Sidebar.js
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserCog, FaUsers, FaHome, FaPlus } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // Initialize isOpen state

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle isOpen state
  };

  const handleNavLinkClick = (path) => {
    router.push(path);
    setIsOpen(false); // Close the sidebar after navigation
  };

  return (
    <div className={`d-flex flex-column flex-shrink-0 p-3 bg-dark ${styles.sidebar}`} style={{ width: isOpen ? '280px' : '60px', height: '100vh', overflowX: 'hidden', transition: 'width 0.5s' }}>
      <button className="btn btn-dark mb-3 border-light " onClick={toggleSidebar}>
      <span className="navbar-toggler-icon"></span> {/* Three lines for small screens */}
        {isOpen ? 'Close' : ''}
      </button>

      <h2 className={`text-white mb-4 ${isOpen ? '' : 'd-none'}`}>Admin Panel</h2>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <button className="nav-link text-white btn btn-link" onClick={() => handleNavLinkClick('/pages/Booking')}>
            <FaHome className="me-2" />
            {isOpen && 'Booking Management'}
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link text-white btn btn-link" onClick={() => handleNavLinkClick('/pages/user')}>
            <FaUsers className="me-2" />
            {isOpen && 'User Management'}
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link text-white btn btn-link" onClick={() => handleNavLinkClick('/pages/pg')}>
            <FaHome className="me-2" />
            {isOpen && 'PG Management'}
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link text-white btn btn-link" onClick={() => handleNavLinkClick('/')}>
            <FaPlus className="me-2" />
            {isOpen && 'Add PG'}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
