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
      <DialogContent className="sm:max-w-lg bg-background/85 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            The Story Behind This Site
          </DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className="space-y-4 text-sm leading-normal text-[#4c4c4c]">
            <p>
              <p className="text-[16px] text-foreground font-medium mb-2">
              Hello fellow human bean!
              </p>
              When I was making Gumdrop, I noticed that most of these workspace tools 
              out there was too complex and came with a big monthly subcription plan.
              And some of them just don't fit the vibes.
              Which is why I decided to create my own space. I'd say it's a 
              blend of nostalgia and a few tools that I found useful to work 
              along. Then, I decided, "Why not share this on the internet?"
            </p>
            <p>
              So if you found this helpful, I'm glad you gave it a try! And if 
              you have any feedback or suggestions, I'd love to hear from you.<br/>
              P.S. I don't own any of the images used on this site.
            </p>
            <p>
              Gumdrop is free to use, and open source. If you'd like to 
              contribute, just email me at{" "}
              <a href="mailto:anirban.tasfin.azad@gmail.com" className="text-green-600 font-medium hover:text-green-700">
                my email
              </a>{" "}
              and i'll send you the link to the repository on github.
            </p>
            <p className="text-foreground font-medium">
              Made with 💤 and 🍵 by <a href="" className="font-semibold hover:text-green-700"> ◗Qitzu◖</a> 
            </p>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default StoryModal;
