import { useState } from "react";
import { Volume2, TreePine, CloudRain, Flame, Coffee, Waves, Wind } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

const ambientSounds = [
  { id: "forest", label: "Forest", icon: TreePine, color: "bg-ambient-forest" },
  { id: "rain", label: "Rain", icon: CloudRain, color: "bg-ambient-rain" },
  { id: "fire", label: "Fire", icon: Flame, color: "bg-ambient-fire" },
  { id: "cafe", label: "Cafe", icon: Coffee, color: "bg-ambient-cafe" },
  { id: "waves", label: "Waves", icon: Waves, color: "bg-ambient-waves" },
  { id: "wind", label: "Wind", icon: Wind, color: "bg-ambient-wind" },
];

const SoundWidget = () => {
  const [linkVolume, setLinkVolume] = useState([50]);
  const [ambientVolume, setAmbientVolume] = useState([30]);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [activeAmbient, setActiveAmbient] = useState<string | null>("forest");

  return (
    <div className="widget p-4 w-64 space-y-4">
      <h3 className="font-semibold text-foreground">Sound</h3>
      
      {/* Link Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Link</span>
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <Slider
              value={linkVolume}
              onValueChange={setLinkVolume}
              max={100}
              step={1}
              className="w-20"
            />
          </div>
        </div>
        <Input
          type="text"
          placeholder="https://youtu.be/..."
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          className="text-sm bg-secondary border-0"
        />
      </div>

      {/* Ambient Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Ambient</span>
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <Slider
              value={ambientVolume}
              onValueChange={setAmbientVolume}
              max={100}
              step={1}
              className="w-20"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {ambientSounds.map((sound) => {
            const Icon = sound.icon;
            const isActive = activeAmbient === sound.id;
            return (
              <button
                key={sound.id}
                onClick={() => setActiveAmbient(isActive ? null : sound.id)}
                className={`ambient-btn flex items-center gap-1.5 ${
                  isActive ? "ambient-btn-active" : "ambient-btn-inactive"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sound.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SoundWidget;
