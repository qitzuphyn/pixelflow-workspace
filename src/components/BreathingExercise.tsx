import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

interface BreathingExerciseProps {
  isOpen: boolean;
  onClose: () => void;
}

const BreathingExercise = ({ isOpen, onClose }: BreathingExerciseProps) => {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [count, setCount] = useState(4);
  const [circleScale, setCircleScale] = useState(0.6);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const phaseRef = useRef<"inhale" | "hold" | "exhale">("inhale");
  const countRef = useRef(4);

  const INHALE_DURATION = 4000;
  const HOLD_DURATION = 7000;
  const EXHALE_DURATION = 8000;

  useEffect(() => {
    if (!isOpen) {
      setPhase("inhale");
      setCount(4);
      setCircleScale(0.6);
      phaseRef.current = "inhale";
      countRef.current = 4;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    startTimeRef.current = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current;
      const currentPhase = phaseRef.current;
      
      let phaseDuration: number;
      let nextPhase: "inhale" | "hold" | "exhale";
      let nextCount: number;
      
      if (currentPhase === "inhale") {
        phaseDuration = INHALE_DURATION;
        nextPhase = "hold";
        nextCount = 7;
        // Grow from 0.6 to 1.0
        const progress = Math.min(elapsed / phaseDuration, 1);
        setCircleScale(0.6 + (0.4 * progress));
      } else if (currentPhase === "hold") {
        phaseDuration = HOLD_DURATION;
        nextPhase = "exhale";
        nextCount = 8;
        // Stay at 1.0
        setCircleScale(1.0);
      } else {
        phaseDuration = EXHALE_DURATION;
        nextPhase = "inhale";
        nextCount = 4;
        // Shrink from 1.0 to 0.6
        const progress = Math.min(elapsed / phaseDuration, 1);
        setCircleScale(1.0 - (0.4 * progress));
      }
      
      // Update countdown
      const remaining = Math.ceil((phaseDuration - elapsed) / 1000);
      if (remaining !== countRef.current && remaining > 0) {
        countRef.current = remaining;
        setCount(remaining);
      }
      
      // Check if phase should change
      if (elapsed >= phaseDuration) {
        phaseRef.current = nextPhase;
        countRef.current = nextCount;
        setPhase(nextPhase);
        setCount(nextCount);
        startTimeRef.current = currentTime;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isOpen]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  if (!isOpen) return null;

  const getPhaseText = () => {
    if (phase === "inhale") return "Breathe In";
    if (phase === "hold") return "Hold";
    return "Breathe Out";
  };

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-6">
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute -top-16 right-0 p-2 rounded-full bg-background/30 backdrop-blur-md border border-border/30 text-foreground hover:bg-background/50 transition-colors z-20"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Breathing circle */}
      <div className="relative flex items-center justify-center w-64 h-64">
        {/* Outer glow ring - animates */}
        <div 
          className="absolute w-64 h-64 rounded-full bg-primary/20 blur-xl transition-transform duration-100"
          style={{ transform: `scale(${circleScale})` }}
        />
        
        {/* Main circle - animates */}
        <div 
          className="absolute w-48 h-48 rounded-full bg-background/30 backdrop-blur-md border border-border/30 shadow-2xl transition-transform duration-100"
          style={{ transform: `scale(${circleScale})` }}
        >
          {/* Inner gradient */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/30 to-transparent" />
        </div>
        
        {/* Text container - stays fixed */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <span className="text-2xl font-light text-foreground tracking-wider">
            {getPhaseText()}
          </span>
          <span className="text-5xl font-bold text-foreground mt-2">
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
  );
};

export default BreathingExercise;
