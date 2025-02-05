import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img src="https://i.ibb.co/KjBxBRQ/Untitled-design.gif" alt="AnyWays" className="h-10 w-10" />
            <span className="ml-2 text-white text-xl font-bold">AnyWays</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/search" className="text-white hover:text-background transition-colors">
              Search
            </Link>
            <Link to="/live-status" className="text-white hover:text-background transition-colors">
              Live Status
            </Link>
            <Link to="/pnr-status" className="text-white hover:text-background transition-colors">
              PNR Status
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-white hover:text-background transition-colors">
                  My Bookings
                </Link>
                <div className="flex items-center space-x-4">
                  <UserCircle 
                    className="h-8 w-8 text-white cursor-pointer hover:text-background transition-colors"
                    onClick={() => navigate('/dashboard')}
                  />
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-background transition-colors"
                  >
                    <LogOut className="h-6 w-6" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-background transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="bg-white text-primary px-4 py-2 rounded-md hover:bg-background transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}