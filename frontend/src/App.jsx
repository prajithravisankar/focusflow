import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// These should ALL say ./components/
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Dashboard from './components/Dashboard'
import Analytics from './components/Analytics'
import PomodoroTimer from './components/Pomodoro/PomodoroTimer'
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
