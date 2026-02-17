import { useEffect, useState } from "react";
import { Video, Volume2, X } from "lucide-react";
import liveCamera from "@/assets/camera-view.jpg";

interface LiveCameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowVerification: () => void;
}

const LiveCameraModal = ({ isOpen, onClose, onShowVerification }: LiveCameraModalProps) => {
  const [timeLeft, setTimeLeft] = useState(4);

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(4);
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onShowVerification();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen, onShowVerification]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-card rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-2.5">
            <Video className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Live Camera</h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>
        </div>

        {/* Camera View Area */}
        <div className="relative aspect-video bg-input overflow-hidden">
          <img 
            src={liveCamera}
            alt="Live Camera Feed"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "blur(50px)" }}
          />
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Mute Button */}
          <button className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-black/70 flex items-center justify-center hover:bg-black/90 transition-colors z-10">
            <Volume2 className="w-4 h-4 text-foreground" />
          </button>
        </div>

        {/* Device Info */}
        <div className="p-4 space-y-2.5 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Device</span>
            <span className="text-foreground text-sm font-medium">iPhone</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Status</span>
            <span className="text-green-500 text-sm font-medium">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCameraModal;
