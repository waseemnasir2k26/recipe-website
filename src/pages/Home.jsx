import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  ArrowRight,
  ChefHat,
  Download,
  Clock,
  Users,
  Sparkles,
  Crown,
  BookOpen,
  Shield,
} from 'lucide-react';
import { recipes, bundles, testimonials, subscriptionPlan } from '../data/recipes';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { addItem } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featuredRecipes = recipes.filter((r) => r.isFeatured).slice(0, 4);
  const featuredBundles = bundles.slice(0, 2);
  const topFeatures = subscriptionPlan.features.slice(0, 4);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleAddRecipe = (recipe) => {
    addItem({
      id: recipe.id,
      type: 'recipe',
      title: recipe.title,
      price: recipe.price,
      image: recipe.image,
    });
  };

  const handleAddBundle = (bundle) => {
    addItem({
      id: bundle.id,
      type: 'bundle',
      title: bundle.title,
      price: bundle.price,
      image: bundle.image,
    });
  };

  return (
    <div className="min-h-screen">
      {/* ========== HERO SECTION ========== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&h=600&fit=crop"
            alt="Beautiful food spread"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/60 to-charcoal/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-terracotta/20 border border-terracotta/30 text-terracotta-light rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              Premium Digital Recipe PDFs
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6 text-shadow">
              Recipes Worth
              <br />
              <span className="text-gold">Savoring</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/80 mb-10 leading-relaxed max-w-lg">
              Beautifully crafted, chef-tested recipe PDFs you can download instantly.
              Elevate every meal from ordinary to extraordinary.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-terracotta hover:bg-terracotta-dark text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Browse Recipes
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/bundles"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white/30 hover:border-white/60 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
              >
                View Bundles
              </Link>
            </div>

            <div className="flex flex-wrap gap-8 sm:gap-12">
              {[
                { value: '200+', label: 'Recipes' },
                { value: '50k+', label: 'Happy Cooks' },
                { value: '4.9', label: 'Avg Rating' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-white/60 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURED RECIPES ========== */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-1 bg-terracotta/10 text-terracotta text-sm font-semibold rounded-full mb-4">
              Fan Favorites
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal">
              Our Most Loved Recipes
            </h2>
            <p className="mt-4 text-warm-gray max-w-xl mx-auto text-lg">
              Hand-picked by our community. These are the recipes people come back to again and again.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-charcoal text-xs font-semibold rounded-full capitalize">
                    {recipe.category}
                  </span>
                  {recipe.isPremium && (
                    <span className="absolute top-3 right-3 px-3 py-1 bg-gold text-white text-xs font-semibold rounded-full flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      Premium
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-charcoal group-hover:text-terracotta transition-colors duration-200">
                    {recipe.title}
                  </h3>
                  <p className="mt-2 text-warm-gray text-sm line-clamp-2 leading-relaxed">
                    {recipe.description}
                  </p>

                  <div className="flex items-center gap-1 mt-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(recipe.rating)
                            ? 'text-gold fill-gold'
                            : 'text-light-gray'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-warm-gray ml-1">
                      ({recipe.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-light-gray">
                    <span className="text-xl font-bold text-terracotta">
                      ${recipe.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleAddRecipe(recipe)}
                      className="px-4 py-2 bg-terracotta hover:bg-terracotta-dark text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-terracotta hover:text-terracotta-dark font-semibold transition-colors duration-200"
            >
              View All Recipes
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== BUNDLE SHOWCASE ========== */}
      <section className="py-16 sm:py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-1 bg-forest/10 text-forest text-sm font-semibold rounded-full mb-4">
              Better Together
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal">
              Save More with Bundles
            </h2>
            <p className="mt-4 text-warm-gray max-w-xl mx-auto text-lg">
              Curated recipe collections at unbeatable prices. Why buy one when you can have five?
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredBundles.map((bundle) => (
              <div
                key={bundle.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row"
              >
                <div className="relative sm:w-2/5 overflow-hidden">
                  <img
                    src={bundle.image}
                    alt={bundle.title}
                    className="w-full h-56 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-forest text-white text-xs font-bold rounded-full">
                    {bundle.tag}
                  </span>
                </div>

                <div className="sm:w-3/5 p-6 flex flex-col justify-center">
                  <h3 className="font-display font-bold text-xl text-charcoal group-hover:text-forest transition-colors duration-200">
                    {bundle.title}
                  </h3>
                  <p className="mt-2 text-warm-gray text-sm leading-relaxed">
                    {bundle.description}
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-2xl font-bold text-forest">
                      ${bundle.price.toFixed(2)}
                    </span>
                    <span className="text-lg text-warm-gray line-through">
                      ${bundle.originalPrice.toFixed(2)}
                    </span>
                    <span className="px-2 py-0.5 bg-forest/10 text-forest text-xs font-bold rounded">
                      Save ${(bundle.originalPrice - bundle.price).toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddBundle(bundle)}
                    className="mt-5 w-full sm:w-auto px-6 py-2.5 bg-forest hover:bg-forest-light text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer"
                  >
                    Add Bundle to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/bundles"
              className="inline-flex items-center gap-2 text-forest hover:text-forest-light font-semibold transition-colors duration-200"
            >
              See All Bundles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal">
              How It Works
            </h2>
            <p className="mt-4 text-warm-gray max-w-md mx-auto text-lg">
              From browse to table in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: '1',
                icon: BookOpen,
                title: 'Choose Your Recipes',
                description:
                  'Browse our curated collection and pick the recipes that excite you. Individual PDFs or money-saving bundles.',
              },
              {
                step: '2',
                icon: Download,
                title: 'Instant PDF Download',
                description:
                  'Checkout securely and get your beautifully designed recipe PDFs delivered to your inbox in seconds.',
              },
              {
                step: '3',
                icon: ChefHat,
                title: 'Cook & Enjoy',
                description:
                  'Follow the clear, step-by-step instructions and create restaurant-quality meals in your own kitchen.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="text-center bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative inline-flex items-center justify-center w-16 h-16 bg-terracotta/10 rounded-2xl mb-6">
                  <item.icon className="w-8 h-8 text-terracotta" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-terracotta text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-charcoal mb-3">
                  {item.title}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SUBSCRIPTION CTA ========== */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-terracotta via-terracotta-dark to-terracotta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-sm rounded-2xl mb-8">
            <Crown className="w-8 h-8 text-gold-light" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            Get Unlimited Access
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-10">
            One plan. Every recipe. New additions every month. The smartest way to build your collection.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-10">
            {topFeatures.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-left bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3"
              >
                <Shield className="w-5 h-5 text-gold-light flex-shrink-0" />
                <span className="text-white text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <Link
            to="/subscription"
            className="inline-flex items-center gap-2 px-10 py-4 bg-white text-terracotta font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream"
          >
            $9.99/month &mdash; Cancel Anytime
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-1 bg-gold/10 text-gold text-sm font-semibold rounded-full mb-4">
              Loved by Home Cooks
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal">
              What Our Community Says
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-gold fill-gold" />
                  ))}
                </div>

                <p className="text-charcoal leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-5 border-t border-light-gray">
                  <div className="w-10 h-10 bg-terracotta/10 text-terracotta rounded-full flex items-center justify-center font-bold text-sm">
                    {t.avatar}
                  </div>
                  <span className="font-semibold text-charcoal">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== NEWSLETTER ========== */}
      <section className="py-16 sm:py-20 bg-cream-dark">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-terracotta/10 rounded-2xl mb-6">
            <Sparkles className="w-7 h-7 text-terracotta" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal mb-4">
            Get a Free Recipe Every Friday
          </h2>
          <p className="text-warm-gray text-lg mb-8 max-w-md mx-auto">
            Join 15,000+ home cooks. One curated recipe, straight to your inbox. No spam, ever.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-forest/10 text-forest font-semibold rounded-xl">
              <Shield className="w-5 h-5" />
              You&apos;re in! Check your inbox this Friday.
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 bg-white border border-light-gray rounded-xl text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all duration-200"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-terracotta hover:bg-terracotta-dark text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-md cursor-pointer whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-xs text-warm-gray mt-4">
            Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </section>
    </div>
  );
}
