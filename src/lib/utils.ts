
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function generateOrderNumber(): string {
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `ORD-${timestamp}-${random}`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

// Payment processing simulation
export function processPayment(paymentDetails: {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
  amount: number;
}): Promise<{success: boolean; transactionId?: string; error?: string}> {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Simple validation
      if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv) {
        resolve({success: false, error: "Missing payment information"});
        return;
      }
      
      // Card number validation (simple check for demo)
      if (paymentDetails.cardNumber.replace(/\s/g, '').length !== 16) {
        resolve({success: false, error: "Invalid card number"});
        return;
      }
      
      // Generate a fake transaction ID
      const transactionId = 'TX-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      
      // Success response
      resolve({
        success: true,
        transactionId
      });
    }, 1500); // 1.5 second delay to simulate processing
  });
}

// Shipping estimation
export function estimateShipping(zipCode: string): {cost: number; days: number} {
  // Simple estimation logic based on zip code first digit
  const firstDigit = parseInt(zipCode.charAt(0));
  
  // Base shipping cost and time
  let cost = 9.99;
  let days = 3;
  
  // Adjust based on "distance" (using first digit as a simple proxy)
  if (firstDigit > 7) {
    cost += 5;
    days += 2;
  } else if (firstDigit < 3) {
    cost += 2;
    days += 1;
  }
  
  return {cost, days};
}

// Generate confirmation code
export function generateConfirmationCode(): string {
  return `CB-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}
