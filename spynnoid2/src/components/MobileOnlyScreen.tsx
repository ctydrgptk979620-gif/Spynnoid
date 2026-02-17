import { Smartphone } from "lucide-react";

const MobileOnlyScreen = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center p-4">
      <div className="flex flex-col items-center text-center max-w-md">
        {/* Phone Icon */}
        <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center mb-8">
          <Smartphone className="w-12 h-12 text-gray-400" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white mb-4">Mobile Only</h1>

        {/* Description */}
        <p className="text-gray-400 text-base leading-relaxed">
          This application is designed for mobile devices only.
          <br />
          Please access it from your smartphone or tablet.
        </p>
      </div>
    </div>
  );
};

export default MobileOnlyScreen;
