import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-red-400 to-orange-400 rounded-full blur-xl animate-float"></div>
            <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full blur-lg animate-float-delay"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-br from-yellow-400 to-red-400 rounded-full blur-md animate-float-slow"></div>
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
          </div>

          <div className="glass-card p-12 text-center animate-fade-in-up max-w-md mx-4">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-bold animate-bounce shadow-xl">
                ⚠️
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We encountered an unexpected error. Don't worry, our team has been notified and we're working on a fix.
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="modern-button bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group w-full"
              >
                <span className="flex items-center justify-center gap-2">
                  🔄 Reload Page
                  <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                </span>
              </button>
              
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="modern-button bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group w-full"
              >
                <span className="flex items-center justify-center gap-2">
                  🏠 Go to Dashboard
                  <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                </span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;