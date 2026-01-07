import { useState, useCallback, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SoundWidget from "@/components/SoundWidget";
import NotesWidget from "@/components/NotesWidget";
import TasksWidget from "@/components/TasksWidget";
import ClockCalendarWidget from "@/components/ClockCalendarWidget";
import PomodoroWidget from "@/components/PomodoroWidget";
import BackgroundSwitcher from "@/components/BackgroundSwitcher";
import NameModal from "@/components/NameModal";
import StoryModal from "@/components/StoryModal";
import BreathingExercise from "@/components/BreathingExercise";
import pixelBg1 from "@/assets/pixel-bg-1.gif";
import pixelBg2 from "@/assets/pixel-bg-2.gif";
import pixelBg3 from "@/assets/pixel-bg-3.gif";
import pixelBg4 from "@/assets/pixel-bg-4.gif";
import pixelBg5 from "@/assets/pixel-bg-5.gif";

const backgrounds = [pixelBg1, pixelBg2, pixelBg3, pixelBg4, pixelBg5];

const Index = () => {
  const [visibleWidgets, setVisibleWidgets] = useState({
    notes: false,
    tasks: true,
    timer: true,
    sound: true,
  });
  const [currentBg, setCurrentBg] = useState(0);
  const [userName, setUserName] = useState("");
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [triggerStart, setTriggerStart] = useState(false);
  const [triggerPause, setTriggerPause] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [showNamemodal, setShowNamemodal] = useState(false);

  const handleToggleWidget = (widget: keyof typeof visibleWidgets) => {
    setVisibleWidgets((prev) => ({
      ...prev,
      [widget]: !prev[widget],
    }));
  };

  const handleNameSet = useCallback((name: string) => {
    setUserName(name);
  }, []);

  const handleTaskStart = useCallback((taskId: string) => {
    setActiveTaskId(taskId);
    setTriggerStart(true);
  }, []);

  const handleTaskPause = useCallback((_taskId: string) => {
    setTriggerPause(true);
  }, []);

  const handleStartHandled = useCallback(() => {
    setTriggerStart(false);
  }, []);

  const handlePauseHandled = useCallback(() => {
    setTriggerPause(false);
  }, []);

  const handleTimerStateChange = useCallback((running: boolean) => {
    setIsTimerRunning(running);
  }, []);

  // Keyboard navigation for background switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      if (e.key === "ArrowLeft") {
        setCurrentBg((prev) => (prev === 0 ? backgrounds.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentBg((prev) => (prev + 1) % backgrounds.length);
      } else if (e.key === " ") {
        e.preventDefault();
        setIsTimerRunning((prev) => !prev);
        setTriggerStart((prev) => !isTimerRunning && !prev);
        setTriggerPause((prev) => isTimerRunning && !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTimerRunning]);

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${backgrounds[currentBg]})` }}
    >
      {/* Name Modal */}
      <NameModal 
        onNameSet={handleNameSet} 
        isOpen={showNamemodal}
        onClose={() => setShowNamemodal(false)}
      />

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col p-2">
        {/* Top Navbar */}
        <Navbar 
          visibleWidgets={visibleWidgets} 
          onToggleWidget={handleToggleWidget} 
          userName={userName}
          onStoryClick={() => setShowStory(true)}
          onNameChange={() => setShowNamemodal(true)}
        />

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row gap-2 mt-2">
          {/* Left Column */}
          <div className="flex flex-col gap-2 justify-end h-full min-h-[calc(100vh-64px)]">
            {visibleWidgets.sound && <SoundWidget />}
            <div className="flex flex-col gap-2 mt-auto">
              {visibleWidgets.notes && <NotesWidget />}
              <ClockCalendarWidget />
            </div>
          </div>

          {/* Center - Empty space for background visibility */}
          <div className="flex-1" />

          {/* Right Column */}
          <div className="flex flex-col gap-2 items-end justify-end min-h-[calc(100vh-70px)]">
            {visibleWidgets.tasks && (
              <TasksWidget 
                onTaskStart={handleTaskStart}
                onTaskPause={handleTaskPause}
                activeTaskId={activeTaskId}
                isTimerRunning={isTimerRunning}
              />
            )}
            {visibleWidgets.timer && (
              <PomodoroWidget 
                externalStart={triggerStart} 
                externalPause={triggerPause}
                onExternalStartHandled={handleStartHandled}
                onExternalPauseHandled={handlePauseHandled}
                onTimerStateChange={handleTimerStateChange}
              />
            )}
          </div>
        </div>
      </div>

      {/* Background Switcher - Bottom Center */}
      <BackgroundSwitcher 
        currentBg={currentBg} 
        onChangeBg={setCurrentBg} 
        totalBgs={backgrounds.length} 
        onBreathingClick={() => setShowBreathing(true)}
      />

      {/* Breathing Exercise Overlay */}
      <BreathingExercise 
        isOpen={showBreathing} 
        onClose={() => setShowBreathing(false)} 
      />

      {/* Story Modal */}
      <StoryModal 
        isOpen={showStory} 
        onClose={() => setShowStory(false)} 
      />
    </div>
  );
};

export default Index;
