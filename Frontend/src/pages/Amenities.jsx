// src/pages/Amenities.jsx
import React from 'react';

const amenitiesData = [
  {
    title: 'Free Wi-Fi',
    description: 'Enjoy complimentary high-speed Wi-Fi throughout the hotel, including rooms, the lobby, and common areas.',
    image: 'https://plus.unsplash.com/premium_photo-1683758343999-0975ec01d0cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8d2lmaXxlbnwwfHwwfHx8MA%3D%3D', // Replace with your image URL
  },
  {
    title: 'Swimming Pool',
    description: 'Take a dip in our outdoor swimming pool, perfect for relaxation and family fun.',
    image: 'https://media.istockphoto.com/id/1128066215/photo/group-of-teenage-friends-having-fun-in-swimming-pool-stock-image.webp?a=1&b=1&s=612x612&w=0&k=20&c=3w6sxyW6dSUV4aoUAxE6V2Nm7r399fy8Fjhy0Fv16_A=', // Replace with your image URL
  },
  {
    title: 'Fitness Center',
    description: 'Stay fit and active during your stay with access to our fully equipped fitness center.',
    image: 'https://plus.unsplash.com/premium_photo-1661920538067-c48451160c72?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zml0bmVzcyUyMGNlbnRlcnxlbnwwfHwwfHx8MA%3D%3D', // Replace with your image URL
  },
  {
    title: 'Spa Services',
    description: 'Indulge in a variety of rejuvenating spa treatments designed to relax and refresh your body and mind.',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3BhfGVufDB8fDB8fHww', // Replace with your image URL
  },
  {
    title: 'On-site Dining',
    description: 'Savor delicious meals at our on-site restaurant, offering a range of local and international dishes.',
    image: 'https://plus.unsplash.com/premium_photo-1661608951900-89613ba261a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGluaW5nfGVufDB8fDB8fHww', // Replace with your image URL
  },
  {
    title: 'Conference Rooms',
    description: 'Host successful meetings and events in our well-equipped conference rooms, perfect for business travelers.',
    image: 'https://plus.unsplash.com/premium_photo-1679547202671-f9dbbf466db4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29uZmVyZW5jZXxlbnwwfHwwfHx8MA%3D%3D', // Replace with your image URL
  },
];

const Amenities = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Our Amenities</h1>
      <p className="text-lg text-center mb-8">
        At Heavenly Hotel, we offer a range of amenities to ensure a comfortable and enjoyable stay.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {amenitiesData.map((amenity, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-all">
            <img src={amenity.image} alt={amenity.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-2">{amenity.title}</h2>
              <p className="text-gray-700">{amenity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
