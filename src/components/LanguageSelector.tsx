
import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const LanguageSelector = () => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  // Filter to only show English and Dutch
  const availableLanguages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'nl', name: 'Dutch', flag: '🇳🇱' }
  ];

  const handleSelect = (code: string) => {
    setLanguage(code);
    closeDropdown();
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage) || availableLanguages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-1 text-gray-700 hover:text-primary transition-colors py-2"
        onClick={toggleDropdown}
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm">{currentLang?.flag}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-200">
          <div className="py-1">
            {availableLanguages.map((lang) => (
              <button
                key={lang.code}
                className={cn(
                  "flex items-center w-full px-3 py-2 text-sm text-left hover:bg-gray-50",
                  currentLanguage === lang.code && "bg-gray-50"
                )}
                onClick={() => handleSelect(lang.code)}
              >
                <span className="mr-2">{lang.flag}</span>
                <span className="flex-grow">{lang.name}</span>
                {currentLanguage === lang.code && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
