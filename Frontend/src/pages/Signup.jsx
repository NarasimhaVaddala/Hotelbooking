// src/pages/Signup.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axios'; // Import the Axios instance
import { ToastContainer, toast } from 'react-toastify';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/auth/signup', { name, email, password });
      localStorage.setItem('token', data.token);
      navigate('/rooms');
    } catch (error) {
      toast.error("Something went wrong please try again")
    }
  };

  return (
    <div className="h-[80vh] container mx-auto max-w-sm mt-10">

      <ToastContainer/>
      <h2 className="text-2xl mb-4">Signup</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          className="border p-2 w-full mb-4 border-gray-400"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          className="border p-2 w-full mb-4 border-gray-400"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="border p-2 w-full mb-4 border-gray-400"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          type="submit"
        >
          Signup
        </button>
      </form>

      
      <p>Already have Account ? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Signup;
