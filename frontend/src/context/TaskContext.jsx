import { createContext, useState, useEffect, useContext } from "react";
import { createTask, getTasks, updateTask, deleteTask, getCalendarData, getTasksByDate } from "../services/api";
import AuthContext from "./AuthContext.jsx";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateFilteredTasks, setDateFilteredTasks] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
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

  // Calendar-related functions
  const fetchCalendarData = async (startDate, endDate) => {
    try {
      setLoading(true);
      setError(null);
      
      // Calculate week range if no dates provided or only startDate provided
      let startDateStr = startDate;
      let endDateStr = endDate;
      
      if (!startDate || !endDate) {
        const baseDate = startDate ? new Date(startDate + 'T00:00:00') : new Date();
        const weekStart = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        const weekEnd = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6);
        
        // Format as YYYY-MM-DD
        const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };
        
        startDateStr = formatDate(weekStart);
        endDateStr = formatDate(weekEnd);
      }
      
      const response = await getCalendarData(startDateStr, endDateStr);
      setCalendarData(response || {});
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch calendar data");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchTasksByDate = async (date) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getTasksByDate(date);
      setSelectedDate(date);
      setDateFilteredTasks(response.tasks || []);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks for date");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearDateFilter = () => {
    setSelectedDate(null);
    setDateFilteredTasks([]);
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      selectedDate,
      dateFilteredTasks,
      calendarData,
      loading,
      error,
      fetchTasks,
      addTask,
      editTask,
      removeTask,
      toggleTaskCompletion,
      fetchCalendarData,
      fetchTasksByDate,
      clearDateFilter
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
