import React, { useState } from "react";

/**
 * Course card - displays course info with View Course button
 * Teacher mode: includes Edit and Delete buttons
 */
const CourseCard = ({ course, onDelete, onEdit, isTeacher = false }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: course.title,
    description: course.description,
    link: course.link,
    teacherName: course.teacherName,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit?.(course._id, formData);
    setEditing(false);
  };

  if (editing && isTeacher) {
    return (
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
      >
        <input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 mb-2 font-semibold"
          placeholder="Course Name"
          required
        />
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2 mb-2 text-sm"
          placeholder="Description"
          rows={2}
          required
        />
        <input
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 mb-2 text-sm"
          placeholder="Course Link"
          required
        />
        <input
          value={formData.teacherName}
          onChange={(e) =>
            setFormData({ ...formData, teacherName: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2 mb-2 text-sm"
          placeholder="Teacher Name"
          required
        />
        <div className="flex gap-2 mt-3">
          <button
            type="submit"
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm py-2 rounded-lg transition-colors"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setFormData({
                title: course.title,
                description: course.description,
                link: course.link,
                teacherName: course.teacherName,
              });
            }}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h2>
      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
        {course.description}
      </p>
      <p className="text-gray-500 text-sm mb-3">Teacher: {course.teacherName}</p>
      {course.createdAt && (
        <p className="text-gray-400 text-xs mb-3">
          Created: {new Date(course.createdAt).toLocaleDateString()}
        </p>
      )}
      <a
        href={course.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
      >
        View Course
      </a>
      {isTeacher && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setEditing(true)}
            className="bg-amber-500 hover:bg-amber-600 text-white text-sm py-2 px-3 rounded-lg transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete?.(course._id)}
            className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-3 rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
