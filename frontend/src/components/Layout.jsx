import Navigation from "./Navigation";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">{children}</main>
      <footer className="relative bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-xl animate-float-delay"></div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="particle particle-footer-1"></div>
          <div className="particle particle-footer-2"></div>
          <div className="particle particle-footer-3"></div>
        </div>
        
        <div className="relative z-10 p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-bold animate-pulse">
              🎯
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              FocusFlow
            </span>
          </div>
          <p className="text-purple-200 text-sm">
            © 2025 FocusFlow - Boost your productivity with style ✨
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;