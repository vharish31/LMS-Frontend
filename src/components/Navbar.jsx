import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * App navigation bar - shows role context and home link
 */
const Navbar = ({ role, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => navigate("/")}
            className="text-xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            LMS
          </button>
          <div className="flex items-center gap-4">
            {role && (
              <span className="text-sm text-gray-500 capitalize">{role}</span>
            )}
            {onLogout && (
              <button
                onClick={onLogout}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Switch Role
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
