import { useEffect, useState } from "react";
import { Link2 } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-background flex flex-col overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-base font-medium text-foreground">Spynect</h1>
      </div>
      
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center space-y-8">
            <div className="w-24 h-24 rounded-full bg-[hsl(var(--icon-bg))] flex items-center justify-center">
              <Link2 className="w-10 h-10 text-foreground" />
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-3xl font-semibold text-foreground">Connecting</h2>
              <p className="text-[hsl(var(--subtitle))] text-base">Please wait...</p>
            </div>

            <div className="w-full max-w-md px-8">
              <div className="w-full h-1.5 bg-[hsl(var(--icon-bg))] rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
