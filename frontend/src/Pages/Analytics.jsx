import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SessionContext from "../context/SessionContext.jsx";
import TaskContext from "../context/TaskContext.jsx";

function Analytics() {
  const navigate = useNavigate();
  const { sessions } = useContext(SessionContext);
  const { tasks } = useContext(TaskContext);
  
  const [selectedPeriod, setSelectedPeriod] = useState("week"); // week, month, year
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalFocusTime: 0,
    averageSessionLength: 0,
    completedTasks: 0,
    productivityScore: 0,
    weeklyProgress: []
  });

  useEffect(() => {
    calculateStats();
  }, [sessions, tasks, selectedPeriod]);

  const calculateStats = () => {
    const now = new Date();
    let startDate;
    
    switch (selectedPeriod) {
      case "week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "year":
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    const filteredSessions = sessions.filter(session => 
      new Date(session.startTime) >= startDate
    );

    const totalSessions = filteredSessions.length;
    const totalFocusTime = filteredSessions.reduce((acc, session) => 
      acc + (session.sessionType === "focus" ? session.duration : 0), 0
    );
    const averageSessionLength = totalSessions > 0 ? totalFocusTime / totalSessions : 0;
    const completedTasks = tasks.filter(task => task.completed).length;
    const productivityScore = Math.min(100, Math.round((totalFocusTime / 10) + (completedTasks * 5)));

    // Generate weekly progress data
    const weeklyProgress = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayStart = new Date(date.setHours(0, 0, 0, 0));
      const dayEnd = new Date(date.setHours(23, 59, 59, 999));
      
      const daySessions = filteredSessions.filter(session => {
        const sessionDate = new Date(session.startTime);
        return sessionDate >= dayStart && sessionDate <= dayEnd;
      });
      
      const dayFocusTime = daySessions.reduce((acc, session) => 
        acc + (session.sessionType === "focus" ? session.duration : 0), 0
      );
      
      weeklyProgress.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        focusTime: dayFocusTime,
        sessions: daySessions.length
      });
    }

    setStats({
      totalSessions,
      totalFocusTime,
      averageSessionLength,
      completedTasks,
      productivityScore,
      weeklyProgress
    });
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-32 left-1/4 w-64 h-64 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 right-1/4 w-48 h-48 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl animate-float-delay"></div>
        <div className="absolute top-1/2 left-16 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full blur-xl animate-float-slow"></div>
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold animate-pulse shadow-lg">
                📊
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              Track your productivity and discover insights about your focus patterns
            </p>
          </div>

          {/* Period Selector */}
          <div className="flex justify-center mb-8 animate-fade-in-up">
            <div className="inline-flex bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl p-2 shadow-lg">
              {['week', 'month', 'year'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 capitalize ${
                    selectedPeriod === period
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg transform scale-105"
                      : "text-gray-700 hover:bg-white/50"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Sessions */}
            <div className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  🎯
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {stats.totalSessions}
                  </div>
                  <div className="text-sm text-gray-600">Total Sessions</div>
                </div>
              </div>
              <div className="progress-bar h-2">
                <div 
                  className="progress-fill"
                  style={{ width: `${Math.min(100, (stats.totalSessions / 50) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Focus Time */}
            <div className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  ⏱️
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {formatTime(stats.totalFocusTime)}
                  </div>
                  <div className="text-sm text-gray-600">Focus Time</div>
                </div>
              </div>
              <div className="progress-bar h-2">
                <div 
                  className="progress-fill bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{ width: `${Math.min(100, (stats.totalFocusTime / 600) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Completed Tasks */}
            <div className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  ✅
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {stats.completedTasks}
                  </div>
                  <div className="text-sm text-gray-600">Completed Tasks</div>
                </div>
              </div>
              <div className="progress-bar h-2">
                <div 
                  className="progress-fill bg-gradient-to-r from-purple-500 to-pink-500"
                  style={{ width: `${Math.min(100, (stats.completedTasks / 20) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Productivity Score */}
            <div className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  🚀
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    {stats.productivityScore}%
                  </div>
                  <div className="text-sm text-gray-600">Productivity Score</div>
                </div>
              </div>
              <div className="progress-bar h-2">
                <div 
                  className="progress-fill bg-gradient-to-r from-orange-500 to-red-500"
                  style={{ width: `${stats.productivityScore}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Weekly Progress Chart */}
          <div className="glass-card p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              📈 Weekly Progress
            </h3>
            <div className="grid grid-cols-7 gap-2 h-64">
              {stats.weeklyProgress.map((day, index) => (
                <div key={index} className="flex flex-col items-center justify-end relative">
                  <div 
                    className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg transition-all duration-500 hover:scale-105 cursor-pointer group"
                    style={{ 
                      height: `${Math.max(10, (day.focusTime / Math.max(...stats.weeklyProgress.map(d => d.focusTime))) * 100)}%`
                    }}
                    title={`${day.focusTime} minutes, ${day.sessions} sessions`}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {formatTime(day.focusTime)}
                    </div>
                  </div>
                  <div className="mt-2 text-sm font-semibold text-gray-600">{day.day}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              🎯 Quick Actions
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="modern-button bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              >
                <span className="flex items-center gap-2">
                  📋 View Tasks
                  <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                </span>
              </button>
              
              <button
                onClick={() => navigate("/dashboard")}
                className="modern-button bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              >
                <span className="flex items-center gap-2">
                  🍅 Start Pomodoro
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

export default Analytics;
