import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleModal from "./components/RoleModal";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TeacherDashboard from "./pages/TeacherDashboard";
import NotFound from "./pages/NotFound";

/**
 * Root App - Role selection modal on load
 * Student: Home page | Teacher: Dashboard
 */
function App() {
  const [role, setRole] = useState(null);

  const handleLogout = () => {
    setRole(null);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Role selection modal - shown on first load */}
        {!role && <RoleModal setRole={setRole} />}

        {/* Main content when role is selected */}
        {role && (
          <>
            <Navbar role={role} onLogout={handleLogout} />
            <main>
              <Routes>
                <Route
                  path="/"
                  element={
                    role === "student" ? <Home /> : <TeacherDashboard />
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
