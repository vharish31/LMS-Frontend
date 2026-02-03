import React, { useState, useEffect } from "react";
import { getCourses, createCourse, updateCourse, deleteCourse } from "../services/api";
import CourseCard from "../components/CourseCard";

/**
 * Teacher Dashboard - Add, Edit, Delete courses
 * Toast notifications for success/error
 */
const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

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

  const handleAdd = async (e) => {
    e?.preventDefault();
    if (!title?.trim() || !description?.trim() || !link?.trim() || !teacherName?.trim()) {
      showToast("Please fill all fields", "error");
      return;
    }
    try {
      await createCourse({ title, description, link, teacherName });
      showToast("Course added successfully");
      fetchCourses();
      setTitle("");
      setDescription("");
      setLink("");
      setTeacherName("");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const handleEdit = async (id, data) => {
    try {
      await updateCourse(id, data);
      showToast("Course updated successfully");
      fetchCourses();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      showToast("Course deleted successfully");
      fetchCourses();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in ${
            toast.type === "error" ? "bg-red-500" : "bg-emerald-500"
          } text-white font-medium`}
          role="alert"
        >
          {toast.message}
        </div>
      )}

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Teacher Dashboard</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
            {error}
          </div>
        )}

        {/* Add course form */}
        <form onSubmit={handleAdd} className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Course</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              placeholder="Course Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-indigo-500 focus:outline-none"
            />
            <input
              placeholder="Teacher Name"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-indigo-500 focus:outline-none"
            />
            <input
              placeholder="Course Link (YouTube / Drive / URL)"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="sm:col-span-2 border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-indigo-500 focus:outline-none"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="sm:col-span-2 border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-indigo-500 focus:outline-none"
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
          >
            Add Course
          </button>
        </form>

        {/* Course list */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Courses</h2>
        {loading ? (
          <div className="text-gray-500">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center text-gray-500">
            No courses yet. Add your first course above.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(courses) && courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                onDelete={handleDelete}
                onEdit={handleEdit}
                isTeacher
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;