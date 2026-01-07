import { useState, useEffect } from "react";
import { FileText, ListTodo, Timer, Volume2, Cloud, Sun, CloudRain, ExternalLink, Check, ChevronDown, User } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "/src/assets/logo.svg";
import bmac from "/src/assets/bmac logo.png";
import about from "/src/assets/sparkles.svg";

interface NavbarProps {
  visibleWidgets: {
    notes: boolean;
    tasks: boolean;
    timer: boolean;
    sound: boolean;
  };
  onToggleWidget: (widget: keyof NavbarProps["visibleWidgets"]) => void;
  userName: string;
  onStoryClick: () => void;
  onNameChange: () => void;
}

interface WeatherData {
  temp: number;
  condition: string;
  city: string;
}

const Navbar = ({ visibleWidgets, onToggleWidget, userName, onStoryClick, onNameChange }: NavbarProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [copied, setCopied] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
            );
            const data = await response.json();
            
            const geoResponse = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const geoData = await geoResponse.json();
            
            const weatherCode = data.current.weather_code;
            let condition = "Clear";
            if (weatherCode >= 51 && weatherCode <= 67) condition = "Rainy";
            else if (weatherCode >= 71 && weatherCode <= 77) condition = "Snowy";
            else if (weatherCode >= 1 && weatherCode <= 3) condition = "Cloudy";
            
            setWeather({
              temp: Math.round(data.current.temperature_2m),
              condition,
              city: geoData.address?.city || geoData.address?.town || geoData.address?.village || "Unknown"
            });
          } catch (error) {
            console.error("Weather fetch error:", error);
          }
        },
        () => {
          setWeather({ temp: 20, condition: "Clear", city: "Your City" });
        }
      );
    }
  }, []);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText("gumdrop-space.netlify.app");
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const getWeatherIcon = () => {
    if (!weather) return Cloud;
    switch (weather.condition) {
      case "Rainy": return CloudRain;
      case "Cloudy": return Cloud;
      default: return Sun;
    }
  };

  const WeatherIcon = getWeatherIcon();

  const navItems = [
    { id: "notes" as const, icon: FileText, label: "Notes" },
    { id: "tasks" as const, icon: ListTodo, label: "Tasks" },
    { id: "timer" as const, icon: Timer, label: "Timer" },
    { id: "sound" as const, icon: Volume2, label: "Sound" },
  ];

  return (
    <nav className="flex items-center justify-between">
      {/* Left Side - Logo & Weather */}
      <div className="flex items-center gap-2">
        <div className="widget flex items-center gap-3 px-3 py-2">
          {/* Logo */}
          <div className="flex items-center gap-1.5">
            <img src={logo} alt="Gumdrop Logo" className="w-5 h-5" />
            <span className="font-semibold text-foreground text-sm">Gumdrop</span>
          </div>

          {/* Separator */}
          <div className="w-px h-4 bg-gray-400" />

          {/* Weather */}
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <WeatherIcon className="w-3.5 h-3.5" />
            <span>{weather ? `${weather.temp}°c ${weather.condition.toLowerCase()}` : "Loading..."}</span>
            {/* {weather && (
              <>
                <MapPin className="w-3 h-3 ml-1" />
                <span className="text-foreground/70">{weather.city}</span>
              </>
            )} */}
          </div>
        </div>
        {/* Center - Nav Links */}
        <div className="widget flex items-center gap-0.5 px-3 py-1.5">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onToggleWidget(item.id)}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-colors ${
                visibleWidgets[item.id]
                  ? "text-green-700 font-semibold"
                  : "text-gray-400 hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Story Button */}
        <button
          onClick={onStoryClick}
          className="p-1.5 rounded-md text-muted-foreground hover:rotate-90 transition-transform"
          title="Hear me out!"
        >
          <img src={about} alt="About" className="w-6 h-6" />
        </button>
        <button
          className="pr-3 pl-2 h-[37.6px] bg-[#FFDD00] text-foreground rounded-md text-sm font-bold hover:bg-[#FFDD00]/90 transition-colors flex items-center gap-1"
          onClick={() => window.open("https://buymeacoffee.com/do3e6rqpp", "_blank")}
        >
          <img src={bmac} alt="Buy me a coffee" className="w-6 h-6" />
          Buy me a coffee
        </button>

        {/* Right Side - User Section */}
        <div className="widget flex items-center gap-2.5 px-2.5 py-1.5">
          {/* User Name Dropdown */}
        <DropdownMenu open={userMenuOpen} onOpenChange={setUserMenuOpen}>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-secondary transition-colors">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-medium text-xs">
                  {userName ? userName.charAt(0).toUpperCase() : "?"}
                </span>
              </div>
              <span className="text-xs text-foreground">{userName ? `${userName}'s Room` : "My Room"}</span>
              <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={onNameChange} className="cursor-pointer">
              <User className="w-4 h-4 mr-2" />
              Change Name
            </DropdownMenuItem>
            {/* <DropdownMenuItem onClick={handleInstall} className="cursor-pointer">
              <Download className="w-4 h-4 mr-2" />
              {isInstalled ? "Already Installed" : "Install App"}
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
          {/* Separator */}
          <div className="w-px h-4 bg-gray-400" />
          <button 
            onClick={handleShare}
            className="px-2 py-1 bg-primary text-primary-foreground rounded-sm text-xs font-medium hover:bg-primary/90 transition-colors flex items-center gap-1"
          >
            {copied ? <Check className="w-3 h-3" /> : <ExternalLink className="w-3 h-3" />}
            {copied ? "Copied!" : "Share"}
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
