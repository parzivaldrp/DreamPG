'use client'
import { Inter } from "next/font/google";
import Bootstrap from "./pages/Bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./component/Footer";
import Navbar from './pages/Navbar';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [isUserLayout, setIsUserLayout] = useState(true);

  useEffect(() => {
    if (pathname) {
      setIsUserLayout(!pathname.includes('/admin'));
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <Bootstrap/>
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
          {isUserLayout && <Navbar />}
          <div className="man">
            {children}
          </div>
          <div className="lan">
            {isUserLayout && <Footer />}
          </div>
        </div>
      </body>
    </html>
  );
}
