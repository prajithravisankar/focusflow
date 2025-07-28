import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

function Navigation() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 dark:bg-gray-800 text-white p-4 flex justify-between items-center transition-colors duration-200">
      <Link to="/" className="text-lg font-bold">
        FocusFlow
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {user ? (
          <>
            <span className="mr-4">Welcome, {user.firstName || user.email}</span>
            <Link to="/dashboard" className="mr-4 hover:underline">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 dark:bg-red-600 px-4 py-2 rounded hover:bg-red-600 dark:hover:bg-red-700 transition-colors duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4 hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
