import React, { useState, useEffect, useContext } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { getCalendarData } from "../../services/api";
import TaskContext from "../../context/TaskContext.jsx";

const Calendar = ({ onDateSelect, selectedDate }) => {
  const { fetchCalendarData, calendarData, loading, error } = useContext(TaskContext);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    fetchCalendarData(null, null);
  }, []);

  const handlePrevWeek = () => {
    if (calendarData?.prevWeekStart) {
      fetchCalendarData(calendarData.prevWeekStart, null);
    }
  };

  const handleNextWeek = () => {
    if (calendarData?.nextWeekStart) {
      fetchCalendarData(calendarData.nextWeekStart, null);
    }
  };

  const handleToday = () => {
    fetchCalendarData(null, null); // No parameters = current week
  };

  const handleDateClick = (dateInfo) => {
    onDateSelect(dateInfo.date);
  };

  const getScaleStyle = (index) => {
    if (hoveredIndex === null) return {};
    
    const distance = Math.abs(index - hoveredIndex);
    const maxScale = 1.4;
    
    if (distance === 0) {
      return { transform: `scale(${maxScale})` };
    } else if (distance === 1) {
      return { transform: `scale(${maxScale * 0.8})` };
    } else if (distance === 2) {
      return { transform: `scale(${maxScale * 0.6})` };
    } else {
      return { transform: `scale(1)` };
    }
  };

  const formatWeekPeriod = () => {
    if (!calendarData?.data?.length) return '';
    const startDate = new Date(calendarData.data[0].date);
    const endDate = new Date(calendarData.data[6].date);
    
    const startMonth = startDate.toLocaleDateString('en-US', { month: 'long' });
    const endMonth = endDate.toLocaleDateString('en-US', { month: 'long' });
    const year = startDate.getFullYear();
    
    if (startMonth === endMonth) {
      return `${startMonth} ${startDate.getDate()}-${endDate.getDate()}, ${year}`;
    } else {
      return `${startMonth} ${startDate.getDate()} - ${endMonth} ${endDate.getDate()}, ${year}`;
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2">Loading calendar...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="text-center py-8 text-red-600">
          <CalendarIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!calendarData?.data) {
    return (
      <div className="card">
        <div className="text-center py-8 text-gray-500">
          <CalendarIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No calendar data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card mb-8 relative overflow-hidden animate-slide-up">
      {/* Beautiful gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 pointer-events-none"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animation: 'float 4s ease-in-out infinite'
            }}
          />
        ))}
      </div>

      {/* Header with beautiful typography */}
      <div className="relative z-10 text-center mb-6">
        <h2 className="text-2xl font-bold text-gradient mb-2">Calendar</h2>
        <div className="w-16 h-1 bg-gradient-primary mx-auto rounded-full"></div>
      </div>

      {/* Calendar Dock with enhanced styling */}
      <div className="relative z-10 flex items-end justify-center gap-3 p-8 bg-gradient-to-br from-white/20 via-blue-50/30 to-purple-50/20 rounded-2xl border border-white/30 backdrop-blur-xl shadow-2xl">
        {/* Enhanced Previous Week Button */}
        <button
          onClick={handlePrevWeek}
          className="group flex items-center justify-center w-12 h-12 bg-gradient-to-br from-white/90 to-white/70 hover:from-white hover:to-white/90 border-2 border-white/40 hover:border-blue-300/60 rounded-xl text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-2xl backdrop-blur-sm"
          aria-label="Previous week"
        >
          <ChevronLeft className="h-6 w-6 transition-transform duration-300 group-hover:-translate-x-0.5" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* Enhanced Calendar Dates */}
        <div 
          className="flex items-end gap-2 px-6"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {calendarData.data.map((dateInfo, index) => {
            const isSelected = selectedDate === dateInfo.date;
            const hasIndicator = dateInfo.hasTasks;
            const isSelectedToday = isSelected && dateInfo.isToday;
            
            return (
              <div
                key={dateInfo.date}
                onClick={() => handleDateClick(dateInfo)}
                className={`
                  group relative cursor-pointer select-none transition-all duration-500 ease-out transform-gpu
                  flex flex-col items-center justify-center min-w-[70px] h-[80px] p-3 rounded-2xl
                  ${isSelectedToday
                    ? 'bg-gradient-to-br from-red-400 to-pink-500 text-white shadow-2xl scale-110 border-2 border-red-300 animate-glow'
                    : isSelected 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl scale-105 border-2 border-blue-300' 
                      : dateInfo.isToday 
                        ? 'bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-blue-400 text-blue-700 shadow-xl' 
                        : dateInfo.isWeekend 
                          ? 'bg-gradient-to-br from-gray-50/80 to-gray-100/80 hover:from-gray-100 hover:to-gray-200 text-gray-600 border border-gray-200/50' 
                          : 'bg-gradient-to-br from-white/90 to-white/70 hover:from-white hover:to-white/90 text-gray-700 shadow-md border border-white/40'
                  }
                  hover:shadow-2xl hover:-translate-y-2 hover:scale-105 border backdrop-blur-sm
                  ${hasIndicator ? 'ring-2 ring-blue-300/50 ring-offset-2 ring-offset-transparent' : ''}
                `}
                style={{
                  ...getScaleStyle(index),
                  background: isSelected && !isSelectedToday 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : undefined
                }}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                
                {/* Day Name */}
                <div className="text-xs font-semibold opacity-80 uppercase tracking-wider mb-1">
                  {dateInfo.dayName}
                </div>
                
                {/* Day Number with enhanced styling */}
                <div className="text-xl font-bold leading-none mb-1 relative">
                  {dateInfo.dayNumber}
                  {dateInfo.isToday && !isSelected && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                
                {/* Month */}
                <div className="text-xs opacity-70 uppercase tracking-wide font-medium">
                  {dateInfo.month}
                </div>

                {/* Enhanced Task Indicator */}
                {hasIndicator && (
                  <div className={`
                    absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold 
                    flex items-center justify-center text-white shadow-lg animate-pulse-slow
                    ${isSelected 
                      ? 'bg-gradient-to-br from-white to-gray-100 text-blue-600 border-2 border-white shadow-white/50' 
                      : 'bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-white'
                    }
                  `}>
                    {dateInfo.taskCount > 9 ? '9+' : dateInfo.taskCount}
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
                  </div>
                )}

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/10 group-hover:to-purple-400/10 transition-all duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Next Week Button */}
        <button
          onClick={handleNextWeek}
          className="group flex items-center justify-center w-12 h-12 bg-gradient-to-br from-white/90 to-white/70 hover:from-white hover:to-white/90 border-2 border-white/40 hover:border-blue-300/60 rounded-xl text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-2xl backdrop-blur-sm"
          aria-label="Next week"
        >
          <ChevronRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-0.5" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* Enhanced Today Button */}
        <button
          onClick={handleToday}
          className="group ml-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-2xl relative overflow-hidden"
          aria-label="Go to current week"
        >
          <span className="relative z-10">Today</span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>
      </div>

      {/* Enhanced Week Period Display */}
      <div className="relative z-10 text-center mt-6">
        <div className="inline-block px-6 py-3 bg-gradient-to-r from-white/40 to-white/20 rounded-2xl backdrop-blur-xl border border-white/30 shadow-lg">
          <p className="text-lg font-semibold text-gradient">
            {formatWeekPeriod()}
          </p>
        </div>
      </div>

      {/* Enhanced Selected Date Info */}
      {selectedDate && (
        <div className="relative z-10 text-center mt-4 animate-scale-in">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl backdrop-blur-sm border border-blue-300/30">
            <p className="text-sm font-medium text-blue-700">
              Viewing tasks for {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
