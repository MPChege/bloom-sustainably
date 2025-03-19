
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { processPayment, generateConfirmationCode, estimateShipping } from '@/lib/utils';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  shippingCost: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentDetails?: PaymentDetails;
  createdAt: Date;
  confirmationCode: string;
  estimatedDelivery: Date;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  totalItems: number;
  totalPrice: number;
  shippingAddress: ShippingAddress | null;
  setShippingAddress: (address: ShippingAddress) => void;
  checkoutStep: number;
  setCheckoutStep: (step: number) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  paymentDetails: PaymentDetails | null;
  setPaymentDetails: (details: PaymentDetails) => void;
  processCheckout: () => Promise<void>;
  isProcessingPayment: boolean;
  order: Order | null;
  shippingCost: number;
  calculateShippingCost: (zipCode: string) => void;
  estimatedDeliveryDays: number;
}

const defaultShippingAddress: ShippingAddress = {
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'United States',
  phone: '',
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [shippingCost, setShippingCost] = useState(9.99);
  const [estimatedDeliveryDays, setEstimatedDeliveryDays] = useState(3);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing saved cart:', e);
      }
    }
    
    const savedAddress = localStorage.getItem('shippingAddress');
    if (savedAddress) {
      try {
        setShippingAddress(JSON.parse(savedAddress));
      } catch (e) {
        console.error('Error parsing saved address:', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    
    // Calculate totals
    setTotalItems(items.reduce((total, item) => total + item.quantity, 0));
    setTotalPrice(items.reduce((total, item) => total + (item.price * item.quantity), 0));
  }, [items]);
  
  // Save shipping address to localStorage
  useEffect(() => {
    if (shippingAddress) {
      localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
    }
  }, [shippingAddress]);

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      // Check if item already exists in cart
      const existingItemIndex = currentItems.findIndex(item => item.id === newItem.id);
      
      if (existingItemIndex > -1) {
        // Item exists, increase quantity
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += 1;
        toast.success(`Added another ${newItem.name} to your cart`);
        return updatedItems;
      } else {
        // Item doesn't exist, add new item
        toast.success(`${newItem.name} added to your cart`);
        return [...currentItems, { ...newItem, quantity: 1 }];
      }
    });
    
    // Open the cart when an item is added
    setIsCartOpen(true);
  };

  const removeItem = (id: number) => {
    setItems(currentItems => {
      const itemToRemove = currentItems.find(item => item.id === id);
      if (itemToRemove) {
        toast.info(`${itemToRemove.name} removed from your cart`);
      }
      return currentItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(currentItems => 
      currentItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.info('Your cart has been cleared');
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };
  
  const calculateShippingCost = (zipCode: string) => {
    const { cost, days } = estimateShipping(zipCode);
    setShippingCost(cost);
    setEstimatedDeliveryDays(days);
  };

  const processCheckout = async () => {
    if (!shippingAddress || !paymentDetails) {
      toast.error("Missing required information");
      return;
    }

    setIsProcessingPayment(true);
    
    try {
      // Process payment
      const paymentResult = await processPayment({
        cardNumber: paymentDetails.cardNumber,
        expiryDate: paymentDetails.expiryDate,
        cvv: paymentDetails.cvv,
        name: paymentDetails.nameOnCard,
        amount: totalPrice + shippingCost
      });
      
      if (!paymentResult.success) {
        toast.error(paymentResult.error || "Payment processing failed");
        setIsProcessingPayment(false);
        return;
      }
      
      // Calculate estimated delivery date
      const estimatedDelivery = new Date();
      estimatedDelivery.setDate(estimatedDelivery.getDate() + estimatedDeliveryDays);
      
      // Create order record
      const newOrder: Order = {
        id: paymentResult.transactionId || `ORD-${Date.now()}`,
        items: [...items],
        totalPrice,
        shippingCost,
        status: 'processing',
        shippingAddress,
        paymentMethod,
        createdAt: new Date(),
        confirmationCode: generateConfirmationCode(),
        estimatedDelivery
      };
      
      setOrder(newOrder);
      
      // Save to order history
      const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
      orderHistory.push(newOrder);
      localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
      
      // Clear cart after successful order
      setItems([]);
      setCheckoutStep(3); // Move to confirmation step
      toast.success("Order placed successfully!");
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error("An error occurred during checkout. Please try again.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isCartOpen,
      toggleCart,
      totalItems,
      totalPrice,
      shippingAddress,
      setShippingAddress,
      checkoutStep,
      setCheckoutStep,
      paymentMethod,
      setPaymentMethod,
      paymentDetails,
      setPaymentDetails,
      processCheckout,
      isProcessingPayment,
      order,
      shippingCost,
      calculateShippingCost,
      estimatedDeliveryDays
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
