import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary min-h-[600px] flex items-center">
      <div className="absolute inset-0 opacity-10">
        <img src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=2000&q=80" 
             alt="Background" 
             className="w-full h-full object-cover" />
      </div>
      
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="max-w-xl animate-slide-up">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Travel Seamlessly
              <span className="block text-background mt-2">Across the Network</span>
            </h1>
            <p className="mt-6 max-w-lg text-xl text-light animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Book your journey with smart connections and real-time updates. 
              We'll find the best route for you, even when there's no direct train available.
            </p>
            <div className="mt-10 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <a
                href="#search"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-full text-white hover:bg-white hover:text-primary transition-all duration-300 animate-pulse-shadow"
              >
                Start Booking
                <ArrowRight className="ml-2 h-5 w-5 animate-float" />
              </a>
            </div>
          </div>
          <div className="hidden lg:block">
            <dotlottie-player 
              src="https://lottie.host/0499c368-8cbb-452c-9ea4-909e67149e38/SLZY8icI2q.json" 
              background="transparent" 
              speed="1" 
              style={{ width: '400px', height: '400px' }} 
              loop 
              autoplay
            ></dotlottie-player>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-gray-50">
          <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
}