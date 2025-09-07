// src/components/auth/LoginForm.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

// Access the environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    // Ensure the API base URL is available
    if (!API_BASE_URL) {
      setError('API URL is not defined in environment variables.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signin`, {
        email,
        password,
      });

      setSuccess('Login successful! Redirecting...');

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('userName', response.data.name);
      router.push('/dashboard');

      
     
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Login failed. Please try again.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
  <form action="" onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto'>
   <h2 className='text-2xl font-bold md-4 text-gray-900 text-center'>Login</h2>
    {success && <p className='text-green-500 mb-4'>{success}</p>}
    {error && <p className='text-red-500 mb-4'>{error}</p>}

    <div className='mb-4'>
      
      <label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2'>
        email
      </label>

      <input type="email" id='email' value={email}
      onChange={(e) => setEmail(e.target.value)}
      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      placeholder='Enter your email' required/>
    </div>

    <div className='mb-6'>
      
      <label htmlFor="password" className='block text-gray-700 text-sm font-bold mb-2'>
        password
      </label>

      <input type="password" id='password' value={password}
      onChange={(e) => setPassword(e.target.value)}
      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      placeholder='Enter your password' required/>
    </div>

    <div className='flext items-center justify-between'>
     <button type='submit' disabled={loading} 
     className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
     {loading ? 'Logging in...' : 'Login'}
     </button>
    </div>
   
  </form>
  );
};

export default LoginForm;