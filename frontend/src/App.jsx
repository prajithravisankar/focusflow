import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/Pages/Auth/Login";
import Register from "../src/Pages/Auth/Register";
import Dashboard from "../src/Pages/Dashboard/Dashboard";
import Analytics from "../src/Pages/Analytics";
import PomodoroTimer from "./Pages/Pomodoro/PomodoroTimer";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pomodoro"
            element={
              <ProtectedRoute>
                <PomodoroTimer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pomodoro/:taskId"
            element={
              <ProtectedRoute>
                <PomodoroTimer />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
