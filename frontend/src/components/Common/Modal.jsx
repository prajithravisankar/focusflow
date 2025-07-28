import { useEffect } from "react";

function Modal({ isOpen, onClose, title, children, size = "md" }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4"
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className={`relative w-full ${sizeClasses[size]} animate-fade-in-up`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Content */}
          <div className="glass-card p-0 overflow-hidden">
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between p-6 border-b border-white/20">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white font-bold transition-all duration-300 hover:scale-110 transform shadow-lg"
                >
                  ✕
                </button>
              </div>
            )}
            
            {/* Body */}
            <div className="p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
