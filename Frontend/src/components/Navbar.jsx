// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem('token');
  const loc = useLocation();
  const navigate = useNavigate()

  


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger Icon */}
      <div className="flex justify-between items-center p-4 bg-blue-300 shadow md:hidden">
      <Link to="/" className='cursor-pointer'><h1 className="text-2xl font-bold">
          Heavenly Hotel
        </h1></Link>
        <button onClick={toggleSidebar} className="text-2xl z-40">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <div

        className={`fixed z-30 inset-0 bg-blue-400 bg-opacity-90 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}
      >
        <div className="flex flex-col items-start p-4">
          <h2 className="text-2xl font-bold text-white mb-4">Heavenly Hotel</h2>
          <ul className="flex flex-col space-y-4">
            <li>
              <Link to="/" onClick={toggleSidebar} className={`text-lg ${loc.pathname==="/"?"text-yellow-500":"text-white"}`}>Home</Link>
            </li>
            <li>
              <Link to="/rooms" onClick={toggleSidebar} className={`text-lg ${loc.pathname==="/rooms"?"text-yellow-500":"text-white"}`}>Rooms</Link>
            </li>
            <li>
              <Link to="/amenities" onClick={toggleSidebar} className={`text-lg ${loc.pathname==="/amenities"?"text-yellow-500":"text-white"}`}>Amenities</Link>
            </li>
           
           {!token && <li>
              <Link to="/login" onClick={toggleSidebar} className={`text-lg ${loc.pathname==="/login"?"text-yellow-500":"text-white"}`}>Login</Link>
            </li>}
            {!token && <li>
              <Link to="/signup" onClick={toggleSidebar} className={`text-lg ${loc.pathname==="/signup"?"text-yellow-500":"text-white"}`}>Signup</Link>
            </li>}

            {
                token && <li> <Link to="/booking" className={`text-lg ${loc.pathname==="/bookings"?"text-yellow-500":"text-white"}`}>Bookings</Link></li>
            }
            {
                token && <li> <button className="text-black text-lg" onClick={()=>{localStorage.removeItem('token'); navigate('/'); toggleSidebar()}}>Logout</button></li>
            }
          </ul>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-blue-300 shadow">
        <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className='cursor-pointer'><h1 className="text-2xl font-bold">
          Heavenly Hotel
        </h1></Link>
          <ul className="flex space-x-4">
            <li><Link to="/" className={`text-lg ${loc.pathname==="/"?"text-yellow-500":"text-white"} hover:text-yellow-900`}>Home</Link></li>
            <li><Link to="/rooms" className={`text-lg ${loc.pathname==="/rooms"?"text-yellow-500":"text-white"} hover:text-yellow-900`}>Rooms</Link></li>
            <li><Link to="/amenities" className={`text-lg ${loc.pathname==="/amenities"?"text-yellow-500":"text-white"} hover:text-yellow-900`}>Amenities</Link></li>
            <li><Link to="/booking" className={`text-lg ${loc.pathname==="/booking"?"text-yellow-500":"text-white"} hover:text-yellow-900`}>Bookings</Link></li>
            
            {!token && <li><Link to="/login" className={`text-lg ${loc.pathname==="/login"?"text-yellow-500":"text-white"} hover:text-yellow-900`}>Login</Link></li>}
            {!token && <li><Link to="/signup" className={`text-lg ${loc.pathname==="/signup"?"text-yellow-500":"text-white"} hover:text-yellow-900`}>Signup</Link></li>}
            {
                token && <li> <button className="text-white text-lg" onClick={()=>{localStorage.removeItem('token'); navigate('/')}}>Logout</button></li>
            }
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
