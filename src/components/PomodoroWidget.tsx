import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type TimerMode = "focus" | "short" | "long";

interface PomodoroSettings {
  focus: number;
  short: number;
  long: number;
}

interface PomodoroWidgetProps {
  onTimerStateChange?: (isRunning: boolean) => void;
  externalStart?: boolean;
  externalPause?: boolean;
  onExternalStartHandled?: () => void;
  onExternalPauseHandled?: () => void;
}

const DEFAULT_DURATIONS: PomodoroSettings = {
  focus: 30,
  short: 5,
  long: 10,
};

const PomodoroWidget = ({ onTimerStateChange, externalStart, externalPause, onExternalStartHandled, onExternalPauseHandled }: PomodoroWidgetProps) => {
  const [durations, setDurations] = useState<PomodoroSettings>(() => {
    const saved = localStorage.getItem("pomodoro-settings");
    return saved ? JSON.parse(saved) : DEFAULT_DURATIONS;
  });
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(durations.focus * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [focusCount, setFocusCount] = useState(0);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [completionMessage, setCompletionMessage] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tempSettings, setTempSettings] = useState(durations);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(durations[newMode] * 60);
    setIsRunning(false);
    onTimerStateChange?.(false);
  };

  const toggleTimer = () => {
    const newRunningState = !isRunning;
    setIsRunning(newRunningState);
    onTimerStateChange?.(newRunningState);
  };

  const resetTimer = useCallback(() => {
    setTimeLeft(durations[mode] * 60);
    setIsRunning(false);
    onTimerStateChange?.(false);
  }, [mode, durations, onTimerStateChange]);

  const startNextSession = useCallback(() => {
    if (mode === "focus") {
      const newFocusCount = focusCount + 1;
      setFocusCount(newFocusCount);
      
      // After 2 focus sessions, take a long break
      if (newFocusCount % 2 === 0) {
        setMode("long");
        setTimeLeft(durations.long * 60);
        setCompletionMessage("Focus session complete! Time for a long break.");
      } else {
        setMode("short");
        setTimeLeft(durations.short * 60);
        setCompletionMessage("Focus session complete! Time for a short break.");
      }
    } else {
      // After any break, go back to focus
      setMode("focus");
      setTimeLeft(durations.focus * 60);
      setCompletionMessage(mode === "long" ? "Long break over! Ready to focus." : "Short break over! Ready to focus.");
    }
    setShowCompletionDialog(true);
    setIsRunning(false);
  }, [mode, focusCount, durations]);

  // Handle external start from task initiation
  useEffect(() => {
    if (externalStart) {
      setMode("focus");
      setTimeLeft(durations.focus * 60);
      setIsRunning(true);
      onTimerStateChange?.(true);
      onExternalStartHandled?.();
    }
  }, [externalStart, durations.focus, onExternalStartHandled, onTimerStateChange]);

  // Handle external pause from task
  useEffect(() => {
    if (externalPause) {
      setIsRunning(false);
      onTimerStateChange?.(false);
      onExternalPauseHandled?.();
    }
  }, [externalPause, onExternalPauseHandled, onTimerStateChange]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      startNextSession();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, startNextSession]);

  const handleSaveSettings = () => {
    setDurations(tempSettings);
    localStorage.setItem("pomodoro-settings", JSON.stringify(tempSettings));
    setTimeLeft(tempSettings[mode] * 60);
    setSettingsOpen(false);
  };

  const handleCompletionClose = () => {
    setShowCompletionDialog(false);
    // Auto-start the next session
    setIsRunning(true);
  };

  const modes = [
    { id: "focus" as TimerMode, label: "Focus" },
    { id: "short" as TimerMode, label: "Short" },
    { id: "long" as TimerMode, label: "Long" },
  ];

  return (
    <>
      <div className="widget p-5 w-72">
        {/* Mode Selector */}
        <div className="flex justify-center gap-2 mb-6">
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
            className={`text-7xl font-karla font-bold tracking-wider transition-colors ${
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
          <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
            <DialogTrigger asChild>
              <button 
                className="p-2.5 bg-secondary text-secondary-foreground rounded-full hover:bg-muted transition-colors"
                onClick={() => setTempSettings(durations)}
              >
                <Settings className="w-4 h-4" />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[320px]">
              <DialogHeader>
                <DialogTitle>Timer Settings</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="focus-time">Focus Time (minutes)</Label>
                  <Input
                    id="focus-time"
                    type="number"
                    min={1}
                    max={120}
                    value={tempSettings.focus}
                    onChange={(e) => setTempSettings({ ...tempSettings, focus: parseInt(e.target.value) || 1 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="short-break">Short Break (minutes)</Label>
                  <Input
                    id="short-break"
                    type="number"
                    min={1}
                    max={60}
                    value={tempSettings.short}
                    onChange={(e) => setTempSettings({ ...tempSettings, short: parseInt(e.target.value) || 1 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="long-break">Long Break (minutes)</Label>
                  <Input
                    id="long-break"
                    type="number"
                    min={1}
                    max={60}
                    value={tempSettings.long}
                    onChange={(e) => setTempSettings({ ...tempSettings, long: parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>
              <Button onClick={handleSaveSettings} className="w-full">
                Save Settings
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Completion Dialog */}
      <AlertDialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Session Complete!</AlertDialogTitle>
            <AlertDialogDescription>
              {completionMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleCompletionClose}>
              Start Next Session
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PomodoroWidget;
