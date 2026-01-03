import { useState, useRef, useEffect } from "react";
import { Volume2, TreePine, CloudRain, Flame, Coffee, Waves, Sparkles, Play, Pause } from "lucide-react";
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

const extractYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

const SoundWidget = () => {
  const [linkVolume, setLinkVolume] = useState([50]);
  const [ambientVolume, setAmbientVolume] = useState([30]);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [youtubeId, setYoutubeId] = useState<string | null>(null);
  const [isYoutubePlaying, setIsYoutubePlaying] = useState(false);
  const [activeAmbient, setActiveAmbient] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const handleYoutubeLink = () => {
    const id = extractYouTubeId(youtubeLink);
    if (id) {
      setYoutubeId(id);
      setIsYoutubePlaying(true);
    }
  };

  const toggleYoutube = () => {
    if (youtubeId) {
      setIsYoutubePlaying(!isYoutubePlaying);
      if (iframeRef.current?.contentWindow) {
        const command = isYoutubePlaying ? "pauseVideo" : "playVideo";
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: command }),
          "*"
        );
      }
    }
  };

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

  // Update YouTube volume when slider changes
  useEffect(() => {
    if (iframeRef.current?.contentWindow && youtubeId) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "setVolume", args: [linkVolume[0]] }),
        "*"
      );
    }
  }, [linkVolume, youtubeId]);

  return (
    <div className="widget p-3 w-64 space-y-3">
      <h3 className="font-semibold text-foreground text-sm">Sound</h3>
      
      {/* Link Section */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">YouTube</span>
          <div className="flex items-center gap-1.5">
            <Volume2 className="w-3 h-3 text-muted-foreground" />
            <Slider
              value={linkVolume}
              onValueChange={setLinkVolume}
              max={100}
              step={1}
              className="w-16"
            />
          </div>
        </div>
        <div className="flex gap-1">
          <Input
            type="text"
            placeholder="Paste YouTube link..."
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleYoutubeLink()}
            className="text-xs bg-secondary border-0 h-7 flex-1"
          />
          {youtubeId && (
            <button
              onClick={toggleYoutube}
              className="p-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {isYoutubePlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
          )}
        </div>
      </div>

      {/* Hidden YouTube iframe for audio */}
      {youtubeId && isYoutubePlaying && (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&enablejsapi=1&loop=1&playlist=${youtubeId}&origin=${window.location.origin}`}
          allow="autoplay"
          className="hidden"
        />
      )}

      {/* Ambient Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Ambient</span>
          <div className="flex items-center gap-1.5">
            <Volume2 className="w-3 h-3 text-muted-foreground" />
            <Slider
              value={ambientVolume}
              onValueChange={setAmbientVolume}
              max={100}
              step={1}
              className="w-16"
            />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-1">
          {ambientSounds.map((sound) => {
            const Icon = sound.icon;
            const isActive = activeAmbient === sound.id;
            return (
              <button
                key={sound.id}
                onClick={() => setActiveAmbient(isActive ? null : sound.id)}
                className={`p-1.5 rounded-full transition-all duration-200 ${
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
                title={sound.id.charAt(0).toUpperCase() + sound.id.slice(1)}
              >
                <Icon className="w-3 h-3" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SoundWidget;
