

import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

const HomePage: React.FC = () => {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(true);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <p className="text-2xl font-semibold text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Finance Tracker - Login/Sign Up</title>
      </Head>

      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="mt-6 text-5xl font-extrabold text-gray-900 drop-shadow-lg">
            Welcome to your Finance Tracker!
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            {showLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => setShowLogin(!showLogin)}
              className="font-semibold text-indigo-600 hover:text-indigo-800 ml-2 transition duration-300"
            >
              {showLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>

        {showLogin ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
};

export default HomePage;