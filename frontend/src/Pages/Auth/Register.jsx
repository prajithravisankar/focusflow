import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext.jsx";

function Register() {
  const { register, error, loading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setFormError("Please fill in all fields.");
      return;
    }

    const success = await register(formData);
    if (success) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center relative overflow-hidden py-8">
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-16 w-24 h-24 border border-white/20 rounded-lg rotate-45 animate-pulse-slow"></div>
        <div className="absolute top-1/4 right-20 w-16 h-16 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full animate-float"></div>
        <div className="absolute bottom-1/4 left-32 w-20 h-20 border-2 border-white/30 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-32 right-16 w-28 h-28 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-lg rotate-12 animate-float"></div>
      </div>

      {/* Main register container */}
      <div className="relative z-10 w-full max-w-lg p-8 animate-slide-up">
        <div className="bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl p-8 relative overflow-hidden">
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl border border-white/30 shadow-lg mb-4">
              <h1 className="text-4xl font-bold text-gradient">🎯</h1>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Join FocusFlow</h1>
            <p className="text-white/80 text-lg">Start your productivity transformation today</p>
            <div className="w-16 h-1 bg-gradient-secondary mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Error messages */}
          {(formError || error) && (
            <div className="mb-6 animate-scale-in">
              <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-xl border-2 border-red-300/50 text-red-100 px-4 py-3 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xl">⚠️</span>
                  <span className="font-semibold">{formError || error}</span>
                </div>
              </div>
            </div>
          )}

          {/* Register form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/90 font-semibold mb-3">
                  👤 First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  className="input-modern"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-white/90 font-semibold mb-3">
                  👤 Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  className="input-modern"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white/90 font-semibold mb-3">
                📧 Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input-modern"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-white/90 font-semibold mb-3">
                🔒 Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Create a secure password"
                className="input-modern"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 relative overflow-hidden ${
                loading 
                  ? "bg-gradient-to-r from-gray-500/30 to-gray-600/30 text-white/60 cursor-not-allowed" 
                  : "bg-gradient-secondary hover:scale-105 hover:-translate-y-1 text-white shadow-lg hover:shadow-2xl"
              }`}
              disabled={loading}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <div className="spinner w-6 h-6"></div>
                    Creating your account...
                  </>
                ) : (
                  <>
                    <span className="text-xl">🚀</span>
                    Create Account
                  </>
                )}
              </span>
              {!loading && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </button>
          </form>

          {/* Login link */}
          <div className="text-center mt-8">
            <p className="text-white/80">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-pink-300 hover:text-pink-200 font-semibold underline decoration-2 underline-offset-4 hover:decoration-pink-300 transition-all duration-300"
              >
                Sign In
              </Link>
            </p>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-full blur-sm"></div>
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-400/30 to-blue-400/30 rounded-full blur-sm"></div>
        </div>

        {/* Bottom decorative text */}
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            🎯 Transform your workflow with focused productivity sessions 🎯
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;