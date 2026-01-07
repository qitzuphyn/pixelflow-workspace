import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NameModalProps {
  onNameSet: (name: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const NameModal = ({ onNameSet, isOpen: externalOpen, onClose }: NameModalProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [name, setName] = useState("");

  const isControlled = externalOpen !== undefined;
  const open = isControlled ? externalOpen : internalOpen;

  useEffect(() => {
    const storedName = localStorage.getItem("gumdrop-username");
    if (!storedName) {
      setInternalOpen(true);
    } else {
      onNameSet(storedName);
    }
  }, [onNameSet]);

  useEffect(() => {
    if (open) {
      const storedName = localStorage.getItem("gumdrop-username");
      if (storedName) {
        setName(storedName);
      }
    }
  }, [open]);

  const handleSubmit = () => {
    if (name.trim()) {
      localStorage.setItem("gumdrop-username", name.trim());
      onNameSet(name.trim());
      if (isControlled && onClose) {
        onClose();
      } else {
        setInternalOpen(false);
      }
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && isControlled && onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-lg border-border/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            {isControlled ? "Change Your Name" : "Welcome to Gumdrop Space ✨"}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            What should we call you?
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Input
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="bg-secondary border-0 h-10 text-center"
            autoFocus
          />
          <Button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="w-full"
          >
            {isControlled ? "Save Name" : "Enter My Space"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NameModal;