import { useState, useRef, useEffect } from "react";
import { Volume2, TreePine, CloudRain, Flame, Coffee, Waves, Sparkles } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

const ambientSounds = [
  { id: "forest", icon: TreePine, audioUrl: "https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3" },
  { id: "space", icon: Sparkles, audioUrl: "https://assets.mixkit.co/active_storage/sfx/1234/1234-preview.mp3" },
  { id: "rain", icon: CloudRain, audioUrl: "https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3" },
  { id: "fire", icon: Flame, audioUrl: "https://assets.mixkit.co/active_storage/sfx/1188/1188-preview.mp3" },
  { id: "waves", icon: Waves, audioUrl: "https://assets.mixkit.co/active_storage/sfx/2432/2432-preview.mp3" },
  { id: "cafe", icon: Coffee, audioUrl: "https://assets.mixkit.co/active_storage/sfx/181/181-preview.mp3" },
];

const SoundWidget = () => {
  const [linkVolume, setLinkVolume] = useState([50]);
  const [ambientVolume, setAmbientVolume] = useState([30]);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [activeAmbient, setActiveAmbient] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (activeAmbient) {
      const sound = ambientSounds.find(s => s.id === activeAmbient);
      if (sound) {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        audioRef.current = new Audio(sound.audioUrl);
        audioRef.current.loop = true;
        audioRef.current.volume = ambientVolume[0] / 100;
        audioRef.current.play().catch(() => {});
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [activeAmbient]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = ambientVolume[0] / 100;
    }
  }, [ambientVolume]);

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
        <div className="flex gap-2">
          {ambientSounds.map((sound) => {
            const Icon = sound.icon;
            const isActive = activeAmbient === sound.id;
            return (
              <button
                key={sound.id}
                onClick={() => setActiveAmbient(isActive ? null : sound.id)}
                className={`p-2.5 rounded-full transition-all duration-200 ${
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
                title={sound.id.charAt(0).toUpperCase() + sound.id.slice(1)}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SoundWidget;
