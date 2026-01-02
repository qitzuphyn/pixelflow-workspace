import { FileText, ListTodo, Timer, Volume2, Wind } from "lucide-react";

interface NavbarProps {
  visibleWidgets: {
    notes: boolean;
    tasks: boolean;
    timer: boolean;
    sound: boolean;
  };
  onToggleWidget: (widget: keyof NavbarProps["visibleWidgets"]) => void;
}

const Navbar = ({ visibleWidgets, onToggleWidget }: NavbarProps) => {
  const navItems = [
    { id: "notes" as const, icon: FileText, label: "Notes" },
    { id: "tasks" as const, icon: ListTodo, label: "Tasks" },
    { id: "timer" as const, icon: Timer, label: "Timer" },
    { id: "sound" as const, icon: Volume2, label: "Sound" },
  ];

  return (
    <nav className="widget flex items-center justify-between px-4 py-3">
      {/* Left Side - Logo, Weather & Nav Links */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">G</span>
          </div>
          <span className="font-semibold text-foreground">Gumdrop</span>
        </div>

        {/* Separator */}
        <div className="w-px h-5 bg-border" />

        {/* Weather */}
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
          <Wind className="w-4 h-4" />
          <span>5°c windy</span>
        </div>

        {/* Separator */}
        <div className="w-px h-5 bg-border" />

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onToggleWidget(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                visibleWidgets[item.id]
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right Side - User Section */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-medium text-sm">A</span>
          </div>
          <span className="text-sm text-foreground">Anirban's Room</span>
        </div>
        <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          Links
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
