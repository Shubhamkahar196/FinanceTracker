// src/pages/index.tsx

import Head from 'next/head';
import { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

const HomePage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Finance Tracker - Login/Sign Up</title>
      </Head>

      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="mt-6 text-3xl font-extrabold text-gray-100">
            Welcome to your Finance Tracker!
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            {showLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => setShowLogin(!showLogin)}
              className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
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