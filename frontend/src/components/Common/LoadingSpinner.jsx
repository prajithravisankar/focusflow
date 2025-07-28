function LoadingSpinner({ size = "md", message = "Loading..." }) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Animated Spinner */}
      <div className="relative">
        <div 
          className={`${sizeClasses[size]} border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin`}
        ></div>
        <div 
          className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-r-pink-600 rounded-full animate-spin`}
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        ></div>
      </div>
      
      {/* Loading Message */}
      <div className="mt-4 text-center">
        <p className="text-gray-600 font-medium mb-2">{message}</p>
        <div className="flex items-center justify-center gap-1">
          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
