import { useState } from "react";
import { User, History, Video } from "lucide-react";
import cameraView from "@/assets/camera-view.jpg";
import LiveCameraModal from "./LiveCameraModal";
import VerificationModal from "./VerificationModal";
import HistoryModal from "./HistoryModal";

interface DeviceOnlineScreenProps {
  onClose: () => void;
}

const DeviceOnlineScreen = ({ onClose }: DeviceOnlineScreenProps) => {
  const [showLiveCamera, setShowLiveCamera] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleShowVerification = () => {
    setShowLiveCamera(false);
    setShowVerification(true);
  };

  return (
    <>
      <LiveCameraModal 
        isOpen={showLiveCamera} 
        onClose={() => setShowLiveCamera(false)}
        onShowVerification={handleShowVerification}
      />

      <VerificationModal
        isOpen={showVerification}
        onClose={() => {
          setShowVerification(false);
          onClose();
        }}
      />

      <HistoryModal
        isOpen={showHistory}
        onClose={() => {
          setShowHistory(false);
          onClose();
        }}
      />
      
      <div className="fixed inset-0 bg-background overflow-hidden">
        <img 
          src={cameraView}
          alt="Camera Background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "blur(50px)" }}
        />
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="absolute top-4 left-4 z-10">
          <h1 className="text-base font-bold text-foreground">Spynoid</h1>
        </div>
        
        <div className="relative h-full flex flex-col px-4">
          {/* Top Section - Device Info */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-[hsl(var(--icon-bg))] flex items-center justify-center">
                <User className="w-16 h-16 text-foreground/60" strokeWidth={1.5} />
              </div>

              <div className="text-center space-y-2 mt-6">
                <h2 className="text-3xl font-semibold text-foreground">Device Online</h2>
                <p className="text-green-500 text-lg font-normal">Live Camera Available</p>
              </div>
            </div>
          </div>

          {/* Bottom Section - Buttons */}
          <div className="w-full max-w-md mx-auto space-y-3 pb-6">
            <div className="flex gap-3">
              <button 
                onClick={() => setShowHistory(true)}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 bg-green-500 text-white rounded-full text-base font-semibold hover:bg-green-600 transition-colors whitespace-nowrap"
              >
                <History className="w-5 h-5" />
                View History
              </button>
              <button 
                onClick={() => setShowLiveCamera(true)}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 bg-white text-gray-900 rounded-full text-base font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                <Video className="w-5 h-5" />
                View Live
              </button>
            </div>

            <p className="text-center text-[hsl(var(--subtitle))] text-sm">
              Target won't be notified
            </p>

            <button
              onClick={onClose}
              className="w-full py-3.5 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold hover:bg-muted transition-colors mt-4"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceOnlineScreen;
