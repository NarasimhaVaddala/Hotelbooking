// src/pages/Rooms.jsx
import React, { useState, useEffect } from 'react';
import axios from '../axios';
import RoomCard from '../components/RoomCard';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [sortOrder, setSortOrder] = useState(''); // 'asc' or 'desc'
  const [availabilityFilter, setAvailabilityFilter] = useState('all'); // 'all', 'available', 'notAvailable'

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await axios.get('/booking/rooms');
        console.log(data);
        
        setRooms(data.rooms);
        setFilteredRooms(data.rooms);
      } catch (error) {
        console.error('Error fetching rooms', error);
      }
    };
    fetchRooms();
  }, []);

  // Handle Price Sorting
  const handleSortChange = (order) => {
    setSortOrder(order);
    const sortedRooms = [...filteredRooms].sort((a, b) => {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    });
    setFilteredRooms(sortedRooms);
  };

  // Handle Availability Filter
  const handleAvailabilityChange = (filter) => {
    setAvailabilityFilter(filter);
    if (filter === 'available') {
      setFilteredRooms(rooms.filter((room) => room.availability === true));
    } else if (filter === 'notAvailable') {
      setFilteredRooms(rooms.filter((room) => room.availability === false));
    } else {
      setFilteredRooms(rooms);
    }
  };

  return (
    <div className="container my-4 mx-auto">
      {/* Filter and Sort Controls */}
      <div className="flex justify-between mb-4">
        {/* Sort by Price */}
        <div>
          <label className="mr-2 font-semibold">Sort by Price:</label>
          <select
            value={sortOrder}
            onChange={(e) => handleSortChange(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        {/* Filter by Availability */}
        <div>
          <label className="mr-2 font-semibold">Availability:</label>
          <select
            value={availabilityFilter}
            onChange={(e) => handleAvailabilityChange(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="notAvailable">Not Available</option>
          </select>
        </div>
      </div>

      {/* Display Rooms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
