import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";

type TimerMode = "focus" | "short" | "long";

const TIMER_DURATIONS: Record<TimerMode, number> = {
  focus: 30 * 60, // 30 minutes
  short: 5 * 60,  // 5 minutes
  long: 15 * 60,  // 15 minutes
};

const PomodoroWidget = () => {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATIONS.focus);
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(TIMER_DURATIONS[newMode]);
    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = useCallback(() => {
    setTimeLeft(TIMER_DURATIONS[mode]);
    setIsRunning(false);
  }, [mode]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const modes = [
    { id: "focus" as TimerMode, label: "Focus" },
    { id: "short" as TimerMode, label: "Short break" },
    { id: "long" as TimerMode, label: "Long break" },
  ];

  return (
    <div className="widget p-5 w-72">
      {/* Mode Selector */}
      <div className="flex gap-2 mb-6">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => handleModeChange(m.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              mode === m.id
                ? "bg-foreground text-background"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Timer Display */}
      <div className="text-center mb-6">
        <div 
          className={`text-7xl font-pixel tracking-wider transition-colors ${
            isRunning ? "text-timer-active animate-pulse-soft" : "text-timer-display"
          }`}
        >
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={toggleTimer}
          className="px-6 py-2 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors flex items-center gap-2"
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Start
            </>
          )}
        </button>
        <button
          onClick={resetTimer}
          className="p-2.5 bg-secondary text-secondary-foreground rounded-full hover:bg-muted transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button className="p-2.5 bg-secondary text-secondary-foreground rounded-full hover:bg-muted transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PomodoroWidget;
