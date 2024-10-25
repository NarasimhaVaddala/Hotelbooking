import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";


export default function Footer() {
  return (
     
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="mb-2">Contact us: info@heavenlyhotel.com | +91 123 456 7890</p>
          <div className="flex justify-center space-x-4 mb-2">
            <a href="#" className="hover:text-gray-400">
                <FaFacebook size={25}/>
            </a>
            <a href="#" className="hover:text-gray-400">

                <FaXTwitter size={25}/>
            </a>
            <a href="#" className="hover:text-gray-400">
                <FaInstagram size={25}/>
            </a>
          </div>
          <p>© 2024 Heavenly Hotels. All Rights Reserved.</p>
        </div>
      </footer>
  )
}
