import { FileText, ListTodo, Timer, Volume2, Wind } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="widget flex items-center justify-between px-4 py-3">
      {/* Logo & Weather */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">G</span>
          </div>
          <span className="font-semibold text-foreground">Gumdrop</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
          <Wind className="w-4 h-4" />
          <span>5°c windy</span>
        </div>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-1">
        {[
          { icon: FileText, label: "Notes" },
          { icon: ListTodo, label: "Tasks" },
          { icon: Timer, label: "Timer" },
          { icon: Volume2, label: "Sound" },
        ].map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* User Section */}
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
