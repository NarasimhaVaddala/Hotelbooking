import React, { useState } from 'react';
import axios from '../axios'; 
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/rooms');
    } catch (error) {
      toast.error("Invalid Credentials" , {
        autoClose:1000
      })
    }
  };

  return (
    <div className="container h-[80vh] mx-auto max-w-sm mt-10">
      <ToastContainer/>
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleLogin}>
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
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full" type="submit">Login</button>

        <p>Donot have Account ? <Link to="/signup">Signup</Link></p>

      </form>
    </div>
  );
};

export default Login;
