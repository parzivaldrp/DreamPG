'use client'
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';
import { useRouter } from 'next/navigation';
import CryptoJS from 'crypto-js'; // Import CryptoJS for client-side encryption

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [userOtp, setUserOtp] = useState(''); // User entered OTP
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(90); // OTP timer in seconds
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    let timer;
    if (step === 2 && otpTimer > 0) {
      timer = setTimeout(() => {
        setOtpTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      // Reset OTP state and step when timer expires
      setOtp('');
      setUserOtp('');
      setStep(1);
      toast.error('OTP expired. Please request a new OTP.');
    }
    return () => clearTimeout(timer);
  }, [step, otpTimer]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Generate OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
      const templateParams = {
        email: email,
        otp: generatedOtp,
      };

      // Send OTP using emailjs
      const response = await emailjs.send(
        "service_01v8mip",
        "template_o1gl0eu",
        templateParams,
        "2L-RXrzJUdTAJQ8yu"
      );

      if (response.status === 200) {
        toast.success('OTP sent to your email.');
        setOtp(generatedOtp); // Set OTP in state for verification step
        setStep(2); // Move to OTP verification step
      } else {
        toast.error('Failed to send OTP.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    // Verification logic
    if (otp === userOtp) {
      toast.success('OTP verified. You can now reset your password.');
      setStep(3); // Move to new password setup step
    } else {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    // Encrypt the password before sending it to the server
    const encryptedPass = CryptoJS.AES.encrypt(password, 'DrP.(07)').toString();

    try {
      const response = await fetch('/api/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password: encryptedPass })
      });

      if (response.ok) {
        toast.success('Password reset successful.');
        // Reset input fields and step state after successful reset
        setEmail('');
        setOtp('');
        setUserOtp('');
        setPassword('');
        setConfirmPassword('');
        router.push("/");r.push

        // Redirect to login page or any other page
      } else {
        const errorData = await response.json();
        toast.error(`Failed to reset password: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('Failed to reset password.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <ToastContainer />
      <div className="card shadow-lg p-3 mb-5 bg-white rounded">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Forgot Password</h3>
          {step === 1 ? (
            <form onSubmit={handleSendOtp}>
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          ) : step === 2 ? (
            <form onSubmit={handleVerifyOtp}>
              <div className="form-group mb-3">
                <label htmlFor="otp" className="form-label">OTP</label>
                <input
                  type="text"
                  className="form-control"
                  id="otp"
                  name="otp"
                  placeholder="Enter the OTP"
                  value={userOtp}
                  onChange={(e) => setUserOtp(e.target.value)}
                  required
                />
                <small className="form-text text-muted">OTP will expire in {otpTimer} seconds.</small>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword}>
              <div className="form-group mb-3">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
