import { ChevronLeft, ChevronRight } from "lucide-react";

interface BackgroundSwitcherProps {
  currentBg: number;
  onChangeBg: (index: number) => void;
  totalBgs: number;
}

const BackgroundSwitcher = ({ currentBg, onChangeBg, totalBgs }: BackgroundSwitcherProps) => {
  const handlePrev = () => {
    onChangeBg(currentBg === 0 ? totalBgs - 1 : currentBg - 1);
  };

  const handleNext = () => {
    onChangeBg((currentBg + 1) % totalBgs);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20">
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background/30 backdrop-blur-md border border-border/30 shadow-lg">
        <button
          onClick={handlePrev}
          className="p-1.5 rounded-lg bg-background/50 text-foreground hover:bg-background/70 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <div className="flex items-center gap-1.5 px-1">
          {Array.from({ length: totalBgs }).map((_, i) => (
            <button
              key={i}
              onClick={() => onChangeBg(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentBg 
                  ? "bg-primary scale-125" 
                  : "bg-foreground/30 hover:bg-foreground/50"
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={handleNext}
          className="p-1.5 rounded-lg bg-background/50 text-foreground hover:bg-background/70 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default BackgroundSwitcher;
