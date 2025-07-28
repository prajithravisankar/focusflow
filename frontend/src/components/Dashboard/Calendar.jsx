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
    <div className="card mb-8">
      {/* Calendar Dock */}
      <div className="flex items-end justify-center gap-2 p-6 bg-gradient-to-br from-primary-50 to-blue-50 rounded-lg border border-primary-100">
        {/* Previous Week Button */}
        <button
          onClick={handlePrevWeek}
          className="flex items-center justify-center w-10 h-10 bg-white/80 hover:bg-white border border-primary-200 rounded-lg text-primary-600 hover:text-primary-700 transition-all duration-200 hover:scale-110 shadow-sm hover:shadow-md"
          aria-label="Previous week"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Calendar Dates */}
        <div 
          className="flex items-end gap-1 px-4"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {calendarData.data.map((dateInfo, index) => {
            const isSelected = selectedDate === dateInfo.date;
            const hasIndicator = dateInfo.hasTasks;
            
            return (
              <div
                key={dateInfo.date}
                onClick={() => handleDateClick(dateInfo)}
                className={`
                  relative cursor-pointer select-none transition-all duration-300 ease-out transform-gpu
                  flex flex-col items-center justify-center min-w-[60px] h-[70px] p-2 rounded-xl
                  ${isSelected 
                    ? 'bg-primary-600 text-white shadow-lg scale-105' 
                    : dateInfo.isToday 
                      ? 'bg-primary-100 border-2 border-primary-400 text-primary-700 shadow-md' 
                      : dateInfo.isWeekend 
                        ? 'bg-gray-50 hover:bg-gray-100 text-gray-600' 
                        : 'bg-white hover:bg-primary-50 text-gray-700 shadow-sm'
                  }
                  hover:shadow-lg border ${isSelected ? 'border-primary-700' : 'border-gray-200'}
                `}
                style={getScaleStyle(index)}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {/* Day Name */}
                <div className="text-xs font-medium opacity-75 uppercase tracking-wide">
                  {dateInfo.dayName}
                </div>
                
                {/* Day Number */}
                <div className="text-lg font-bold leading-none">
                  {dateInfo.dayNumber}
                </div>
                
                {/* Month */}
                <div className="text-xs opacity-60 uppercase tracking-wide">
                  {dateInfo.month}
                </div>

                {/* Task Indicator */}
                {hasIndicator && (
                  <div className={`
                    absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs font-bold 
                    flex items-center justify-center text-white
                    ${isSelected 
                      ? 'bg-white text-primary-600' 
                      : 'bg-primary-600'
                    }
                  `}>
                    {dateInfo.taskCount > 9 ? '9+' : dateInfo.taskCount}
                  </div>
                )}

                {/* Today indicator */}
                {dateInfo.isToday && !isSelected && (
                  <div className="absolute bottom-1 w-1 h-1 bg-primary-600 rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Next Week Button */}
        <button
          onClick={handleNextWeek}
          className="flex items-center justify-center w-10 h-10 bg-white/80 hover:bg-white border border-primary-200 rounded-lg text-primary-600 hover:text-primary-700 transition-all duration-200 hover:scale-110 shadow-sm hover:shadow-md"
          aria-label="Next week"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Today Button */}
        <button
          onClick={handleToday}
          className="ml-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
          aria-label="Go to current week"
        >
          Today
        </button>
      </div>

      {/* Week Period Display */}
      <div className="text-center mt-4 text-sm text-gray-600 font-medium">
        {formatWeekPeriod()}
      </div>

      {/* Selected Date Info */}
      {selectedDate && (
        <div className="text-center mt-2 text-xs text-primary-600">
          Viewing tasks for {new Date(selectedDate).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      )}
    </div>
  );
};

export default Calendar;
