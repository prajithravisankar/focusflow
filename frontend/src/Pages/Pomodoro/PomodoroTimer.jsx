import { useParams } from "react-router-dom";

function PomodoroTimer() {
  const { taskId } = useParams();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Pomodoro Timer</h1>
        <p className="text-gray-600">Task ID: {taskId}</p>
      </div>
    </div>
  );
}

export default PomodoroTimer;