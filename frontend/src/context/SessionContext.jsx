import { createContext, useState, useContext } from "react";
import { startSession, updateSession, completeSession, getSessionHistory } from "../services/api";
import AuthContext from "./AuthContext.jsx";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [currentSession, setCurrentSession] = useState(null);
  const [sessionHistory, setSessionHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createSession = async (sessionData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await startSession(sessionData);
      setCurrentSession({ ...sessionData, _id: response.sessionId, startTime: new Date() });
      return response.sessionId;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to start session");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateCurrentSession = async (sessionId, sessionData) => {
    try {
      setLoading(true);
      setError(null);
      await updateSession(sessionId, sessionData);
      setCurrentSession(prev => ({ ...prev, ...sessionData }));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update session");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const finishSession = async (sessionId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await completeSession(sessionId);
      setCurrentSession(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to complete session");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const fetchSessionHistory = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getSessionHistory(params);
      setSessionHistory(response.sessions || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch session history");
    } finally {
      setLoading(false);
    }
  };

  const clearCurrentSession = () => {
    setCurrentSession(null);
  };

  return (
    <SessionContext.Provider value={{
      currentSession,
      sessionHistory,
      loading,
      error,
      createSession,
      updateCurrentSession,
      finishSession,
      fetchSessionHistory,
      clearCurrentSession
    }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
