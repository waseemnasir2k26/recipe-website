import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal, discount, total } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-light-gray">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-terracotta" />
            <h2 className="text-lg font-bold text-charcoal">Your Cart</h2>
            <span className="text-sm text-warm-gray">({items.length} items)</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-cream rounded-lg cursor-pointer bg-transparent border-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-light-gray mx-auto mb-4" />
              <p className="text-warm-gray font-medium">Your cart is empty</p>
              <p className="text-sm text-warm-gray/70 mt-1">Browse our delicious recipes</p>
              <Link
                to="/shop"
                onClick={() => setIsOpen(false)}
                className="inline-block mt-4 px-6 py-2.5 bg-terracotta text-white text-sm font-medium rounded-lg no-underline hover:bg-terracotta-light transition-colors"
              >
                Shop Recipes
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={`${item.type}-${item.id}`} className="flex gap-3 p-3 bg-cream/50 rounded-xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-charcoal truncate">{item.title}</h4>
                    <p className="text-xs text-warm-gray capitalize">{item.type}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.type, item.quantity - 1)}
                          className="w-6 h-6 rounded-md bg-white border border-light-gray flex items-center justify-center cursor-pointer hover:border-terracotta"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.type, item.quantity + 1)}
                          className="w-6 h-6 rounded-md bg-white border border-light-gray flex items-center justify-center cursor-pointer hover:border-terracotta"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-terracotta">${(item.price * item.quantity).toFixed(2)}</span>
                        <button
                          onClick={() => removeItem(item.id, item.type)}
                          className="p-1 text-warm-gray hover:text-red-500 cursor-pointer bg-transparent border-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-light-gray px-6 py-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-warm-gray">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-forest">10% Bulk Discount</span>
                <span className="font-medium text-forest">-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold pt-2 border-t border-light-gray">
              <span>Total</span>
              <span className="text-terracotta">${total.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3.5 bg-terracotta hover:bg-terracotta-light text-white font-semibold rounded-xl no-underline transition-colors"
            >
              Checkout — ${total.toFixed(2)}
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-sm text-warm-gray hover:text-charcoal cursor-pointer bg-transparent border-0 py-1"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
