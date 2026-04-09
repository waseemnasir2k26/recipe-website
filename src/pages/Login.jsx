import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = auth.login(loginEmail, loginPassword);
      if (success) {
        if (loginEmail === 'admin@recipes.com' && loginPassword === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (registerPassword !== registerConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (registerPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const success = auth.login(registerEmail, registerPassword);
      if (success) {
        navigate('/');
      }
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Left Decorative Panel — Desktop Only */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=1600&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal/80 via-charcoal/60 to-terracotta/40" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 no-underline">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
              <ChefHat className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-white tracking-tight block leading-tight">
                Savory & Sweet
              </span>
              <span className="text-[10px] text-white/60 uppercase tracking-widest">
                Recipe Studio
              </span>
            </div>
          </Link>

          {/* Center text */}
          <div className="space-y-6">
            <h1 className="text-5xl xl:text-6xl font-display font-bold text-white leading-tight">
              Welcome Back,
              <br />
              <span className="text-gold-light">Chef!</span>
            </h1>
            <p className="text-lg text-white/70 max-w-md leading-relaxed">
              Unlock hundreds of chef-crafted recipes, from quick weeknight
              dinners to show-stopping desserts. Your kitchen adventure starts
              here.
            </p>
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-1">
                  Recipes
                </div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50k+</div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-1">
                  Home Cooks
                </div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">4.9</div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-1">
                  Avg Rating
                </div>
              </div>
            </div>
          </div>

          {/* Bottom quote */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <p className="text-white/80 italic text-sm leading-relaxed">
              "These recipes transformed my weeknight cooking. My family thinks I
              went to culinary school!"
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-10 h-10 rounded-full bg-terracotta/80 flex items-center justify-center text-white text-sm font-bold">
                SM
              </div>
              <div>
                <div className="text-white text-sm font-medium">Sarah M.</div>
                <div className="text-white/50 text-xs">
                  Home Cook &middot; 5-star review
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
            <div className="w-12 h-12 bg-terracotta rounded-xl flex items-center justify-center">
              <ChefHat className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-charcoal tracking-tight block leading-tight">
                Savory & Sweet
              </span>
              <span className="text-[10px] text-warm-gray uppercase tracking-widest">
                Recipe Studio
              </span>
            </div>
          </div>

          {/* Tab Toggle */}
          <div className="flex bg-cream-dark rounded-xl p-1 mb-8">
            <button
              onClick={() => {
                setActiveTab('login');
                setError('');
              }}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-white text-charcoal shadow-sm'
                  : 'text-warm-gray hover:text-charcoal'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setActiveTab('register');
                setError('');
              }}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-white text-charcoal shadow-sm'
                  : 'text-warm-gray hover:text-charcoal'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
              {activeTab === 'login' ? 'Welcome back' : 'Join the kitchen'}
            </h2>
            <p className="text-warm-gray mt-2 text-sm">
              {activeTab === 'login'
                ? 'Sign in to access your recipe collection'
                : 'Create an account to start collecting recipes'}
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-red-500 text-xs font-bold">!</span>
              </div>
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="chef@example.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-light-gray rounded-xl text-charcoal placeholder-warm-gray/50 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all duration-200 text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3.5 bg-white border border-light-gray rounded-xl text-charcoal placeholder-warm-gray/50 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all duration-200 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray hover:text-charcoal transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-light-gray text-terracotta focus:ring-terracotta/30 cursor-pointer"
                  />
                  <span className="text-sm text-warm-gray group-hover:text-charcoal transition-colors">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm text-terracotta hover:text-terracotta-dark font-medium transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-terracotta hover:bg-terracotta-dark text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-terracotta/20 hover:shadow-terracotta/30"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Full name
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    required
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="Gordon Ramsay"
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-light-gray rounded-xl text-charcoal placeholder-warm-gray/50 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all duration-200 text-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="chef@example.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-light-gray rounded-xl text-charcoal placeholder-warm-gray/50 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all duration-200 text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full pl-12 pr-12 py-3.5 bg-white border border-light-gray rounded-xl text-charcoal placeholder-warm-gray/50 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all duration-200 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray hover:text-charcoal transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Confirm password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray pointer-events-none" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    placeholder="Repeat your password"
                    className="w-full pl-12 pr-12 py-3.5 bg-white border border-light-gray rounded-xl text-charcoal placeholder-warm-gray/50 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all duration-200 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray hover:text-charcoal transition-colors cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-terracotta hover:bg-terracotta-dark text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-terracotta/20 hover:shadow-terracotta/30"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-light-gray" />
            <span className="text-xs text-warm-gray uppercase tracking-wider font-medium">
              or continue with
            </span>
            <div className="flex-1 h-px bg-light-gray" />
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 py-3 px-4 bg-white border border-light-gray rounded-xl hover:bg-cream-dark transition-all duration-200 group cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-sm font-medium text-charcoal">Google</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2.5 py-3 px-4 bg-white border border-light-gray rounded-xl hover:bg-cream-dark transition-all duration-200 group cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <span className="text-sm font-medium text-charcoal">Apple</span>
            </button>
          </div>

          {/* Admin Hint */}
          <div className="mt-8 p-4 bg-forest/5 border border-forest/15 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-forest/10 flex items-center justify-center flex-shrink-0">
                <ChefHat className="w-4 h-4 text-forest" />
              </div>
              <div>
                <p className="text-xs font-semibold text-forest mb-1">
                  Demo Admin Access
                </p>
                <p className="text-xs text-warm-gray leading-relaxed">
                  <span className="font-mono bg-cream-dark px-1.5 py-0.5 rounded text-charcoal">
                    admin@recipes.com
                  </span>{' '}
                  /{' '}
                  <span className="font-mono bg-cream-dark px-1.5 py-0.5 rounded text-charcoal">
                    admin
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Footer text */}
          <p className="text-center text-xs text-warm-gray mt-8">
            By continuing, you agree to our{' '}
            <button className="text-terracotta hover:text-terracotta-dark underline underline-offset-2 cursor-pointer">
              Terms of Service
            </button>{' '}
            and{' '}
            <button className="text-terracotta hover:text-terracotta-dark underline underline-offset-2 cursor-pointer">
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

