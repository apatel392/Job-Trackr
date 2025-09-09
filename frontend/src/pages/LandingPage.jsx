import React from "react";
import { Link } from "react-router-dom"; // If using React Router

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Logo as Text */}
      <h1 className="text-6xl font-extrabold text-blue-600 mb-6">
        JobTrackr
      </h1>

      {/* Tagline */}
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">
        Track Your Job Applications Easily
      </h2>

      {/* Description */}
      <p className="text-center text-gray-600 max-w-md mb-8">
        Keep all your job applications in one place, monitor progress, and never miss an opportunity.
      </p>

      {/* Buttons */}
      <div className="flex space-x-4">
        <Link
          to="/register"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
