import { useState } from "react";
import Navbar from "@/components/Navbar";
import SoundWidget from "@/components/SoundWidget";
import NotesWidget from "@/components/NotesWidget";
import TasksWidget from "@/components/TasksWidget";
import ClockCalendarWidget from "@/components/ClockCalendarWidget";
import PomodoroWidget from "@/components/PomodoroWidget";
import pixelBg from "@/assets/pixel-bg.png";

const Index = () => {
  const [visibleWidgets, setVisibleWidgets] = useState({
    notes: true,
    tasks: true,
    timer: true,
    sound: true,
  });

  const handleToggleWidget = (widget: keyof typeof visibleWidgets) => {
    setVisibleWidgets((prev) => ({
      ...prev,
      [widget]: !prev[widget],
    }));
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${pixelBg})` }}
    >
      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col p-4 md:p-6">
        {/* Top Navbar */}
        <Navbar visibleWidgets={visibleWidgets} onToggleWidget={handleToggleWidget} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:flex-row gap-4 mt-4">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {visibleWidgets.sound && <SoundWidget />}
            {visibleWidgets.notes && <NotesWidget />}
            <ClockCalendarWidget />
          </div>

          {/* Center - Empty space for background visibility */}
          <div className="flex-1" />

          {/* Right Column */}
          <div className="flex flex-col gap-4 items-end">
            {visibleWidgets.tasks && <TasksWidget />}
            {visibleWidgets.timer && <PomodoroWidget />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
