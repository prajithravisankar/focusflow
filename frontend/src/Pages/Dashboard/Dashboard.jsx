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
    scheduledDate: "", 
    dueDate: "" 
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const taskData = {
      title: formData.title,
      description: formData.description,
      scheduledDate: formData.scheduledDate || null,
      dueDate: formData.dueDate || null
    };

    const success = editingTask 
      ? await editTask(editingTask._id, taskData)
      : await addTask(taskData);

    if (success) {
      setFormData({ title: "", description: "", scheduledDate: "", dueDate: "" });
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
      scheduledDate: task.scheduledDate ? task.scheduledDate.split('T')[0] : "",
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : ""
    });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setFormData({ title: "", description: "", scheduledDate: "", dueDate: "" });
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
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.firstName || user?.email}!</p>
      </div>

      {/* Calendar Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Calendar</h2>
        <Calendar onDateSelect={handleDateSelect} />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold">{tasksSectionTitle}</h2>
            {selectedDate && (
              <button
                onClick={handleClearDateFilter}
                className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
              >
                Show All Tasks
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
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>

        {showAddForm && (
          <div className="bg-gray-50 p-4 rounded mb-4">
            <h3 className="font-bold mb-2">{editingTask ? "Edit Task" : "Add New Task"}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Task title"
                className="w-full p-2 mb-2 border rounded"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Task description (optional)"
                className="w-full p-2 mb-2 border rounded"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Scheduled Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded"
                    value={formData.scheduledDate}
                    onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  disabled={loading}
                >
                  {loading ? "Saving..." : (editingTask ? "Update" : "Add")}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading && <p>Loading tasks...</p>}

        <div className="space-y-2">
          {tasksToDisplay.length === 0 ? (
            <p className="text-gray-500">
              {selectedDate 
                ? "No tasks for this date. Click 'Add Task' to create one!" 
                : "No tasks yet. Create your first task to get started!"
              }
            </p>
          ) : (
            tasksToDisplay.map((task) => (
              <div key={task._id} className="bg-white p-4 rounded shadow border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleCompletion(task._id)}
                      className="w-4 h-4"
                    />
                    <div>
                      <h3 className={`font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className={`text-sm ${task.completed ? "line-through text-gray-400" : "text-gray-600"}`}>
                          {task.description}
                        </p>
                      )}
                      <div className="flex gap-4 mt-1 text-xs text-gray-500">
                        {task.scheduledDate && (
                          <span>📅 Scheduled: {new Date(task.scheduledDate).toLocaleDateString()}</span>
                        )}
                        {task.dueDate && (
                          <span>⏰ Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!task.completed && (
                      <button
                        onClick={() => startPomodoro(task._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                      >
                        Start Pomodoro
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(task)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;