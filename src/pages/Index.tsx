import Navbar from "@/components/Navbar";
import SoundWidget from "@/components/SoundWidget";
import NotesWidget from "@/components/NotesWidget";
import TasksWidget from "@/components/TasksWidget";
import ClockCalendarWidget from "@/components/ClockCalendarWidget";
import PomodoroWidget from "@/components/PomodoroWidget";
import StatusDisplay from "@/components/StatusDisplay";
import pixelBg from "@/assets/pixel-bg.png";

const Index = () => {
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
        <Navbar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:flex-row gap-4 mt-4">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            <SoundWidget />
            <NotesWidget />
            <ClockCalendarWidget />
          </div>

          {/* Center - Status Display */}
          <div className="flex-1 flex items-center justify-center">
            <StatusDisplay isTimerRunning={false} />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4 items-end">
            <TasksWidget />
            <div className="mt-auto">
              <PomodoroWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
