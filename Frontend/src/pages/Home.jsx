// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import axios from "../axios";

const Home = () => {
  const [roomsPreview, setRoomsPreview] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await axios.get("/booking/rooms");
        console.log(data);

        setRoomsPreview(data.rooms);
      } catch (error) {
        console.error("Error fetching rooms", error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div>
      {/* Welcome Banner */}
      <div className="home-hero text-white text-center p-10 flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold mb-2">Welcome to Heavenly Hotel</h1>
        <p className="text-lg mb-4">
          Experience luxury and comfort like never before.
        </p>
        <Link to="/rooms">
          <button className="bg-yellow-400 text-black px-6 py-3 rounded shadow-lg hover:bg-yellow-300 transition duration-300">
            Book Now
          </button>
        </Link>
      </div>

      {/* About Section */}
      <div className="container mx-auto my-10 p-4 flex flex-col md:flex-row items-center lg:h-screen">
        {/* Content on the left */}
        <div className="md:w-1/2 p-4">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-gray-700 mb-4">
            We are dedicated to providing you with an unforgettable experience in
            our beautiful hotel. Our amenities and services are tailored to meet
            your every need.
          </p>
          <p className="text-gray-700 mb-4">
            With luxurious accommodations, a tranquil atmosphere, and a staff that
            is committed to excellence, we aim to make your stay as enjoyable
            and memorable as possible.
          </p>
          <p className="text-gray-700 mb-4">
            Our hotel features a variety of rooms to suit your needs, along with
            top-notch amenities such as a spa, swimming pool, and gourmet dining.
          </p>
          <p className="text-gray-700">
            Whether you’re here for business or pleasure, Heavenly Hotel is the
            perfect place to unwind and enjoy the finer things in life.
          </p>
        </div>
        {/* Image on the right */}
        <div className="md:w-1/2">
          <img
            src="https://plus.unsplash.com/premium_photo-1661876403473-64980cbfdf0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWwlMjBpbnRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D" // Replace with your image URL
            alt="Hotel Interior"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Room Preview */}
      <div className="container mx-auto my-10 p-4">
        <h2 className="text-3xl font-bold mb-4">Popular Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roomsPreview.slice(0, 3).map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
