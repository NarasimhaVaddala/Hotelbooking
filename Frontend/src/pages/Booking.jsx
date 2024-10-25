// src/pages/Bookings.jsx
import React, { useEffect, useState } from 'react';
import axios from '../axios';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get('/booking/user-bookings', {
          headers: { token:token },
        });
        setBookings(data.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Your Bookings</h2>
      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="border p-4 rounded-lg shadow-md">
              <img
                src={booking.roomId?.image}
                alt={booking.roomId?.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold">{booking.roomId?.name || 'Room'}</h3>
              <p className="text-gray-700">Price: ₹{booking.roomId?.price}</p>
              <p className="text-gray-700">Check-In: {new Date(booking.checkIn).toLocaleDateString()}</p>
              <p className="text-gray-700">Check-Out: {new Date(booking.checkOut).toLocaleDateString()}</p>
              <p className="text-gray-700">Payment Details: {booking.paymentDetails}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700">No bookings found.</p>
      )}
    </div>
  );
};

export default Bookings;
