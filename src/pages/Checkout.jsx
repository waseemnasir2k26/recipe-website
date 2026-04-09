import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, Shield, ShoppingBag, ChevronLeft, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, discount, total, clearCart } = useCart();
  const auth = useAuth();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form state (demo only)
  const [form, setForm] = useState({
    email: auth.user?.email || '',
    name: auth.user?.name || '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardholderName: '',
    country: 'US',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + ' / ' + digits.slice(2);
    return digits;
  };

  const handleCompletePurchase = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1000));
    auth.addPurchase(items);
    clearCart();
    navigate('/order-confirmation');
  };

  // Empty cart state
  if (items.length === 0 && !isProcessing) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-cream-dark rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-warm-gray" />
          </div>
          <h2 className="text-2xl font-display font-bold text-charcoal mb-3">
            Your cart is empty
          </h2>
          <p className="text-warm-gray mb-8 leading-relaxed">
            Looks like you haven't added any recipes yet. Browse our collection and
            find something delicious!
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="bg-terracotta hover:bg-terracotta-dark text-white font-semibold px-8 py-3.5 rounded-xl border-0 cursor-pointer transition-colors inline-flex items-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            Browse Recipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white border-b border-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-warm-gray hover:text-charcoal transition-colors bg-transparent border-0 cursor-pointer text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-2 text-center lg:text-left">
          Checkout
        </h1>
        <p className="text-warm-gray mb-10 text-center lg:text-left">
          Complete your purchase securely
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left Column - Checkout Form */}
          <div className="lg:col-span-3 space-y-8">
            {/* Contact Information */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-light-gray/50">
              <h2 className="text-lg font-bold text-charcoal mb-5 flex items-center gap-2">
                <div className="w-7 h-7 bg-terracotta text-white rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </div>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-charcoal mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-cream/50 rounded-xl border border-light-gray text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all"
                  />
                  <p className="text-xs text-warm-gray mt-1.5">
                    Receipt and download links will be sent here
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-charcoal mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-cream/50 rounded-xl border border-light-gray text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all"
                  />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-light-gray/50">
              <h2 className="text-lg font-bold text-charcoal mb-5 flex items-center gap-2">
                <div className="w-7 h-7 bg-terracotta text-white rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </div>
                Payment Method
              </h2>

              {/* Payment Toggle */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center justify-center gap-2.5 px-4 py-4 rounded-xl border-2 cursor-pointer transition-all font-medium text-sm ${
                    paymentMethod === 'card'
                      ? 'border-terracotta bg-terracotta/5 text-terracotta'
                      : 'border-light-gray bg-white text-warm-gray hover:border-warm-gray/50'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  Credit Card
                  {paymentMethod === 'card' && (
                    <Check className="w-4 h-4 ml-auto" />
                  )}
                </button>
                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`flex items-center justify-center gap-2.5 px-4 py-4 rounded-xl border-2 cursor-pointer transition-all font-medium text-sm ${
                    paymentMethod === 'paypal'
                      ? 'border-terracotta bg-terracotta/5 text-terracotta'
                      : 'border-light-gray bg-white text-warm-gray hover:border-warm-gray/50'
                  }`}
                >
                  <span className="font-bold text-base tracking-tight">Pay</span>
                  <span className="font-bold text-base tracking-tight text-blue-600">Pal</span>
                  {paymentMethod === 'paypal' && (
                    <Check className="w-4 h-4 ml-auto" />
                  )}
                </button>
              </div>

              {/* Credit Card Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={form.cardNumber}
                        onChange={(e) =>
                          updateField('cardNumber', formatCardNumber(e.target.value))
                        }
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full pl-4 pr-28 py-3 bg-cream/50 rounded-xl border border-light-gray text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all tracking-wider"
                      />
                      {/* Card Brand Icons */}
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                        <span className="text-xs font-bold bg-blue-700 text-white px-1.5 py-0.5 rounded">VISA</span>
                        <span className="text-xs font-bold text-white px-1.5 py-0.5 rounded" style={{ background: 'linear-gradient(135deg, #EB001B 50%, #F79E1B 50%)' }}>MC</span>
                        <span className="text-xs font-bold bg-blue-500 text-white px-1.5 py-0.5 rounded">AMEX</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={form.expiry}
                        onChange={(e) =>
                          updateField('expiry', formatExpiry(e.target.value))
                        }
                        placeholder="MM / YY"
                        maxLength={7}
                        className="w-full px-4 py-3 bg-cream/50 rounded-xl border border-light-gray text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all tracking-wider"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">
                        CVV
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={form.cvv}
                          onChange={(e) =>
                            updateField(
                              'cvv',
                              e.target.value.replace(/\D/g, '').slice(0, 4)
                            )
                          }
                          placeholder="123"
                          maxLength={4}
                          className="w-full px-4 py-3 bg-cream/50 rounded-xl border border-light-gray text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all tracking-wider"
                        />
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray/50" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={form.cardholderName}
                      onChange={(e) => updateField('cardholderName', e.target.value)}
                      placeholder="Name on card"
                      className="w-full px-4 py-3 bg-cream/50 rounded-xl border border-light-gray text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all"
                    />
                  </div>
                </div>
              )}

              {/* PayPal Section */}
              {paymentMethod === 'paypal' && (
                <div className="text-center py-6">
                  <button className="w-full max-w-sm mx-auto flex items-center justify-center gap-3 bg-[#FFC439] hover:bg-[#f0b72e] text-[#003087] font-bold text-lg py-4 px-8 rounded-full border-0 cursor-pointer transition-colors shadow-md hover:shadow-lg">
                    <span className="tracking-tight">Pay with</span>
                    <span className="text-[#003087] font-extrabold">Pay</span>
                    <span className="text-[#0070BA] font-extrabold -ml-1.5">Pal</span>
                  </button>
                  <p className="text-sm text-warm-gray mt-4">
                    You'll be redirected to PayPal to complete your payment securely.
                  </p>
                </div>
              )}
            </section>

            {/* Billing Address */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-light-gray/50">
              <h2 className="text-lg font-bold text-charcoal mb-5 flex items-center gap-2">
                <div className="w-7 h-7 bg-terracotta text-white rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </div>
                Billing Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">
                    Country
                  </label>
                  <select
                    value={form.country}
                    onChange={(e) => updateField('country', e.target.value)}
                    className="w-full px-4 py-3 bg-cream/50 rounded-xl border border-light-gray text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all cursor-pointer"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="IT">Italy</option>
                    <option value="ES">Spain</option>
                    <option value="JP">Japan</option>
                    <option value="BR">Brazil</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    placeholder="123 Main Street"
                    className="w-full px-4 py-3 bg-cream/50 rounded-xl border border-light-gray text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      placeholder="New York"
                      className="w-full px-4 py-3 bg-cream/50 rounded-xl border border-light-gray text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      State
                    </label>
                    <input
                      type="text"
                      value={form.state}
                      onChange={(e) => updateField('state', e.target.value)}
                      placeholder="NY"
                      className="w-full px-4 py-3 bg-cream/50 rounded-xl border border-light-gray text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={form.zip}
                      onChange={(e) =>
                        updateField(
                          'zip',
                          e.target.value.replace(/\D/g, '').slice(0, 5)
                        )
                      }
                      placeholder="10001"
                      maxLength={5}
                      className="w-full px-4 py-3 bg-cream/50 rounded-xl border border-light-gray text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Security Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 text-center border border-light-gray/50 shadow-sm">
                <Shield className="w-6 h-6 text-forest mx-auto mb-2" />
                <p className="text-xs font-semibold text-charcoal">256-bit SSL</p>
                <p className="text-xs text-warm-gray">Encryption</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center border border-light-gray/50 shadow-sm">
                <Lock className="w-6 h-6 text-forest mx-auto mb-2" />
                <p className="text-xs font-semibold text-charcoal">Secure</p>
                <p className="text-xs text-warm-gray">Payment</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center border border-light-gray/50 shadow-sm">
                <Check className="w-6 h-6 text-forest mx-auto mb-2" />
                <p className="text-xs font-semibold text-charcoal">Money-back</p>
                <p className="text-xs text-warm-gray">Guarantee</p>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary (Sticky) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-light-gray/50 lg:sticky lg:top-8">
              <h2 className="text-lg font-bold text-charcoal mb-5 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-terracotta" />
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.type}`}
                    className="flex items-center gap-3"
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-cream-dark">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="w-6 h-6 text-warm-gray/40" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-charcoal truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-warm-gray">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-charcoal flex-shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-light-gray my-5" />

              {/* Totals */}
              <div className="space-y-2.5 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray">Subtotal</span>
                  <span className="text-charcoal font-medium">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-forest font-medium">
                      Discount (10%)
                    </span>
                    <span className="text-forest font-medium">
                      -${discount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="border-t border-light-gray pt-2.5">
                  <div className="flex justify-between">
                    <span className="text-base font-bold text-charcoal">
                      Total
                    </span>
                    <span className="text-xl font-bold text-terracotta">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Complete Purchase Button */}
              <button
                onClick={handleCompletePurchase}
                disabled={isProcessing}
                className={`w-full flex items-center justify-center gap-2.5 text-white font-bold text-base py-4 px-6 rounded-xl border-0 cursor-pointer transition-all shadow-lg ${
                  isProcessing
                    ? 'bg-warm-gray cursor-not-allowed'
                    : 'bg-terracotta hover:bg-terracotta-dark hover:shadow-xl active:scale-[0.98] transform shadow-terracotta/25'
                }`}
              >
                {isProcessing ? (
                  <>
                    <svg
                      className="animate-spin w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Complete Purchase
                  </>
                )}
              </button>

              {/* Guarantee Text */}
              <div className="mt-4 text-center">
                <p className="text-xs text-warm-gray flex items-center justify-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-forest" />
                  Instant PDF delivery to your email
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
