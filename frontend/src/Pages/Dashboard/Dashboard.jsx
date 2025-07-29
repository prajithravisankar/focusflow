import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext.jsx";
import TaskContext from "../../context/TaskContext.jsx";
import Calendar from "../../components/Dashboard/Calendar.jsx";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const { 
    tasks, 
    selectedDate, 
    dateFilteredTasks, 
    loading, 
    error, 
    addTask, 
    editTask, 
    removeTask, 
    toggleTaskCompletion,
    fetchTasksByDate,
    clearDateFilter
  } = useContext(TaskContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({ 
    title: "", 
    description: "", 
    priority: "medium",
    scheduledDate: "", 
    dueDate: "" 
  });
  const navigate = useNavigate();

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-red-200/50 shadow-red-200/50';
      case 'medium':
        return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 border-yellow-200/50 shadow-yellow-200/50';
      case 'low':
        return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200/50 shadow-green-200/50';
      default:
        return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border-gray-200/50 shadow-gray-200/50';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return '�';
      case 'medium':
        return '⚡';
      case 'low':
        return '🌿';
      default:
        return '📌';
    }
  };

  const getTaskTypeInfo = (task, selectedDate) => {
    if (!selectedDate || !task.taskType) return null;
    
    switch (task.taskType) {
      case 'scheduled':
        return { icon: '📅', text: 'Scheduled today', color: 'text-blue-600' };
      case 'due':
        return { icon: '⏰', text: 'Due today', color: 'text-red-600' };
      case 'both':
        return { icon: '📅⏰', text: 'Scheduled & Due today', color: 'text-purple-600' };
      case 'active':
        return { icon: '🔄', text: 'Active task', color: 'text-green-600' };
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const taskData = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      scheduledDate: formData.scheduledDate ? new Date(formData.scheduledDate).toISOString() : null,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
    };

    const success = editingTask 
      ? await editTask(editingTask._id, taskData)
      : await addTask(taskData);

    if (success) {
      setFormData({ title: "", description: "", priority: "medium", scheduledDate: "", dueDate: "" });
      setShowAddForm(false);
      setEditingTask(null);
      
      // Refresh the selected date view if we're filtering by date
      if (selectedDate) {
        fetchTasksByDate(selectedDate);
      }
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({ 
      title: task.title, 
      description: task.description || "",
      priority: task.priority || "medium",
      scheduledDate: task.scheduledDate ? task.scheduledDate.split('T')[0] : "",
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : ""
    });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setFormData({ title: "", description: "", priority: "medium", scheduledDate: "", dueDate: "" });
    setShowAddForm(false);
    setEditingTask(null);
  };

  const handleDateSelect = (date) => {
    fetchTasksByDate(date);
  };

  const handleClearDateFilter = () => {
    clearDateFilter();
  };

  const handleDeleteTask = async (taskId) => {
    const success = await removeTask(taskId);
    if (success && selectedDate) {
      // Refresh the date view if we're filtering by date
      fetchTasksByDate(selectedDate);
    }
  };

  const handleToggleCompletion = async (taskId) => {
    const success = await toggleTaskCompletion(taskId);
    if (success && selectedDate) {
      // Refresh the date view if we're filtering by date
      fetchTasksByDate(selectedDate);
    }
  };

  const startPomodoro = (taskId) => {
    navigate(`/pomodoro/${taskId}`);
  };

  // Determine which tasks to display
  const tasksToDisplay = selectedDate ? dateFilteredTasks : tasks;
  const tasksSectionTitle = selectedDate 
    ? `Tasks for ${new Date(selectedDate).toLocaleDateString()}`
    : "All Tasks";

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="relative z-10 p-8 max-w-6xl mx-auto">
        {/* Hero Header Section */}
        <div className="mb-12 text-center animate-slide-up">
          <div className="inline-block p-8 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl mb-6">
            <h1 className="text-5xl font-bold text-gradient mb-4 tracking-tight">
              FocusFlow Dashboard
            </h1>
            <p className="text-xl text-white/90 font-medium">
              Welcome back, <span className="text-gradient font-bold">{user?.firstName || user?.email}</span>! ✨
            </p>
            <div className="mt-4 w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          </div>
        </div>

        {/* Calendar Section with enhanced styling */}
        <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Calendar onDateSelect={handleDateSelect} selectedDate={selectedDate} />
        </div>

        {/* Enhanced Error Display */}
        {error && (
          <div className="mb-8 animate-scale-in">
            <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-xl border-2 border-red-300/50 text-red-100 px-6 py-4 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <span className="font-semibold">{error}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tasks Section */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          {/* Enhanced Section Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-6">
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl rounded-2xl border border-white/30 shadow-lg">
                <h2 className="text-2xl font-bold text-white">{tasksSectionTitle}</h2>
              </div>
              {selectedDate && (
                <button
                  onClick={handleClearDateFilter}
                  className="group px-4 py-2 bg-gradient-to-r from-gray-500/20 to-gray-600/20 hover:from-gray-500/30 hover:to-gray-600/30 text-white/90 hover:text-white rounded-xl border border-gray-400/30 font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl backdrop-blur-sm"
                >
                  <span className="flex items-center gap-2">
                    <span>🔄</span>
                    Show All Tasks
                  </span>
                </button>
              )}
            </div>
            <button
              onClick={() => {
                setShowAddForm(true);
                // Pre-fill scheduled date if we're viewing a specific date
                if (selectedDate) {
                  setFormData(prev => ({ 
                    ...prev, 
                    scheduledDate: selectedDate 
                  }));
                }
              }}
              className="group btn-primary relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-xl">✨</span>
                Add Task
              </span>
            </button>
          </div>

        {/* Enhanced Add/Edit Task Form */}
        {showAddForm && (
          <div className="mb-8 animate-scale-in">
            <div className="p-8 bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{editingTask ? "✏️" : "✨"}</span>
                <h3 className="text-2xl font-bold text-white">
                  {editingTask ? "Edit Task" : "Create New Task"}
                </h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Task title *"
                    className="input-modern"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <textarea
                    placeholder="Task description (optional)"
                    className="input-modern resize-none"
                    rows="4"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-white/90 font-semibold mb-3">
                    Priority Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['low', 'medium', 'high'].map((priority) => (
                      <button
                        key={priority}
                        type="button"
                        onClick={() => setFormData({ ...formData, priority })}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 font-semibold capitalize ${
                          formData.priority === priority
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-300 scale-105 shadow-lg'
                            : 'bg-white/20 hover:bg-white/30 text-white/80 hover:text-white border-white/30 hover:border-white/50'
                        }`}
                      >
                        <span className="text-xl mr-2">{getPriorityIcon(priority)}</span>
                        {priority}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/90 font-semibold mb-3">
                      📅 Scheduled Date
                    </label>
                    <input
                      type="date"
                      className="input-modern"
                      value={formData.scheduledDate}
                      onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-white/90 font-semibold mb-3">
                      ⏰ Due Date
                    </label>
                    <input
                      type="date"
                      className="input-modern"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                    disabled={loading}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <div className="spinner w-5 h-5"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <span className="text-xl">{editingTask ? "💾" : "✨"}</span>
                          {editingTask ? "Update Task" : "Create Task"}
                        </>
                      )}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-8 py-3 bg-gradient-to-r from-gray-500/20 to-gray-600/20 hover:from-gray-500/30 hover:to-gray-600/30 text-white/90 hover:text-white rounded-xl border border-gray-400/30 font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Enhanced Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl rounded-2xl border border-white/30 shadow-lg">
              <div className="spinner"></div>
              <span className="text-white font-semibold text-lg">Loading tasks...</span>
            </div>
          </div>
        )}

        {/* Enhanced Tasks Display */}
        <div className="space-y-4">
          {tasksToDisplay.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-block p-8 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl">
                <div className="text-6xl mb-4">
                  {selectedDate ? "📅" : "✨"}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {selectedDate ? "No tasks for this date" : "No tasks yet"}
                </h3>
                <p className="text-white/80 text-lg">
                  {selectedDate 
                    ? "Click 'Add Task' to create one for this date!" 
                    : "Create your first task to get started on your productivity journey!"
                  }
                </p>
              </div>
            </div>
          ) : (
            tasksToDisplay.map((task, index) => (
              <div 
                key={task._id} 
                className="group bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl p-6 rounded-2xl border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="relative mt-1">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleCompletion(task._id)}
                        className="checkbox-modern"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className={`text-xl font-bold transition-all duration-300 ${
                          task.completed 
                            ? "line-through text-white/50" 
                            : "text-white group-hover:text-blue-200"
                        }`}>
                          {task.title}
                        </h3>
                        
                        <span 
                          className={`px-3 py-1 text-xs rounded-full border-2 font-bold shadow-lg ${getPriorityStyle(task.priority || 'medium')}`}
                          title={`${task.priority || 'medium'} priority`}
                        >
                          {getPriorityIcon(task.priority || 'medium')} {(task.priority || 'medium').toUpperCase()}
                        </span>
                        
                        {selectedDate && getTaskTypeInfo(task, selectedDate) && (
                          <span 
                            className={`px-3 py-1 text-xs rounded-full bg-gradient-to-r from-blue-100/20 to-purple-100/20 border border-blue-300/30 font-semibold ${getTaskTypeInfo(task, selectedDate).color}`}
                            title={getTaskTypeInfo(task, selectedDate).text}
                          >
                            {getTaskTypeInfo(task, selectedDate).icon} {getTaskTypeInfo(task, selectedDate).text}
                          </span>
                        )}
                      </div>
                      
                      {task.description && (
                        <p className={`text-base mb-4 leading-relaxed ${
                          task.completed 
                            ? "line-through text-white/40" 
                            : "text-white/90"
                        }`}>
                          {task.description}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap gap-4 text-sm text-white/70">
                        {task.scheduledDate && (
                          <span className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-lg border border-blue-400/30">
                            📅 Scheduled: {new Date(task.scheduledDate).toLocaleDateString()}
                          </span>
                        )}
                        {task.dueDate && (
                          <span className="flex items-center gap-2 px-3 py-1 bg-red-500/20 rounded-lg border border-red-400/30">
                            ⏰ Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {!task.completed && (
                      <button
                        onClick={() => startPomodoro(task._id)}
                        className="group px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          🍅 Start Focus
                        </span>
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(task)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
