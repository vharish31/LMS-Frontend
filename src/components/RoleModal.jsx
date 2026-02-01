import React, { useState, useEffect } from "react";

/**
 * Role selection modal - displayed on initial page load
 * Student: Direct access | Teacher: Password required (1234)
 */
const RoleModal = ({ setRole }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Smooth entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleStudent = () => {
    setRole("student");
  };

  const handleTeacher = () => {
    setShowPassword(true);
    setError("");
    setPassword("");
  };

  const handleBack = () => {
    setShowPassword(false);
    setError("");
    setPassword("");
  };

  const handlePasswordSubmit = (e) => {
    e?.preventDefault();
    if (password === "1234") {
      setRole("teacher");
    } else {
      setError("Wrong password! Please try again.");
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="role-modal-title"
    >
      <div
        className={`bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm mx-4 transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <h2 id="role-modal-title" className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Welcome to LMS
        </h2>

        {!showPassword ? (
          <div className="space-y-4">
            <button
              onClick={handleStudent}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <span>🎓</span> Student
            </button>
            <button
              onClick={handleTeacher}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <span>👨‍🏫</span> Teacher
            </button>
          </div>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <p className="text-sm text-gray-600 mb-2">Enter teacher password:</p>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:outline-none transition-colors"
              autoFocus
              aria-label="Teacher password"
            />
            {error && (
              <p className="text-red-500 text-sm" role="alert">
                {error}
              </p>
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 rounded-xl transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-xl transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RoleModal;
