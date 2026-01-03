import { useState } from "react";
import { Image, ChevronLeft, ChevronRight } from "lucide-react";

interface BackgroundSwitcherProps {
  currentBg: number;
  onChangeBg: (index: number) => void;
  totalBgs: number;
}

const BackgroundSwitcher = ({ currentBg, onChangeBg, totalBgs }: BackgroundSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePrev = () => {
    onChangeBg(currentBg === 0 ? totalBgs - 1 : currentBg - 1);
  };

  const handleNext = () => {
    onChangeBg((currentBg + 1) % totalBgs);
  };

  return (
    <div className="widget p-2 flex items-center gap-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-muted transition-colors"
        title="Change background"
      >
        <Image className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs text-muted-foreground px-2">
            {currentBg + 1}/{totalBgs}
          </span>
          <button
            onClick={handleNext}
            className="p-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default BackgroundSwitcher;
