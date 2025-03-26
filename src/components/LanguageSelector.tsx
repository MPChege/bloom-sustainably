
import React, { useState } from 'react';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const LanguageSelector = () => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

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

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage) || 
                     availableLanguages[0];

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-1 bg-purple/10 hover:bg-purple/20 p-2 rounded-md transition-colors"
        onClick={toggleDropdown}
        aria-label="Select language"
      >
        <Globe className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium hidden sm:inline">{currentLang?.flag}</span>
        <ChevronDown className="w-3 h-3 text-primary" />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={closeDropdown} 
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-border">
            <div className="py-1 max-h-80 overflow-auto">
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  className={cn(
                    "flex items-center w-full px-4 py-2 text-sm text-left hover:bg-purple/10",
                    currentLanguage === lang.code && "bg-purple/5"
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
        </>
      )}
    </div>
  );
};

export default LanguageSelector;
