import React, { useState, useEffect } from "react";
import { getCourses } from "../services/api";
import CourseCard from "../components/CourseCard";

/**
 * Student Home - View-only list of courses
 */
const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      setError(null);
      const { data } = await getCourses();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Courses</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
            {error}
          </div>
        )}

        {/* Course list */}
        {loading ? (
          <div className="text-gray-500">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center text-gray-500">
            No courses available yet.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(courses) &&
              courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;