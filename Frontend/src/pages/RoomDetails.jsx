// src/pages/RoomDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from '../axios'; 
import { useNavigate, useParams } from 'react-router-dom';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [userId, setUserId] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [note, setNote] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [confirmationId, setConfirmationId] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchRoomDetails();
  }, [id]);

  const fetchRoomDetails = async () => {
    const { data } = await axios.get(`/booking/rooms/${id}`);
    setRoom(data.room);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!token) return navigate('/login');

    try {
      const response = await axios.post('/booking/book', {
        roomId: id,
        checkIn,
        checkOut,
        note,
        paymentDetails,
      }, {
        headers: {
          token: token,
        },
      });

      if (response.data) {
        setConfirmationId(response.data.booking._id);
        setShowModal(true);
        
      }

    } catch (error) {
      console.error('Booking failed. Please try again.');
    }
  };

  if (!room) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row">
      {/* Image Section */}
      <div className="md:w-1/2">
        <img src={room.image} alt={room.name} className="w-full h-64 object-cover mb-4" />
      </div>

      {/* Content Section */}
      <div className="md:w-1/2 md:pl-6">
        <h2 className="text-3xl font-bold mb-4">{room.name}</h2>
        <p className="text-lg mb-2"><strong>Description:</strong> {room.description}</p>
        <p className="text-lg mb-2"><strong>Price:</strong> ₹ {room.price}</p>
        <p className="text-lg mb-2"><strong>Availability:</strong> {room.availability ? 'Available' : 'Not Available'}</p>

        <h3 className="text-2xl font-semibold mt-6 mb-4">Book Now</h3>
        <form onSubmit={handleBooking} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Check-in Date</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
              className="mt-1 block w-full border-gray-500 rounded-md shadow-sm border p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Check-out Date</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
              className="mt-1 block w-full border-gray-500 rounded-md shadow-sm border p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Card Number</label>
            <input
              type="text"
              value={paymentDetails}
              onChange={(e) => setPaymentDetails(e.target.value)}
              placeholder="Enter Card Number"
              required
              className="mt-1 block w-full border-gray-500 rounded-md shadow-sm border p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Any special requirements, Write a Note</label>
            <textarea 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-1 block w-full border-gray-500 rounded-md shadow-sm border p-2"
            ></textarea>
          </div>

          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Book Now</button>
        </form>

        {/* Booking Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Booking Successful!</h2>
              <p>Your booking was successful. Confirmation ID:</p>
              <p className="font-semibold mt-2">{confirmationId}</p>
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate('/booking');
                }}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetails;
