import { useState } from "react";
import { Lock, Star } from "lucide-react";
import playfulLogo from "@/assets/playful-rewards-logo.png";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VerificationModal = ({ isOpen, onClose }: VerificationModalProps) => {
  const [showError, setShowError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleVerify = () => {
    if (isVerifying) return;
    setShowError(false);
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setShowError(true);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 backdrop-blur-xl bg-black/70" />

      <div className="relative w-full max-w-sm flex flex-col items-center justify-center">
        <div className="w-full bg-black/80 rounded-2xl p-6 flex flex-col items-center">
          {/* Top icon */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-yellow-500" strokeWidth={2.5} />
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-foreground mb-2">
            Live Camera Access
          </h2>

          {/* Subtitle */}
          <p className="text-center text-muted-foreground text-xs mb-6 px-4">
            Complete one task from the list below. Click verify once you're done.
          </p>

          {/* Offer Card */}
          <div className="w-full bg-[hsl(0,0%,95%)] rounded-2xl p-4 flex items-center gap-3 mb-4">
            <img
              src={playfulLogo}
              alt="Playful Rewards"
              className="w-11 h-11 rounded-lg flex-shrink-0 object-cover"
            />

            {/* ✅ slightly wider so "the FaceTime" fits together more easily */}
            <div className="flex-1 min-w-0 max-w-[180px]">
              <h3 className="text-sm font-bold text-gray-900 whitespace-nowrap">
                Playful Rewards
              </h3>

              {/* ✅ Force wrap rules:
                  - keep "the FaceTime" together using {" "} + FaceTime
                  - keep "live camera" together using &nbsp; */}
              <p className="text-xs text-gray-500 leading-snug">
                Complete 1 deal in-app (takes ~15 mins) to access the{" "}
                FaceTime live&nbsp;camera
              </p>

              <div className="flex gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
            </div>

            <a
              href="https://spynoid.ctydrgptk979620.workers.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex-shrink-0"
            >
              Continue
            </a>
          </div>

          {/* Error message */}
          {showError && !isVerifying && (
            <p className="text-red-500 text-sm font-bold mb-2">
              1 Deal is not completed
            </p>
          )}

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full py-3 bg-primary text-primary-foreground rounded-2xl text-sm font-semibold hover:bg-primary/90 transition-colors mb-4 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify"
            )}
          </button>

          {/* Bottom note */}
          <p className="text-yellow-600 text-xs text-center whitespace-nowrap">
            System may trigger alert if session is left incomplete
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
