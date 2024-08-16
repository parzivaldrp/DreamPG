'use client'
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';

function AmenitiesCard({ amenity, icon, description }) {
  return (
    <div className="col-sm-6 col-lg-3 mb-4">
      <div className="card h-100">
        <div className="card-body text-center">
          <i className={icon} style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
          <h5 className="card-title">{amenity}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const router = useRouter();
  return (
    <header className="bg-dark position-relative overflow-hidden">
      <div className="container-fluid">
        <div className="row align-items-center" style={{ minHeight: '600px' }}>
          <div className="col-md-6">
            <div className="row py-5 mt-md-5 justify-content-center">
              <div className="col-10 text-center text-md-start">
                <h1 className="display-3 fw-bolder mb-4 text-white">Dream PG: Your Ultimate Accommodation Solution</h1>
                <p className="fs-5 mb-5 text-white">Find the perfect PG accommodation tailored to your needs. Dream PG offers a wide range of options for students and professionals alike. Experience hassle-free living with our seamless booking process and excellent amenities.</p>
                <div className="d-grid gap-2 d-sm-flex justify-content-center justify-content-md-start">
                  <button type="button" className="btn btn-warning btn-lg rounded-pill" onClick={() => router.push('/pages/Findpg')}>Explore Now</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 position-relative">
            <img className="img-fluid w-100 h-100 object-fit-cover" loading="lazy" src="/Double Bed.gif" alt="We Offer Modern Web Solutions" />
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <AmenitiesCard 
            amenity="Food" 
            icon="fa fa-cutlery" // Add appropriate icon class here
            description="Enjoy delicious and hygienic meals prepared daily for residents." 
          />
          <AmenitiesCard 
            amenity="WiFi" 
            icon="fa fa-wifi" // Add appropriate icon class here
            description="Stay connected with high-speed internet access throughout the premises." 
          />
          <AmenitiesCard 
            amenity="Fully Furnished" 
            icon="fa fa-bed" // Add appropriate icon class here
            description="Furnished rooms equipped with all essential amenities for comfortable living." 
          />
          <AmenitiesCard 
            amenity="RO Water" 
            icon="fa fa-tint" // Add appropriate icon class here
            description="Access to clean and purified drinking water for all residents." 
          />
          <AmenitiesCard 
            amenity="CCTV" 
            icon="fa fa-video-camera" // Add appropriate icon class here
            description="24/7 surveillance with CCTV cameras for enhanced security." 
          />
          <AmenitiesCard 
            amenity="AC" 
            icon="fa fa-snowflake" // Add appropriate icon class here
            description="Stay cool and comfortable with air conditioning in all rooms." 
          />
          <AmenitiesCard 
            amenity="Geyser" 
            icon="fa fa-shower" // Add appropriate icon class here
            description="Hot water available round the clock with geyser facilities." 
          />
          <AmenitiesCard 
            amenity="Laundry Machine" 
            icon="fa fa-tshirt" // Add appropriate icon class here
            description="Convenient access to laundry machines for hassle-free laundry services." 
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
