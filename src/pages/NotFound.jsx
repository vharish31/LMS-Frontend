import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-bold text-gray-300 mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-6">Page not found</p>
      <button
        onClick={() => navigate("/")}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
