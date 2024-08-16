'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    password: '',
    repeatPassword: '',
    age: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState(false); 

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Log the API path
      console.log('API path:', '/api/Signup');

      const response = await fetch('/api/Signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.message === 'Email already exists') {
          setEmailError(true);
          toast.error('Email already exists!');
        } else {
          toast.error('Signup failed. Please try again.');
        }
        throw new Error('Signup failed');
      } else {
        toast.success('Signup successful');
        router.push("/pages/Login");
      }

      const data = await response.json();

      console.log('Signup successful:', data);
      setFormData({
        name: '',
        email: '',
        mobile: '',
        gender: '',
        password: '',
        repeatPassword: '',
        age: '',
      })
      // Handle successful signup (e.g., display success message, redirect)
    } catch (error) {
      console.error('Signup error:', error);
      
    } finally {
      setIsLoading(false);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    if (formData.password !== formData.repeatPassword) {
      newErrors.password = 'Passwords do not match';
    }
    if (formData.age && (isNaN(formData.age) || parseInt(formData.age) < 18)) {
      newErrors.age = 'You must be at least 18 years old';
    }

    return newErrors;
  };

  const handleBlur = (event) => {
    const newErrors = validate();
    setErrors(newErrors); // Update errors on field blur
  };

  return (
    <section className=" " style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container ">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black border-primary shadow-lg" style={{ borderRadius: '25px', background: '#ffffffb3' }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center justify-content-center order-1 order-lg-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" style={{ width: 'auto', height: 'auto' }} />
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-2"> 
                    
                    <form className="mx-1 mx-md-4 border p-4 rounded-3" style={{ borderRadius: '15px', background: '#ffffff' }} onSubmit={handleSubmit}>
                      <div className="row mb-4">
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              id="name"
                              className="form-control"
                              placeholder="Your Name"
                              value={formData.name}
                              onChange={handleChange}
                              onBlur={handleBlur} // Validate on field blur
                              required
                            />
                            <label htmlFor="name">Your Name</label>
                            {errors.name && <div className="text-danger">{errors.name}</div>} {/* Display error message */}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="email"
                              id="email"
                              className="form-control"
                              placeholder="Your Email"
                              value={formData.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                            <label htmlFor="email">Your Email</label>
                            {errors.email && <div className="text-danger">{errors.email}</div>} {/* Display error message */}
                            {emailError && <div className="text-danger">Email already exists</div>} {/* Display email error */}
                          </div>
                        </div>
                      </div>
                      <div className="row mb-4">
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="tel"
                              id="mobile"
                              className="form-control"
                              placeholder="Mobile Number"
                              value={formData.mobile}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                            <label htmlFor="mobile">Mobile Number</label>
                            {errors.mobile && <div className="text-danger">{errors.mobile}</div>} {/* Display error message */}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <select id="gender" className="form-select" value={formData.gender} onChange={handleChange} required>
                              <option value="" disabled>Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                            <label htmlFor="gender">Gender</label>
                            {errors.gender && <div className="text-danger">{errors.gender}</div>}
                          </div>
                        </div>
                      </div>
                      <div className="row mb-4">
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="password"
                              id="password"
                              className="form-control"
                              placeholder="Password"
                              value={formData.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                            <label htmlFor="password">Password</label>
                            {errors.password && <div className="text-danger">{errors.password}</div>} {/* Display error message */}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="password"
                              id="repeatPassword"
                              className="form-control"
                              placeholder="Repeat Password"
                              value={formData.repeatPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                            <label htmlFor="repeatPassword">Repeat password</label>
                            {errors.repeatPassword && <div className="text-danger">{errors.repeatPassword}</div>} {/* Display error message */}
                          </div>
                        </div>
                      </div>
                      <div className="row mb-4">
                        <div className="col-md-12">
                          <div className="form-floating">
                            <input
                              type="number"
                              id="age"
                              className="form-control"
                              placeholder="Your Age"
                              value={formData.age}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                            <label htmlFor="age">Your Age (Optional)</label>
                            {errors.age && <div className="text-danger">{errors.age}</div>} {/* Display error message */}
                          </div>
                        </div>
                        
                      </div>
                      <div className="form-check d-flex justify-content-center mb-5">
                        <input className="form-check-input me-2 border-primary" type="checkbox" value="" id="termsCheck" required />
                        <label className="form-check-label" htmlFor="termsCheck">
                          I agree to the <a href="/terms" className="text-primary">terms and conditions</a>
                        </label>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
                          {isLoading ? 'Loading...' : 'Register'}
                        </button>
                      </div>
                    <div className="text-center">
                      <p className="mb-0">Already have an account?</p>
                      <a onClick={() => router.push('/pages/Login')}className="link-primary">
                        <p className="text-decoration-none">Login</p>
                      </a>
                    </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
