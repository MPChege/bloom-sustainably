
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, ShoppingBag, CreditCard, Check } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import Button from './Button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type PaymentMethod = 'credit-card' | 'paypal' | 'bank-transfer';

type CheckoutFormValues = {
  fullName: string;
  email: string;
  address: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
};

const Cart: React.FC = () => {
  const { 
    items, 
    isCartOpen, 
    toggleCart, 
    removeItem, 
    updateQuantity, 
    totalItems,
    totalPrice,
    clearCart
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'payment' | 'confirmation'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<CheckoutFormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      address: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
  });

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setCheckoutStep('payment');
  };

  const handlePaymentSubmit = (data: CheckoutFormValues) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep('confirmation');
      toast.success("Payment successful!");
    }, 1500);
  };

  const handleBackToCart = () => {
    setCheckoutStep('cart');
  };

  const handleFinishOrder = () => {
    clearCart();
    toggleCart();
    setCheckoutStep('cart');
    toast.success("Thank you for your order!");
  };

  return (
    <>
      {/* Cart Icon in the header */}
      <button 
        onClick={toggleCart} 
        className="cart-icon flex items-center justify-center w-10 h-10 rounded-full bg-purple/10 hover:bg-purple/20 transition-all"
        aria-label="Shopping Cart"
      >
        <ShoppingBag className="w-5 h-5 text-primary" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs font-bold rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Drawer */}
      <div className={`cart-drawer fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-purple/5">
            <h2 className="text-lg font-medium">
              {checkoutStep === 'cart' && `Your Cart (${totalItems})`}
              {checkoutStep === 'payment' && 'Payment Details'}
              {checkoutStep === 'confirmation' && 'Order Confirmation'}
            </h2>
            <button 
              onClick={toggleCart}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          {checkoutStep === 'cart' && (
            <div className="flex-grow overflow-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-2">Your cart is empty</p>
                  <button 
                    onClick={toggleCart}
                    className="text-primary font-medium hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="cart-item flex items-center border-b border-border pb-4">
                      <div className="w-16 h-16 rounded overflow-hidden mr-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="product-price mt-1 text-secondary font-semibold">{formatCurrency(item.price)}</p>
                        <div className="flex items-center mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-purple/10 hover:bg-purple/20 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="mx-2 w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-purple/10 hover:bg-purple/20 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-secondary transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Payment Form */}
          {checkoutStep === 'payment' && (
            <div className="flex-grow overflow-auto p-4">
              <form onSubmit={form.handleSubmit(handlePaymentSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Contact Information</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName" 
                        {...form.register('fullName', { required: true })}
                        placeholder="John Doe"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        {...form.register('email', { required: true })}
                        placeholder="your@email.com"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Shipping Address</Label>
                      <Input 
                        id="address" 
                        {...form.register('address', { required: true })}
                        placeholder="123 Main St, City, Country"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 border-t border-border pt-4">
                  <h3 className="font-medium">Payment Method</h3>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('credit-card')}
                      className={`p-3 border rounded-md flex flex-col items-center justify-center text-sm ${
                        paymentMethod === 'credit-card' 
                          ? 'border-secondary bg-secondary/5' 
                          : 'border-border'
                      }`}
                    >
                      <CreditCard size={20} className={paymentMethod === 'credit-card' ? 'text-secondary' : ''} />
                      <span className="mt-1">Credit Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-3 border rounded-md flex flex-col items-center justify-center text-sm ${
                        paymentMethod === 'paypal' 
                          ? 'border-secondary bg-secondary/5' 
                          : 'border-border'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                        className={paymentMethod === 'paypal' ? 'text-secondary' : ''}>
                        <path d="M7 11l4-7" /><path d="M11 4h4c2.5 0 3.5 1.5 3 4" />
                        <path d="M14 8h3.5c2.5 0 3.5 1.5 3 4" /><path d="M19 12h-6.5a2 2 0 0 0-2 2v6" />
                        <path d="M7 15h3.5c1.5 0 4.5 -.5 5.5 -3" />
                      </svg>
                      <span className="mt-1">PayPal</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank-transfer')}
                      className={`p-3 border rounded-md flex flex-col items-center justify-center text-sm ${
                        paymentMethod === 'bank-transfer' 
                          ? 'border-secondary bg-secondary/5' 
                          : 'border-border'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                        className={paymentMethod === 'bank-transfer' ? 'text-secondary' : ''}>
                        <path d="m2 10 10-7 10 7v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      </svg>
                      <span className="mt-1">Bank</span>
                    </button>
                  </div>

                  {paymentMethod === 'credit-card' && (
                    <div className="space-y-3 mt-3">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input 
                          id="cardNumber" 
                          {...form.register('cardNumber', { required: true })}
                          placeholder="4242 4242 4242 4242"
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input 
                            id="expiryDate" 
                            {...form.register('expiryDate', { required: true })}
                            placeholder="MM/YY"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input 
                            id="cvv" 
                            {...form.register('cvv', { required: true })}
                            placeholder="123"
                            className="mt-1"
                            type="password"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping:</span>
                    <span>{formatCurrency(10)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                    <span>Total:</span>
                    <span>{formatCurrency(totalPrice + 10)}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button 
                    type="submit" 
                    fullWidth 
                    className="bg-secondary hover:bg-secondary/90 text-white"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Pay ${formatCurrency(totalPrice + 10)}`}
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    fullWidth 
                    onClick={handleBackToCart}
                  >
                    Back to Cart
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Order Confirmation */}
          {checkoutStep === 'confirmation' && (
            <div className="flex-grow overflow-auto p-4">
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Thank You for Your Order!</h3>
                <p className="text-muted-foreground mb-6">Your order has been successfully placed.</p>
                
                <div className="bg-purple/5 p-4 rounded-md mb-6 text-left">
                  <h4 className="font-medium mb-2">Order Summary</h4>
                  <div className="space-y-2">
                    {items.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.name} x {item.quantity}</span>
                        <span>{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))}
                    <div className="border-t border-border pt-2 mt-2">
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>{formatCurrency(10)}</span>
                      </div>
                      <div className="flex justify-between font-bold mt-2">
                        <span>Total:</span>
                        <span>{formatCurrency(totalPrice + 10)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleFinishOrder}
                  fullWidth 
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Done
                </Button>
              </div>
            </div>
          )}

          {/* Cart Footer */}
          {checkoutStep === 'cart' && items.length > 0 && (
            <div className="p-4 border-t border-border">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total:</span>
                <span className="font-bold text-lg text-secondary">{formatCurrency(totalPrice)}</span>
              </div>
              <Button 
                fullWidth 
                className="bg-secondary hover:bg-secondary/90 text-white"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
              <button 
                onClick={toggleCart}
                className="w-full text-center mt-3 py-2 text-muted-foreground hover:text-primary transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop - only visible when cart is open */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={toggleCart}
        />
      )}
    </>
  );
};

export default Cart;
