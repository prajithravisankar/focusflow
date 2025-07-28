import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskContext from "../../context/TaskContext.jsx";
import SessionContext from "../../context/SessionContext.jsx";

function PomodoroTimer() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { tasks } = useContext(TaskContext);
  const { createSession, finishSession, currentSession } = useContext(SessionContext);
  
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState("focus"); // focus or break
  const [sessionId, setSessionId] = useState(null);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  const task = tasks.find(t => t._id === taskId);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]); // Removed timeLeft from dependencies to prevent recreation

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = async () => {
    if (!sessionId) {
      const newSessionId = await createSession({
        taskId: sessionType === "focus" ? taskId : null,
        sessionType,
        duration: sessionType === "focus" ? focusDuration : breakDuration,
        startTime: new Date(),
        endTime: new Date(Date.now() + (sessionType === "focus" ? focusDuration : breakDuration) * 60 * 1000)
      });
      setSessionId(newSessionId);
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft((sessionType === "focus" ? focusDuration : breakDuration) * 60);
  };

  const handleTimerComplete = async () => {
    setIsRunning(false);
    
    if (sessionId) {
      await finishSession(sessionId);
      setSessionId(null);
    }

    if (sessionType === "focus") {
      // Switch to break
      setSessionType("break");
      setTimeLeft(breakDuration * 60);
      alert("Focus session complete! Time for a break.");
    } else {
      // Switch to focus
      setSessionType("focus");
      setTimeLeft(focusDuration * 60);
      alert("Break complete! Ready for another focus session?");
    }
  };

  const switchMode = (mode) => {
    if (isRunning) {
      pauseTimer();
    }
    setSessionType(mode);
    setTimeLeft((mode === "focus" ? focusDuration : breakDuration) * 60);
    setSessionId(null);
  };

  const handleDurationChange = (type, value) => {
    if (type === "focus") {
      setFocusDuration(value);
      if (sessionType === "focus" && !isRunning) {
        setTimeLeft(value * 60);
      }
    } else {
      setBreakDuration(value);
      if (sessionType === "break" && !isRunning) {
        setTimeLeft(value * 60);
      }
    }
  };

  if (!task) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Task not found</h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">Pomodoro Timer</h1>
            <h2 className="text-xl text-gray-600 mb-2">{task.title}</h2>
            {task.description && (
              <p className="text-gray-500">{task.description}</p>
            )}
          </div>

          <div className="text-center mb-6">
            <div className="flex justify-center gap-2 mb-4">
              <button
                onClick={() => switchMode("focus")}
                className={`px-4 py-2 rounded ${
                  sessionType === "focus" 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Focus
              </button>
              <button
                onClick={() => switchMode("break")}
                className={`px-4 py-2 rounded ${
                  sessionType === "break" 
                    ? "bg-green-500 text-white" 
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Break
              </button>
            </div>

            <div className="text-6xl font-bold mb-6 text-gray-800">
              {formatTime(timeLeft)}
            </div>

            <div className="flex justify-center gap-4 mb-6">
              {!isRunning ? (
                <button
                  onClick={startTimer}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600"
                >
                  Start
                </button>
              ) : (
                <button
                  onClick={pauseTimer}
                  className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-yellow-600"
                >
                  Pause
                </button>
              )}
              <button
                onClick={resetTimer}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-600"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-bold mb-4">Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Focus Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={focusDuration}
                  onChange={(e) => handleDurationChange("focus", parseInt(e.target.value))}
                  className="w-full p-2 border rounded"
                  disabled={isRunning}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Break Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={breakDuration}
                  onChange={(e) => handleDurationChange("break", parseInt(e.target.value))}
                  className="w-full p-2 border rounded"
                  disabled={isRunning}
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PomodoroTimer;