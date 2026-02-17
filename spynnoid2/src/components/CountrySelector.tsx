import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { countries, Country } from "@/data/countries";

interface CountrySelectorProps {
  selectedCountry: Country;
  onSelect: (country: Country) => void;
}

const CountrySelector = ({ selectedCountry, onSelect }: CountrySelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.prefix.includes(searchQuery)
  );

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-3 bg-input rounded-2xl text-foreground hover:bg-muted transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{selectedCountry.flag}</span>
          <span className="text-sm">{selectedCountry.name}</span>
        </div>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-2xl shadow-lg max-h-72 overflow-hidden z-50">
          <div className="sticky top-0 bg-card p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search regions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-input rounded-xl text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onSelect(country);
                  setIsOpen(false);
                  setSearchQuery("");
                }}
                className="w-full flex items-center gap-2.5 px-5 py-2.5 hover:bg-muted transition-colors text-left"
              >
                <span className="text-lg">{country.flag}</span>
                <span className="text-xs">{country.name}</span>
                <span className="text-xs text-muted-foreground ml-auto">{country.prefix}</span>
              </button>
            ))}
            {filteredCountries.length === 0 && (
              <div className="px-5 py-4 text-xs text-muted-foreground text-center">
                No regions found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
