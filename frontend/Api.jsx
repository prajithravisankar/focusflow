import { useEffect } from 'react';
import api from './services/api';

function App() {
  useEffect(() => {
    api.get('/test')
      .then((response) => console.log(response.data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary">Welcome to FocusFlow</h1>
        <p className="text-secondary mt-4">A modern, minimalistic app for productivity</p>
        <button className="mt-6 px-6 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-secondary">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;