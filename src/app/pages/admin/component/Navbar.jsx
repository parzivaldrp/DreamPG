// components/Sidebar.js
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserCog, FaCalendarDay, FaUsers, FaHome, FaPlus } from 'react-icons/fa';
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
        <button className="btn btn-dark mb-3 border-light d-flex align-items-center justify-content-center" onClick={toggleSidebar}style={{ minWidth: '80px' }} >
        {isOpen ? (
          <span>Close</span>
        ): (
          <img src="/hamburger.svg" alt="Hamburger icon" style={{ width: '30px' }}  />
        )}

      </button>

      <h2 className={`text-white mb-4 ${isOpen ? '' : 'd-none'}`}>Admin Panel</h2>
      <ul className="nav nav-pills  flex-column mb-auto  justify-content-center align-items-center">
        <li className="nav-item my-2">
          <button className="nav-link text-white btn btn-link px-2 py-2" onClick={() => handleNavLinkClick('/pages/admin/pages/Booking')}>
            <FaCalendarDay className="me-2"  size={24} />
            {isOpen && <span style={{ fontSize: '1.1rem' }}>Booking Management</span>}
          </button>
        </li>
        <li className="nav-item my-2">
          <button className="nav-link text-white btn btn-link px-2 py-2" onClick={() => handleNavLinkClick('/pages/admin/pages/user')}>
            <FaUsers className="me-2" size={24} />
            {isOpen && <span style={{ fontSize: '1.1rem' }}>User Management</span>}
          </button>
        </li>
        <li className="nav-item my-2">
          <button className="nav-link text-white btn btn-link px-2 py-2" onClick={() => handleNavLinkClick('/pages/admin/pages/pg')}>
            <FaHome className="me-2" size={24} />
            {isOpen && <span style={{ fontSize: '1.1rem' }}>PG Management</span>}
          </button> </li>
        <li className="nav-item my-2">
          <button className="nav-link text-white btn btn-link px-2 py-2" onClick={() => handleNavLinkClick('/pages/admin/')}>
            <FaPlus className="me-2" size={24} />
            {isOpen && <span style={{ fontSize: '1.1rem' }}>Add PG</span>}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;