'use client'
import React from 'react';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/navigation'
function Footer() {
  const router = useRouter()

  return (
    <div>
      <footer className="bg-secondary text-center text-white">
        <div className="container p-4 pb-0">
        <section className="mb-4">
      {/* Use React Icons */}
      <a className="btn btn-outline-primary btn-floating m-1 border border-white" href="#!" role="button" onClick={() => router.push('/your-path-1')}><FaFacebookF /></a>
      <a className="btn btn-outline-primary btn-floating m-1 border border-white" href="#!" role="button" onClick={() => router.push('/your-path-2')}><FaTwitter /></a>
      <a className="btn btn-outline-primary btn-floating m-1 border border-white" href="#!" role="button" onClick={() => router.push('/your-path-3')}><FaGoogle /></a>
      <a className="btn btn-outline-primary btn-floating m-1 border border-white" href="#!" role="button" onClick={() => router.push('/your-path-4')}><FaInstagram /></a>
      <a className="btn btn-outline-primary btn-floating m-1 border border-white" href="#!" role="button" onClick={() => router.push('/your-path-5')}><FaLinkedinIn /></a>
      {/* Use router.push to navigate when the button is clicked */}
      <a className="btn btn-outline-primary btn-floating m-1 border border-white" href="#!" role="button" onClick={() => router.push('/your-path-6')}><FaGithub /></a>
    </section>
        </div>

        <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          © 2024 Copyright:
          <a className="text-white" href="/">DreamPG.com</a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
