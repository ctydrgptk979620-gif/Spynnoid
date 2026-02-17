import { X } from "lucide-react";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal = ({ isOpen, onClose }: PrivacyPolicyModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-black rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-white/10 sticky top-0 bg-black z-10">
          <h2 className="text-sm font-semibold text-white">Privacy Policy</h2>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto text-white space-y-6">
          <p className="text-gray-400 text-sm">Last updated: November 16, 2025</p>

          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed">
              This Privacy Policy describes how your personal information is collected, used, 
              and shared when you visit Spynect (the "Site").
            </p>

            <div>
              <h3 className="text-xl font-bold mb-3">Information We Collect</h3>
              <p className="text-gray-300 leading-relaxed">
                We do not collect any personal information from users. This tool is for 
                entertainment purposes only and does not actually connect to Apple servers or 
                retrieve any real data. Any usernames or information input into the app are not 
                stored, tracked, or sent to any external server.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">How We Use Your Information</h3>
              <p className="text-gray-300 leading-relaxed">
                Since we do not collect any personal information, we do not use it for any 
                purpose. The application simulates processing but does not perform any 
                actual retrieval or analysis of iPhone data.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Sharing Your Information</h3>
              <p className="text-gray-300 leading-relaxed">
                We do not share, sell, rent, or trade any information with third parties.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Cookies and Tracking Technologies</h3>
              <p className="text-gray-300 leading-relaxed">
                The Site does not use cookies or any tracking technologies to collect 
                information about you.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Changes</h3>
              <p className="text-gray-300 leading-relaxed">
                We may update this privacy policy from time to time to reflect changes to our 
                practices or for other operational, legal, or regulatory reasons.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Contact Us</h3>
              <p className="text-gray-300 leading-relaxed">
                For more information about our privacy practices, if you have questions, or if you 
                would like to make a complaint, please contact us.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-gray-500 text-sm leading-relaxed">
                Disclaimer: Spynect is not affiliated with, endorsed by, or sponsored by Apple or 
                any of its affiliates or subsidiaries. This is a simulation for entertainment 
                purposes only. All trademarks, service marks, trade names, trade dress, product 
                names and logos appearing on the site are the property of their respective owners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
