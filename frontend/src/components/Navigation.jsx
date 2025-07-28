import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";

function Navigation() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="relative z-50 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-2xl border-b border-white/30 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3 hover:scale-105 transition-transform duration-300">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <span className="text-white font-bold text-xl">🚀</span>
            </div>
            <span className="text-2xl font-bold text-gradient tracking-tight">
              FocusFlow
            </span>
          </Link>

          {/* Navigation items */}
          <div className="flex items-center gap-6">
            {user ? (
              <>
                {/* Welcome message */}
                <div className="hidden md:block px-4 py-2 bg-gradient-to-r from-white/10 to-white/5 rounded-xl border border-white/20 backdrop-blur-sm">
                  <span className="text-white/90 font-medium">
                    Welcome, <span className="text-gradient font-bold">{user.firstName || user.email}</span> ✨
                  </span>
                </div>

                {/* Dashboard link */}
                <Link 
                  to="/dashboard" 
                  className="group px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-white/90 hover:text-white rounded-xl border border-blue-400/30 hover:border-blue-300/50 font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl backdrop-blur-sm"
                >
                  <span className="flex items-center gap-2">
                    📊 Dashboard
                  </span>
                </Link>

                {/* Analytics link */}
                <Link 
                  to="/analytics" 
                  className="group px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 text-white/90 hover:text-white rounded-xl border border-purple-400/30 hover:border-purple-300/50 font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl backdrop-blur-sm"
                >
                  <span className="flex items-center gap-2">
                    📈 Analytics
                  </span>
                </Link>

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="group px-4 py-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 text-white/90 hover:text-white rounded-xl border border-red-400/30 hover:border-red-300/50 font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl backdrop-blur-sm relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    🚪 Logout
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400/0 via-red-400/20 to-red-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </>
            ) : (
              <>
                {/* Login link */}
                <Link 
                  to="/login" 
                  className="px-6 py-3 text-white/90 hover:text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 relative group"
                >
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                </Link>

                {/* Register button */}
                <Link 
                  to="/register" 
                  className="btn-primary px-6 py-3 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="text-lg">✨</span>
                    Get Started
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom border gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </nav>
  );
}

export default Navigation;
