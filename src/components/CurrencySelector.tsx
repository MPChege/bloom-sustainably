
import React, { useState } from 'react';
import { Check, ChevronDown, DollarSign } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { cn } from '@/lib/utils';

const CurrencySelector = () => {
  const { currentCurrency, setCurrency, currencyOptions } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleSelect = (code: string) => {
    setCurrency(code);
    closeDropdown();
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 text-gray-700 hover:text-primary transition-colors"
        onClick={toggleDropdown}
        aria-label="Select currency"
      >
        <DollarSign className="w-4 h-4" />
        <span className="text-sm font-medium">{currentCurrency.code}</span>
        <ChevronDown className="w-3 h-3" />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={closeDropdown} 
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-border">
            <div className="py-1">
              {currencyOptions.map((currency) => (
                <button
                  key={currency.code}
                  className={cn(
                    "flex items-center w-full px-4 py-2 text-sm text-left hover:bg-purple/10",
                    currentCurrency.code === currency.code && "bg-purple/5"
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
        </>
      )}
    </div>
  );
};

export default CurrencySelector;
