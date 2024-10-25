// src/pages/AddRoom.jsx
import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

export default function AddRoom() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [availability, setAvailability] = useState(true);
  const [image, setImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/booking/addroom', {
        name,
        price,
        description,
        availability,
        image,
      });
      if (response.data.success) {
        setShowModal(true); // Show success modal
      }
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Add New Room</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div>
          <label className="block font-semibold">Room Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter room name"
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Room description"
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Availability</label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value === 'true')}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter image URL"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Room
        </button>
      </form>

      {/* Modal for successful room addition */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Room Added Successfully!</h2>
            <button
              onClick={() => {
                setShowModal(false);
                navigate('/');
              }}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
