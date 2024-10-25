// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RoomDetails from './pages/RoomDetails';
import Footer from './components/Footer';
import Amenities from './pages/Amenities';
import 'react-toastify/dist/ReactToastify.css';
import Bookings from './pages/Booking';
import AddRoom from './admin/AddRoom';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/amenities" element={<Amenities />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/booking" element={<Bookings />} />
        <Route path="/addroom" element={<AddRoom />} />

      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
