// src/components/RoomCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden">
      <img
        src={room.image} // Display the room image
        alt={room.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{room.name}</h2>
        <p className="text-gray-700">{room.description}</p>
        <p className="text-lg font-bold mt-2"> ₹ {room.price}</p>
        <p className={`mt-2 ${room.availability ? 'text-green-500' : 'text-red-500'}`}>
          {room.availability ? 'Available' : 'Not Available'}
        </p>
        {room.availability && <Link to={`/rooms/${room._id}`} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded block text-center">
          Book Now
        </Link>}
      </div>
    </div>
  );
};

export default RoomCard;
