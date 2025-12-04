// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('jwt_token');

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          {/* Logo/App Name */}
          <Link to={isAuthenticated ? "/" : "/login"} className="text-2xl font-extrabold text-indigo-600 tracking-wider">
            NoteApp
          </Link>

          <nav className="flex space-x-4 items-center">
            {isAuthenticated ? (
              <>
                <Link to="/" className="text-gray-600 hover:text-indigo-600 transition duration-150 font-medium">
                  Dashboard
                </Link>
                <Link to="/categories" className="text-gray-600 hover:text-indigo-600 transition duration-150 font-medium">
                  Categories
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-indigo-600 transition duration-150 font-medium">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1 px-3 rounded-md transition duration-150"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-indigo-600 transition duration-150 font-medium">
                  Login
                </Link>
                <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-1.5 px-3 rounded-md transition duration-150">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
