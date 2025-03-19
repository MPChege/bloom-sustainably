
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Available currencies
export const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.93 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.78 },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', rate: 3.67 },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', rate: 130.25 },
];

interface CurrencyContextType {
  currentCurrency: typeof currencies[0];
  setCurrency: (code: string) => void;
  formatPrice: (price: number) => string;
  convertPrice: (price: number) => number;
  currencyOptions: typeof currencies;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentCurrency, setCurrentCurrency] = useState(currencies[0]);

  // Convert price to the selected currency
  const convertPrice = (price: number): number => {
    return price * currentCurrency.rate;
  };

  // Format price with currency symbol
  const formatPrice = (price: number): string => {
    const convertedPrice = convertPrice(price);
    
    // Handle RTL currencies differently if needed
    if (currentCurrency.code === 'AED') {
      return `${convertedPrice.toFixed(2)} ${currentCurrency.symbol}`;
    }
    
    return `${currentCurrency.symbol}${convertedPrice.toFixed(2)}`;
  };

  // Set currency
  const setCurrency = (code: string) => {
    const currency = currencies.find(c => c.code === code);
    if (currency) {
      setCurrentCurrency(currency);
      localStorage.setItem('currency', code);
    }
  };

  // Load currency preference from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);

  return (
    <CurrencyContext.Provider value={{ 
      currentCurrency, 
      setCurrency, 
      formatPrice, 
      convertPrice,
      currencyOptions: currencies
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
