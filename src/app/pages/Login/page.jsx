'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      } else {
        // Handle successful login
        const data = await response.json();
        console.log('Login successful:', data);
  
        // Store token in local storage
        localStorage.setItem('token', data.token);
        // Clear form fields and error message
        setEmail('');
        setPassword('');
        setError('');
  
        // Show success toast
        toast.success('Login successful');
        router.push('/');
        
      }
    } catch (err) {
      // Handle login error
      setError('Login failed. Please check your credentials.');
      // Show error toast
      toast.error('Login failed. Please check your credentials.');
    }
  };
  

  return (
    <section className="bg-light">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          {/* Image Container */}
          <div className="col-lg-6 col-xl-5 order-lg-1">
            <div className="card rounded-3 text-black">
              <img 
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid" 
                alt="Sample image" 
              />
            </div>
          </div>
          
          {/* Form Container */}
          <div className="col-lg-6 col-xl-5 order-lg-2">
            <div className="card rounded-3 text-black">
              <div className="card-body p-5">
                <h2 className="text-uppercase text-center mb-4">Sign in</h2>

                <form>
                  <div className="form-outline mb-4">
                    <input 
                      type="email" 
                      id="form3Example3" 
                      className="form-control form-control-lg"
                      placeholder="Enter your email" 
                      autoComplete="off" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input 
                      type="password" 
                      id="form3Example4" 
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="d-flex justify-content-center">
                    <button 
                      type="button" 
                      className="btn btn-primary btn-lg btn-block" 
                      onClick={handleLogin}
                    >
                      Sign in
                    </button>
                  </div>

                  <div className="text-center mt-4">
                    <div className="mb-0">
                      Don't have an account?{' '}
                      <span onClick={() => router.push('/pages/Register')} className="link-primary" style={{ cursor: 'pointer' }}>Register</span>
                    </div>
                    <div className="mb-0">
                      <span onClick={() => router.push("/pages/Forgetpass")} className="link-primary" style={{ cursor: 'pointer' }}>Forgot password?</span>
                    </div>
                  </div>
                </form>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
