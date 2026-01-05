import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StoryModal = ({ isOpen, onClose }: StoryModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background/80 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            The Story Behind Gumdrop
          </DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              Gumdrop was born from a simple idea: creating a cozy digital space 
              where productivity meets tranquility.
            </p>
            <p>
              In a world full of distractions, we wanted to build something 
              different – a calm corner of the internet where you can focus on 
              what matters, track your tasks, and take mindful breaks.
            </p>
            <p>
              The pixel art backgrounds remind us of simpler times, while the 
              modern tools help us stay productive. It's the perfect blend of 
              nostalgia and functionality.
            </p>
            <p>
              Whether you're studying, working, or just need a peaceful space 
              to organize your thoughts, Gumdrop is here for you.
            </p>
            <p className="text-foreground font-medium pt-2">
              Welcome to your cozy productivity corner. 🍬
            </p>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default StoryModal;
