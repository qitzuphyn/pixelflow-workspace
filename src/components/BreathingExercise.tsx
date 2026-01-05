import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface BreathingExerciseProps {
  isOpen: boolean;
  onClose: () => void;
}

const BreathingExercise = ({ isOpen, onClose }: BreathingExerciseProps) => {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [count, setCount] = useState(4);

  useEffect(() => {
    if (!isOpen) {
      setPhase("inhale");
      setCount(4);
      return;
    }

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          setPhase((currentPhase) => {
            if (currentPhase === "inhale") return "hold";
            if (currentPhase === "hold") return "exhale";
            return "inhale";
          });
          if (phase === "inhale") return 7;
          if (phase === "hold") return 8;
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, phase]);

  if (!isOpen) return null;

  const getCircleSize = () => {
    if (phase === "inhale") return "scale-100";
    if (phase === "hold") return "scale-100";
    return "scale-75";
  };

  const getPhaseText = () => {
    if (phase === "inhale") return "Breathe In";
    if (phase === "hold") return "Hold";
    return "Breathe Out";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 rounded-full bg-background/30 backdrop-blur-md border border-border/30 text-foreground hover:bg-background/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Breathing circle */}
        <div className="relative flex items-center justify-center">
          {/* Outer glow ring */}
          <div 
            className={`absolute w-64 h-64 rounded-full bg-primary/20 blur-xl transition-transform duration-[4000ms] ease-in-out ${getCircleSize()}`}
          />
          
          {/* Main circle */}
          <div 
            className={`w-48 h-48 rounded-full bg-background/30 backdrop-blur-md border border-border/30 shadow-2xl flex flex-col items-center justify-center transition-transform duration-[4000ms] ease-in-out ${getCircleSize()}`}
          >
            {/* Inner gradient */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/30 to-transparent" />
            
            {/* Text */}
            <span className="relative text-2xl font-light text-foreground tracking-wider">
              {getPhaseText()}
            </span>
            <span className="relative text-5xl font-bold text-foreground mt-2">
              {count}
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="px-6 py-3 rounded-xl bg-background/30 backdrop-blur-md border border-border/30">
          <p className="text-sm text-foreground/80 text-center">
            4-7-8 Breathing Technique
          </p>
          <p className="text-xs text-muted-foreground text-center mt-1">
            Inhale 4s • Hold 7s • Exhale 8s
          </p>
        </div>
      </div>
    </div>
  );
};

export default BreathingExercise;
