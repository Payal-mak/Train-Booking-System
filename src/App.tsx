import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchForm from './components/SearchForm';
import SearchResults from './pages/SearchResults';
import Booking from './pages/Booking';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LiveStatus from './pages/LiveStatus';
import PNRStatus from './pages/PNRStatus';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <div className="relative -mt-20 px-4 sm:px-6 lg:px-8">
                <SearchForm />
              </div>
              <section className="max-w-7xl mx-auto mt-24 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <img src="https://i.ibb.co/j3LJSfr/route.png" alt="route" className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Smart Routing</h3>
                    <p className="mt-2 text-gray-600">Find the fastest route with our intelligent connection algorithm.</p>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <img src="https://i.ibb.co/JvSVfSh/clock.gif" alt="clock" className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Real-time Updates</h3>
                    <p className="mt-2 text-gray-600">Stay informed with live train status and delay predictions.</p>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <img src="https://i.ibb.co/zZkpJgf/ticket.png" alt="ticket" className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Easy Booking</h3>
                    <p className="mt-2 text-gray-600">Simple and secure booking process with instant confirmation.</p>
                  </div>
                </div>
              </section>
            </>
          } />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/live-status" element={<LiveStatus />} />
          <Route path="/pnr-status" element={<PNRStatus />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;