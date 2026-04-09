import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, ChefHat, User, LogIn } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, setIsOpen } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Recipes' },
    { to: '/bundles', label: 'Bundles' },
    { to: '/subscription', label: 'Subscribe' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="w-10 h-10 bg-terracotta rounded-xl flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <span className="text-xl font-bold text-charcoal tracking-tight block leading-tight">Savory & Sweet</span>
              <span className="text-[10px] text-warm-gray uppercase tracking-widest">Recipe Studio</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium no-underline transition-colors ${
                  isActive(link.to)
                    ? 'text-terracotta'
                    : 'text-warm-gray hover:text-charcoal'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-xs font-medium text-white bg-forest px-3 py-1.5 rounded-full no-underline hover:bg-forest-light transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <Link to="/downloads" className="text-sm text-warm-gray hover:text-charcoal no-underline">
                  My Recipes
                </Link>
                <button
                  onClick={logout}
                  className="text-sm text-warm-gray hover:text-terracotta cursor-pointer bg-transparent border-0"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-1.5 text-sm font-medium text-warm-gray hover:text-charcoal no-underline"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            )}

            {/* Cart Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2.5 rounded-xl bg-cream hover:bg-cream-dark transition-colors cursor-pointer border-0"
            >
              <ShoppingCart className="w-5 h-5 text-charcoal" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-terracotta text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 cursor-pointer bg-transparent border-0"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-light-gray">
          <div className="px-4 py-4 space-y-3">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block text-base font-medium no-underline py-2 ${
                  isActive(link.to) ? 'text-terracotta' : 'text-warm-gray'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-light-gray" />
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMobileOpen(false)} className="block text-base text-forest font-medium no-underline py-2">
                    Admin Dashboard
                  </Link>
                )}
                <Link to="/downloads" onClick={() => setMobileOpen(false)} className="block text-base text-warm-gray no-underline py-2">
                  My Recipes
                </Link>
                <button onClick={() => { logout(); setMobileOpen(false); }} className="text-base text-warm-gray bg-transparent border-0 cursor-pointer py-2">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-base text-terracotta font-medium no-underline py-2">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
