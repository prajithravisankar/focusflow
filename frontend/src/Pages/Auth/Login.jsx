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
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="w-96 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Login</h1>
        {formError && <p className="text-red-500 mb-4">{formError}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className={`w-full p-2 rounded transition-colors duration-200 ${
              loading ? "bg-gray-400 dark:bg-gray-600" : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-sm mt-4 text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 dark:text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;