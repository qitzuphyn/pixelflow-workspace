import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import SoundWidget from "@/components/SoundWidget";
import NotesWidget from "@/components/NotesWidget";
import TasksWidget from "@/components/TasksWidget";
import ClockCalendarWidget from "@/components/ClockCalendarWidget";
import PomodoroWidget from "@/components/PomodoroWidget";
import BackgroundSwitcher from "@/components/BackgroundSwitcher";
import NameModal from "@/components/NameModal";
import pixelBg1 from "@/assets/pixel-bg-1.gif";
import pixelBg2 from "@/assets/pixel-bg-2.gif";
import pixelBg3 from "@/assets/pixel-bg-3.gif";
import pixelBg4 from "@/assets/pixel-bg-4.gif";

const backgrounds = [pixelBg1, pixelBg2, pixelBg3, pixelBg4];

const Index = () => {
  const [visibleWidgets, setVisibleWidgets] = useState({
    notes: true,
    tasks: true,
    timer: true,
    sound: true,
  });
  const [currentBg, setCurrentBg] = useState(0);
  const [userName, setUserName] = useState("");
  const [startPomodoro, setStartPomodoro] = useState(false);

  const handleToggleWidget = (widget: keyof typeof visibleWidgets) => {
    setVisibleWidgets((prev) => ({
      ...prev,
      [widget]: !prev[widget],
    }));
  };

  const handleNameSet = useCallback((name: string) => {
    setUserName(name);
  }, []);

  const handleTaskStart = useCallback(() => {
    setStartPomodoro(true);
  }, []);

  const handlePomodoroStartHandled = useCallback(() => {
    setStartPomodoro(false);
  }, []);

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${backgrounds[currentBg]})` }}
    >
      {/* Name Modal */}
      <NameModal onNameSet={handleNameSet} />

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col p-2">
        {/* Top Navbar */}
        <Navbar 
          visibleWidgets={visibleWidgets} 
          onToggleWidget={handleToggleWidget} 
          userName={userName}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:flex-row gap-2 mt-2">
          {/* Left Column */}
          <div className="flex flex-col justify-end h-full min-h-[calc(100vh-70px)]">
            <div className="flex flex-col gap-2 mt-auto">
              {visibleWidgets.sound && <SoundWidget />}
              {visibleWidgets.notes && <NotesWidget />}
              <ClockCalendarWidget />
            </div>
          </div>

          {/* Center - Empty space for background visibility */}
          <div className="flex-1" />

          {/* Right Column */}
          <div className="flex flex-col gap-2 items-end justify-end min-h-[calc(100vh-70px)]">
            {visibleWidgets.tasks && <TasksWidget onTaskStart={handleTaskStart} />}
            {visibleWidgets.timer && (
              <PomodoroWidget 
                externalStart={startPomodoro} 
                onExternalStartHandled={handlePomodoroStartHandled}
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
      />
    </div>
  );
};

export default Index;
