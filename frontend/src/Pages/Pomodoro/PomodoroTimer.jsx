import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskContext from "../../context/TaskContext.jsx";
import SessionContext from "../../context/SessionContext.jsx";

function PomodoroTimer() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { tasks } = useContext(TaskContext);
  const { createSession, finishSession, currentSession, updateCurrentSession } = useContext(SessionContext);
  
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState("focus"); // focus or break
  const [sessionId, setSessionId] = useState(null);
  const [sessionStartTime, setSessionStartTime] = useState(null); // Track when session actually started
  const [totalElapsedTime, setTotalElapsedTime] = useState(0); // Track total elapsed time in minutes
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
      setTotalElapsedTime(0); // Reset total elapsed time for new session
    }
    setSessionStartTime(new Date()); // Track when this timer run started
    setIsRunning(true);
  };

  const pauseTimer = async () => {
    if (sessionStartTime && sessionId) {
      // Calculate elapsed time for this timer run in minutes
      const now = new Date();
      const elapsedSeconds = Math.floor((now - sessionStartTime) / 1000);
      const elapsedMinutes = Math.floor(elapsedSeconds / 60);
      
      // Add to total elapsed time
      const newTotalElapsed = totalElapsedTime + elapsedMinutes;
      setTotalElapsedTime(newTotalElapsed);
      
      // Update the session with the elapsed time immediately
      await updateCurrentSession(sessionId, {
        duration: newTotalElapsed, // Update with total elapsed time
        lastUpdated: now
      });
      
      console.log(`Session paused. Elapsed time this run: ${elapsedMinutes}m, Total elapsed: ${newTotalElapsed}m`);
    }
    
    setIsRunning(false);
    setSessionStartTime(null); // Clear the start time
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft((sessionType === "focus" ? focusDuration : breakDuration) * 60);
  };

  const handleTimerComplete = async () => {
    // Calculate final elapsed time if timer was running
    if (sessionStartTime && sessionId) {
      const now = new Date();
      const elapsedSeconds = Math.floor((now - sessionStartTime) / 1000);
      const elapsedMinutes = Math.floor(elapsedSeconds / 60);
      const finalTotalElapsed = totalElapsedTime + elapsedMinutes;
      
      // Update session with final elapsed time before finishing
      await updateCurrentSession(sessionId, {
        duration: finalTotalElapsed,
        lastUpdated: now
      });
      
      console.log(`Session completed. Final elapsed time: ${finalTotalElapsed}m`);
    }
    
    setIsRunning(false);
    
    if (sessionId) {
      await finishSession(sessionId);
      setSessionId(null);
      setTotalElapsedTime(0);
      setSessionStartTime(null);
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-red-400 to-orange-400 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full blur-lg animate-float-delay"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-br from-yellow-400 to-red-400 rounded-full blur-md animate-float-slow"></div>
        </div>

        <div className="glass-card p-12 text-center animate-fade-in-up max-w-md mx-4">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold animate-pulse">
              ⚠
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
              Task Not Found
            </h1>
            <p className="text-gray-600 mb-6">The task you're looking for doesn't exist or has been removed.</p>
          </div>
          
          <button
            onClick={() => navigate("/dashboard")}
            className="modern-button bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group"
          >
            <span className="flex items-center gap-2">
              ← Back to Dashboard
              <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-32 left-1/4 w-40 h-40 bg-gradient-to-br from-red-400 to-orange-400 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 right-1/4 w-32 h-32 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full blur-2xl animate-float-delay"></div>
        <div className="absolute top-1/2 left-16 w-24 h-24 bg-gradient-to-br from-yellow-400 to-red-400 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-gradient-to-br from-red-300 to-pink-400 rounded-full blur-lg animate-float"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>

      <div className="relative z-10 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 lg:p-12 animate-fade-in-up">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold animate-pulse shadow-lg">
                  🍅
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  Pomodoro Timer
                </h1>
              </div>
              
              <div className="glass-panel p-4 inline-block mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{task.title}</h2>
                {task.description && (
                  <p className="text-gray-600">{task.description}</p>
                )}
              </div>
            </div>

            {/* Mode Selector */}
            <div className="text-center mb-8">
              <div className="inline-flex bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl p-2 shadow-lg">
                <button
                  onClick={() => switchMode("focus")}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    sessionType === "focus" 
                      ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg transform scale-105" 
                      : "text-gray-700 hover:bg-white/50"
                  }`}
                >
                  🎯 Focus
                </button>
                <button
                  onClick={() => switchMode("break")}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    sessionType === "break" 
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg transform scale-105" 
                      : "text-gray-700 hover:bg-white/50"
                  }`}
                >
                  ☕ Break
                </button>
              </div>
            </div>

            {/* Timer Display */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className={`w-80 h-80 mx-auto rounded-full flex items-center justify-center relative ${
                  sessionType === "focus" 
                    ? "bg-gradient-to-br from-red-100 via-orange-100 to-yellow-100" 
                    : "bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100"
                } border-8 ${
                  sessionType === "focus" 
                    ? "border-gradient-to-r from-red-300 to-orange-300" 
                    : "border-gradient-to-r from-green-300 to-emerald-300"
                } shadow-2xl ${isRunning ? 'animate-pulse-slow' : ''}`}>
                  
                  {/* Progress Ring */}
                  <div className="absolute inset-4 rounded-full border-4 border-gray-200">
                    <div 
                      className={`absolute inset-0 rounded-full border-4 border-transparent ${
                        sessionType === "focus" 
                          ? "bg-gradient-to-r from-red-400 to-orange-400" 
                          : "bg-gradient-to-r from-green-400 to-emerald-400"
                      }`}
                      style={{
                        clipPath: `polygon(50% 50%, 50% 0%, ${
                          50 + 50 * Math.cos((2 * Math.PI * (1 - timeLeft / ((sessionType === "focus" ? focusDuration : breakDuration) * 60))) - Math.PI/2)
                        }% ${
                          50 + 50 * Math.sin((2 * Math.PI * (1 - timeLeft / ((sessionType === "focus" ? focusDuration : breakDuration) * 60))) - Math.PI/2)
                        }%, 50% 50%)`
                      }}
                    ></div>
                  </div>
                  
                  <div className="text-center z-10">
                    <div className={`text-6xl lg:text-7xl font-bold mb-2 ${
                      sessionType === "focus" 
                        ? "bg-gradient-to-r from-red-600 to-orange-600" 
                        : "bg-gradient-to-r from-green-600 to-emerald-600"
                    } bg-clip-text text-transparent`}>
                      {formatTime(timeLeft)}
                    </div>
                    <div className="text-lg font-semibold text-gray-600 capitalize">
                      {sessionType} Session
                    </div>
                    {totalElapsedTime > 0 && (
                      <div className="text-sm text-gray-500 mt-2">
                        Total elapsed: {totalElapsedTime}m
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              {!isRunning ? (
                <button
                  onClick={startTimer}
                  className="modern-button bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                >
                  <span className="flex items-center gap-2">
                    ▶️ Start Timer
                    <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                  </span>
                </button>
              ) : (
                <button
                  onClick={pauseTimer}
                  className="modern-button bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                >
                  <span className="flex items-center gap-2">
                    ⏸️ Pause
                    <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                  </span>
                </button>
              )}
              
              <button
                onClick={resetTimer}
                className="modern-button bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
              >
                <span className="flex items-center gap-2">
                  🔄 Reset
                  <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                </span>
              </button>
            </div>

            {/* Settings Panel */}
            <div className="glass-panel p-6">
              <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ⚙️ Timer Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🎯 Focus Duration (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={focusDuration}
                    onChange={(e) => handleDurationChange("focus", parseInt(e.target.value))}
                    className="modern-input w-full"
                    disabled={isRunning}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ☕ Break Duration (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={breakDuration}
                    onChange={(e) => handleDurationChange("break", parseInt(e.target.value))}
                    className="modern-input w-full"
                    disabled={isRunning}
                  />
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="text-center mt-8">
              <button
                onClick={() => navigate("/dashboard")}
                className="modern-button bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              >
                <span className="flex items-center gap-2">
                  ← Back to Dashboard
                  <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PomodoroTimer;