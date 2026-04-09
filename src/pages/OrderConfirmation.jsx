import { Link } from 'react-router-dom';
import { CheckCircle, Download, Mail, ArrowRight, PartyPopper } from 'lucide-react';

export default function OrderConfirmation() {
  const orderNumber = `#ORD-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon with pulse animation */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="absolute w-28 h-28 bg-forest/10 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
          <div className="absolute w-24 h-24 bg-forest/15 rounded-full animate-pulse" />
          <div className="relative w-20 h-20 bg-forest rounded-full flex items-center justify-center shadow-lg shadow-forest/25">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Confetti Icon */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <PartyPopper className="w-6 h-6 text-gold" />
          <span className="text-sm font-semibold text-gold uppercase tracking-wider">
            Success
          </span>
          <PartyPopper className="w-6 h-6 text-gold -scale-x-100" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-3">
          Order Confirmed!
        </h1>
        <p className="text-warm-gray text-lg mb-6 leading-relaxed">
          Your recipes are ready to download
        </p>

        {/* Order Number Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-light-gray/50 mb-6">
          <p className="text-sm text-warm-gray mb-1">Order Number</p>
          <p className="text-2xl font-bold text-charcoal tracking-wider font-mono">
            {orderNumber}
          </p>
        </div>

        {/* Email Notice */}
        <div className="flex items-center justify-center gap-2.5 bg-forest-light/30 text-forest rounded-xl px-5 py-3.5 mb-8">
          <Mail className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">
            We've sent a confirmation and download links to your email
          </p>
        </div>

        {/* Download Button */}
        <Link
          to="/downloads"
          className="inline-flex items-center justify-center gap-2.5 bg-terracotta hover:bg-terracotta-dark text-white font-bold text-base py-4 px-10 rounded-xl no-underline transition-all shadow-lg shadow-terracotta/25 hover:shadow-xl hover:shadow-terracotta/30 active:scale-[0.98] transform w-full sm:w-auto"
        >
          <Download className="w-5 h-5" />
          Download Your Recipes
        </Link>

        {/* Divider */}
        <div className="flex items-center gap-4 my-10">
          <div className="flex-1 border-t border-light-gray" />
          <span className="text-xs font-semibold text-warm-gray uppercase tracking-wider">
            What's Next?
          </span>
          <div className="flex-1 border-t border-light-gray" />
        </div>

        {/* What's Next Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-xl p-5 border border-light-gray/50 shadow-sm">
            <div className="w-10 h-10 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Download className="w-5 h-5 text-terracotta" />
            </div>
            <div className="w-6 h-6 bg-terracotta text-white rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-2">
              1
            </div>
            <p className="text-sm font-semibold text-charcoal">Download PDFs</p>
            <p className="text-xs text-warm-gray mt-1">
              Get your recipe files
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-light-gray/50 shadow-sm">
            <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
            </div>
            <div className="w-6 h-6 bg-terracotta text-white rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-2">
              2
            </div>
            <p className="text-sm font-semibold text-charcoal">Print or Save</p>
            <p className="text-xs text-warm-gray mt-1">
              Keep them handy
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-light-gray/50 shadow-sm">
            <div className="w-10 h-10 bg-gold/15 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">&#127859;</span>
            </div>
            <div className="w-6 h-6 bg-terracotta text-white rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-2">
              3
            </div>
            <p className="text-sm font-semibold text-charcoal">Start Cooking!</p>
            <p className="text-xs text-warm-gray mt-1">
              Enjoy delicious meals
            </p>
          </div>
        </div>

        {/* Continue Shopping */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-terracotta hover:text-terracotta-dark font-semibold no-underline transition-colors group"
        >
          Continue Shopping
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
