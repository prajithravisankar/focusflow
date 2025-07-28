import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext.jsx";

function Login() {
  const { login, error, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!email || !password) {
      setFormError("Please fill in all fields.");
      return;
    }

    const success = await login({ email, password });
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center relative overflow-hidden">
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-40 right-32 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-lg rotate-45 animate-float"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 border-2 border-white/30 rotate-12 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-gradient-to-br from-pink-400/20 to-red-400/20 rounded-full animate-float"></div>
      </div>

      {/* Main login container */}
      <div className="relative z-10 w-full max-w-md p-8 animate-slide-up">
        <div className="bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl p-8 relative overflow-hidden">
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl border border-white/30 shadow-lg mb-4">
              <h1 className="text-4xl font-bold text-gradient">🚀</h1>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/80 text-lg">Sign in to continue your productivity journey</p>
            <div className="w-16 h-1 bg-gradient-primary mx-auto mt-4 rounded-full"></div>
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

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/90 font-semibold mb-3">
                📧 Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input-modern"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-white/90 font-semibold mb-3">
                🔒 Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input-modern"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 relative overflow-hidden ${
                loading 
                  ? "bg-gradient-to-r from-gray-500/30 to-gray-600/30 text-white/60 cursor-not-allowed" 
                  : "btn-primary hover:scale-105 hover:-translate-y-1"
              }`}
              disabled={loading}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <div className="spinner w-6 h-6"></div>
                    Signing you in...
                  </>
                ) : (
                  <>
                    <span className="text-xl">✨</span>
                    Sign In
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Register link */}
          <div className="text-center mt-8">
            <p className="text-white/80">
              Don't have an account?{" "}
              <Link 
                to="/register" 
                className="text-blue-300 hover:text-blue-200 font-semibold underline decoration-2 underline-offset-4 hover:decoration-blue-300 transition-all duration-300"
              >
                Create Account
              </Link>
            </p>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-sm"></div>
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-pink-400/30 to-red-400/30 rounded-full blur-sm"></div>
        </div>

        {/* Bottom decorative text */}
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            ✨ Boost your productivity with beautiful focus sessions ✨
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;