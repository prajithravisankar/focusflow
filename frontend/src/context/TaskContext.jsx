import { createContext, useState, useEffect, useContext } from "react";
import { createTask, getTasks, updateTask, deleteTask } from "../services/api";
import AuthContext from "./AuthContext.jsx";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks when user is authenticated
  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getTasks();
      setTasks(response.tasks || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await createTask(taskData);
      setTasks([...tasks, response.task]);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editTask = async (taskId, taskData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await updateTask(taskId, taskData);
      setTasks(tasks.map(task => task._id === taskId ? response.task : task));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeTask = async (taskId) => {
    try {
      setLoading(true);
      setError(null);
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskCompletion = async (taskId) => {
    const task = tasks.find(t => t._id === taskId);
    if (task) {
      return await editTask(taskId, { ...task, completed: !task.completed });
    }
    return false;
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      loading,
      error,
      fetchTasks,
      addTask,
      editTask,
      removeTask,
      toggleTaskCompletion
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
