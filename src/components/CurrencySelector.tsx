
import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, DollarSign } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { cn } from '@/lib/utils';

const CurrencySelector = () => {
  const { currentCurrency, setCurrency, currencyOptions } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleSelect = (code: string) => {
    setCurrency(code);
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-1 text-gray-700 hover:text-primary transition-colors py-2"
        onClick={toggleDropdown}
        aria-label="Select currency"
      >
        <DollarSign className="w-4 h-4" />
        <span className="text-sm">{currentCurrency.code}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-200">
          <div className="py-1 max-h-80 overflow-auto">
            {currencyOptions.map((currency) => (
              <button
                key={currency.code}
                className={cn(
                  "flex items-center w-full px-3 py-2 text-sm text-left hover:bg-gray-50",
                  currentCurrency.code === currency.code && "bg-gray-50"
                )}
                onClick={() => handleSelect(currency.code)}
              >
                <span className="mr-2">{currency.symbol}</span>
                <span className="flex-grow">{currency.name}</span>
                {currentCurrency.code === currency.code && (
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

export default CurrencySelector;
