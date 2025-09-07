

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [userInitial, setUserInitial] = useState<string>('');

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    if (userName && userName.length > 0) {
      setUserInitial(userName.charAt(0).toUpperCase());
    }
  }, []);

  return (
    <>
      <Head>
        <title>Finance Tracker</title>
        <meta name="description" content="Your personal finance tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" legacyBehavior>
            <a className="text-2xl font-bold text-gray-800">
              Finance Tracker
            </a>
          </Link>
          <nav>
            <ul className="flex space-x-4 items-center">
              <li>
                <Link href="/dashboard" legacyBehavior>
                  <a className="text-gray-600 hover:text-gray-900">Dashboard</a>
                </Link>
              </li>
              <li>
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                  {userInitial}
                </div>
              </li>
            
            </ul>
          </nav>
        </div>
      </header>

    
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </>
  );
};

export default Layout;