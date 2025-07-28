import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SessionContext from "../context/SessionContext.jsx";
import TaskContext from "../context/TaskContext.jsx";

function Analytics() {
  const navigate = useNavigate();
  const { sessions = [], currentSession } = useContext(SessionContext);
  const { tasks = [] } = useContext(TaskContext);

  // Calculate all stats using useMemo to prevent infinite loops
  const stats = useMemo(() => {
    const now = new Date();
    
    // If no real data exists, show demo data for testing
    const hasTasks = tasks.length > 0;
    const hasSessions = sessions.length > 0;
    
    if (!hasTasks && !hasSessions) {
      // Demo data for testing purposes
      return {
        tasksCompletedToday: 3,
        tasksCompletedThisWeek: 7,
        tasksCompletedThisMonth: 15,
        tasksCompletedThisYear: 42,
        timeSpentToday: 125, // 2h 5m
        timeSpentThisWeek: 480, // 8h
        timeSpentThisMonth: 1260, // 21h
        timeSpentThisYear: 5040 // 84h
      };
    }
    
    // Helper function to get start of day/week/month/year
    const getDateRanges = () => {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const thisWeek = new Date(now.getTime() - (now.getDay() * 24 * 60 * 60 * 1000));
      thisWeek.setHours(0, 0, 0, 0);
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const thisYear = new Date(now.getFullYear(), 0, 1);
      
      return { today, thisWeek, thisMonth, thisYear };
    };

    const { today, thisWeek, thisMonth, thisYear } = getDateRanges();

    // Filter tasks by time periods
    const getTasksInPeriod = (startDate) => {
      return tasks.filter(task => {
        if (!task.createdAt) return false;
        const taskDate = new Date(task.createdAt);
        return taskDate >= startDate;
      });
    };

    // Filter sessions by time periods
    const getSessionsInPeriod = (startDate) => {
      return sessions.filter(session => {
        if (!session.startTime) return false;
        const sessionDate = new Date(session.startTime);
        return sessionDate >= startDate;
      });
    };

    // Calculate completed tasks
    const tasksCompletedToday = getTasksInPeriod(today).filter(task => task.completed).length;
    const tasksCompletedThisWeek = getTasksInPeriod(thisWeek).filter(task => task.completed).length;
    const tasksCompletedThisMonth = getTasksInPeriod(thisMonth).filter(task => task.completed).length;
    const tasksCompletedThisYear = getTasksInPeriod(thisYear).filter(task => task.completed).length;

    // Calculate time spent (in minutes)
    const getTimeSpent = (startDate) => {
      let totalTime = getSessionsInPeriod(startDate).reduce((total, session) => {
        return total + (session.duration || 0);
      }, 0);
      
      // Add current session time if it exists and falls within the time period
      if (currentSession && currentSession.startTime && currentSession.duration) {
        const sessionDate = new Date(currentSession.startTime);
        if (sessionDate >= startDate) {
          totalTime += currentSession.duration;
        }
      }
      
      return totalTime;
    };

    const timeSpentToday = getTimeSpent(today);
    const timeSpentThisWeek = getTimeSpent(thisWeek);
    const timeSpentThisMonth = getTimeSpent(thisMonth);
    const timeSpentThisYear = getTimeSpent(thisYear);

    return {
      tasksCompletedToday,
      tasksCompletedThisWeek,
      tasksCompletedThisMonth,
      tasksCompletedThisYear,
      timeSpentToday,
      timeSpentThisWeek,
      timeSpentThisMonth,
      timeSpentThisYear
    };
  }, [sessions.length, tasks.length, currentSession?.duration]); // Include current session duration to update analytics in real-time

  // Format time helper
  const formatTime = (minutes) => {
    if (minutes === 0) return "0m";
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div className="bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">📊 Analytics Dashboard</h1>
          <p className="text-gray-600">Your productivity insights at a glance</p>
          {(tasks.length === 0 && sessions.length === 0) && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 inline-block">
              <p className="text-blue-700 text-sm">
                🎯 Demo data shown - Start completing tasks and sessions to see real analytics!
              </p>
            </div>
          )}
        </div>

        {/* Tasks Completed Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Tasks Completed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-blue-600">{stats.tasksCompletedToday}</div>
              <div className="text-gray-600 text-sm font-medium">Today</div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-green-600">{stats.tasksCompletedThisWeek}</div>
              <div className="text-gray-600 text-sm font-medium">This Week</div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-purple-600">{stats.tasksCompletedThisMonth}</div>
              <div className="text-gray-600 text-sm font-medium">This Month</div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-orange-600">{stats.tasksCompletedThisYear}</div>
              <div className="text-gray-600 text-sm font-medium">This Year</div>
            </div>
          </div>
        </div>

        {/* Time Spent Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">⏰ Time Spent</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-blue-600">{formatTime(stats.timeSpentToday)}</div>
              <div className="text-gray-600 text-sm font-medium">Today</div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-green-600">{formatTime(stats.timeSpentThisWeek)}</div>
              <div className="text-gray-600 text-sm font-medium">This Week</div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-purple-600">{formatTime(stats.timeSpentThisMonth)}</div>
              <div className="text-gray-600 text-sm font-medium">This Month</div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-orange-600">{formatTime(stats.timeSpentThisYear)}</div>
              <div className="text-gray-600 text-sm font-medium">This Year</div>
            </div>
          </div>
        </div>

        {/* Visual Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Tasks Completed Chart */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📈 Tasks Progress</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Today</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${Math.min((stats.tasksCompletedToday / Math.max(stats.tasksCompletedThisWeek, 1)) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-blue-600">{stats.tasksCompletedToday}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">This Week</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${Math.min((stats.tasksCompletedThisWeek / Math.max(stats.tasksCompletedThisMonth, 1)) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-green-600">{stats.tasksCompletedThisWeek}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">This Month</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${Math.min((stats.tasksCompletedThisMonth / Math.max(stats.tasksCompletedThisYear, 1)) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-purple-600">{stats.tasksCompletedThisMonth}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">This Year</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-orange-600">{stats.tasksCompletedThisYear}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Time Spent Chart */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-xl font-bold text-gray-800 mb-4">⏰ Time Investment</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Today</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${Math.min((stats.timeSpentToday / Math.max(stats.timeSpentThisWeek, 1)) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-blue-600">{formatTime(stats.timeSpentToday)}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">This Week</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${Math.min((stats.timeSpentThisWeek / Math.max(stats.timeSpentThisMonth, 1)) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-green-600">{formatTime(stats.timeSpentThisWeek)}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">This Month</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-400 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${Math.min((stats.timeSpentThisMonth / Math.max(stats.timeSpentThisYear, 1)) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-purple-600">{formatTime(stats.timeSpentThisMonth)}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">This Year</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-orange-400 to-orange-500 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-orange-600">{formatTime(stats.timeSpentThisYear)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Productivity Trend Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Productivity Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Daily Efficiency */}
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-2">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeDasharray={`${Math.min((stats.tasksCompletedToday / Math.max(stats.tasksCompletedToday + 2, 1)) * 100, 100)}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">{stats.tasksCompletedToday}</span>
                </div>
              </div>
              <p className="text-xs text-gray-600">Today's Tasks</p>
            </div>

            {/* Weekly Progress */}
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-2">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray={`${Math.min((stats.tasksCompletedThisWeek / Math.max(stats.tasksCompletedThisWeek + 3, 1)) * 100, 100)}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-green-600">{stats.tasksCompletedThisWeek}</span>
                </div>
              </div>
              <p className="text-xs text-gray-600">This Week</p>
            </div>

            {/* Focus Time */}
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-2">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                    strokeDasharray={`${Math.min((stats.timeSpentToday / 120) * 100, 100)}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-purple-600">{Math.floor(stats.timeSpentToday / 60)}h</span>
                </div>
              </div>
              <p className="text-xs text-gray-600">Hours Today</p>
            </div>

            {/* Monthly Goals */}
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-2">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray={`${Math.min((stats.tasksCompletedThisMonth / Math.max(stats.tasksCompletedThisMonth + 5, 1)) * 100, 100)}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-orange-600">{stats.tasksCompletedThisMonth}</span>
                </div>
              </div>
              <p className="text-xs text-gray-600">This Month</p>
            </div>
          </div>
        </div>

        {/* Back to Dashboard Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
