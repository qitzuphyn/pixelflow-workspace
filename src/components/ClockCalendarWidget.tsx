import { useState, useEffect } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, startOfWeek, endOfWeek } from "date-fns";

const ClockCalendarWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const today = new Date();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className="widget p-4 w-64">
      {/* Time Display */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold font-karla tracking-wider text-foreground">
            {format(currentTime, "HH:mm:ss")}
          </div>
          <div className="text-sm text-muted-foreground">
            {format(currentTime, "EEEE, MMMM d")}
          </div>
        </div>
        <button 
          onClick={() => setShowCalendar(!showCalendar)}
          className={`p-2 rounded-lg transition-colors ${
            showCalendar 
              ? "bg-primary text-primary-foreground" 
              : "bg-secondary text-secondary-foreground hover:bg-muted"
          }`}
        >
          <CalendarIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Mini Calendar */}
      {showCalendar && (
        <div className="mt-4">
          <div className="grid grid-cols-7 gap-1 mb-1.5">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-xs text-muted-foreground font-medium"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-[2px]">
            {days.map((day, index) => {
              const isToday = isSameDay(day, today);
              const isCurrentMonth = day.getMonth() === today.getMonth();
              
              return (
                <button
                  key={index}
                  className={`
                    w-7 h-7 text-xs rounded-full flex items-center justify-center transition-colors
                    ${isToday 
                      ? "bg-primary text-primary-foreground" 
                      : isCurrentMonth 
                        ? "text-foreground hover:bg-secondary" 
                        : "text-muted-foreground/50"
                    }
                  `}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClockCalendarWidget;
