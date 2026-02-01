import axios from "axios";

// VITE_API_URL in .env for production; /api uses Vite proxy in dev
const baseURL = import.meta.env.VITE_API_URL || "/api";

const API = axios.create({
  baseURL,
  timeout: 10000,
});

// Handle connection errors (e.g., when backend is down due to DB failure)
API.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.code === "ECONNREFUSED" || err.message?.includes("Network Error")
        ? "Unable to connect to server. Ensure the backend is running and MongoDB is connected."
        : err.response?.data?.message || err.message;
    return Promise.reject(new Error(message));
  }
);

export const getCourses = () => API.get("/courses");
export const createCourse = (data) => API.post("/courses", data);
export const updateCourse = (id, data) => API.put(`/courses/${id}`, data);
export const deleteCourse = (id) => API.delete(`/courses/${id}`);
