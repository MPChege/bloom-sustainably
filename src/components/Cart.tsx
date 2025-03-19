
import React from 'react';
import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import Button from './Button';

const Cart: React.FC = () => {
  const { 
    items, 
    isCartOpen, 
    toggleCart, 
    removeItem, 
    updateQuantity, 
    totalItems,
    totalPrice
  } = useCart();

  return (
    <>
      {/* Cart Icon in the header */}
      <button 
        onClick={toggleCart} 
        className="cart-icon flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
        aria-label="Shopping Cart"
      >
        <ShoppingBag className="w-5 h-5 text-primary" />
        {totalItems > 0 && (
          <span className="cart-count">{totalItems}</span>
        )}
      </button>

      {/* Cart Drawer */}
      <div className={`cart-drawer ${isCartOpen ? 'open' : 'closed'}`}>
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-medium">Your Cart ({totalItems})</h2>
            <button 
              onClick={toggleCart}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
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
                  <div key={item.id} className="cart-item">
                    <div className="w-16 h-16 rounded overflow-hidden mr-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="product-price mt-1">{formatCurrency(item.price)}</p>
                      <div className="flex items-center mt-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
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

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="p-4 border-t border-border">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total:</span>
                <span className="font-bold text-lg">{formatCurrency(totalPrice)}</span>
              </div>
              <Button 
                fullWidth 
                className="bg-secondary hover:bg-secondary/90 text-white"
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
