import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext.jsx";
import TaskContext from "../../context/TaskContext.jsx";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const { tasks, loading, error, addTask, editTask, removeTask, toggleTaskCompletion } = useContext(TaskContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const success = editingTask 
      ? await editTask(editingTask._id, formData)
      : await addTask(formData);

    if (success) {
      setFormData({ title: "", description: "" });
      setShowAddForm(false);
      setEditingTask(null);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({ title: task.title, description: task.description || "" });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setFormData({ title: "", description: "" });
    setShowAddForm(false);
    setEditingTask(null);
  };

  const startPomodoro = (taskId) => {
    navigate(`/pomodoro/${taskId}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.firstName || user?.email}!</p>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tasks</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200"
          >
            Add Task
          </button>
        </div>

        {showAddForm && (
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mb-4 border dark:border-gray-700">
            <h3 className="font-bold mb-2 text-gray-900 dark:text-white">{editingTask ? "Edit Task" : "Add New Task"}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Task title"
                className="w-full p-2 mb-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Task description (optional)"
                className="w-full p-2 mb-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-500 dark:bg-green-600 text-white px-4 py-2 rounded hover:bg-green-600 dark:hover:bg-green-700 transition-colors duration-200"
                  disabled={loading}
                >
                  {loading ? "Saving..." : (editingTask ? "Update" : "Add")}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 dark:bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading && <p className="text-gray-600 dark:text-gray-400">Loading tasks...</p>}

        <div className="space-y-2">
          {tasks.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No tasks yet. Create your first task to get started!</p>
          ) : (
            tasks.map((task) => (
              <div key={task._id} className="bg-white dark:bg-gray-800 p-4 rounded shadow border dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task._id)}
                      className="w-4 h-4 accent-blue-500"
                    />
                    <div>
                      <h3 className={`font-medium ${task.completed ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-white"}`}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className={`text-sm ${task.completed ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-600 dark:text-gray-300"}`}>
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!task.completed && (
                      <button
                        onClick={() => startPomodoro(task._id)}
                        className="bg-green-500 dark:bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-600 dark:hover:bg-green-700 transition-colors duration-200"
                      >
                        Start Pomodoro
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(task)}
                      className="bg-blue-500 dark:bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeTask(task._id)}
                      className="bg-red-500 dark:bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-600 dark:hover:bg-red-700 transition-colors duration-200"
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