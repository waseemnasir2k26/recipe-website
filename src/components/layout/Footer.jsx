import { Link } from 'react-router-dom';
import { ChefHat, Mail, Globe, MessageCircle, Video } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-terracotta rounded-xl flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Savory & Sweet</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Premium recipes crafted with love. From quick weeknight dinners to show-stopping desserts.
            </p>
            <div className="flex gap-3">
              {[Globe, MessageCircle, Video].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-terracotta transition-colors">
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Shop</h4>
            <div className="space-y-2.5">
              {[
                { to: '/shop', label: 'All Recipes' },
                { to: '/bundles', label: 'Bundles' },
                { to: '/subscription', label: 'Subscribe' },
                { to: '/shop?category=desserts', label: 'Desserts' },
              ].map(link => (
                <Link key={link.to} to={link.to} className="block text-sm text-white/60 hover:text-white no-underline transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Support</h4>
            <div className="space-y-2.5">
              {['FAQ', 'Contact Us', 'Refund Policy', 'Terms of Service', 'Privacy Policy'].map(item => (
                <a key={item} href="#" className="block text-sm text-white/60 hover:text-white no-underline transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Get Free Recipes</h4>
            <p className="text-sm text-white/60 mb-4">
              Join 10,000+ home cooks. Get a free recipe every Friday.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder-white/40 focus:outline-none focus:border-terracotta"
              />
              <button className="px-4 py-2.5 bg-terracotta hover:bg-terracotta-light text-white text-sm font-medium rounded-lg cursor-pointer border-0 transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; 2026 Savory & Sweet Recipe Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <img src="https://img.icons8.com/color/32/visa.png" alt="Visa" className="h-6 opacity-60" />
            <img src="https://img.icons8.com/color/32/mastercard.png" alt="Mastercard" className="h-6 opacity-60" />
            <img src="https://img.icons8.com/color/32/paypal.png" alt="PayPal" className="h-6 opacity-60" />
            <img src="https://img.icons8.com/color/32/stripe.png" alt="Stripe" className="h-6 opacity-60" />
          </div>
        </div>
      </div>
    </footer>
  );
}
