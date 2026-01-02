import { useState, useEffect } from "react";

interface StatusDisplayProps {
  isTimerRunning: boolean;
}

const StatusDisplay = ({ isTimerRunning }: StatusDisplayProps) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (!isTimerRunning) return;
    
    const interval = setInterval(() => {
      setOpacity((prev) => (prev === 1 ? 0.6 : 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  return (
    <div 
      className="font-pixel text-6xl md:text-8xl tracking-widest transition-opacity duration-500"
      style={{ 
        opacity: isTimerRunning ? opacity : 0.9,
        color: "rgba(255, 255, 255, 0.85)",
        textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)"
      }}
    >
      {isTimerRunning ? "focus" : "Stand by"}
    </div>
  );
};

export default StatusDisplay;
