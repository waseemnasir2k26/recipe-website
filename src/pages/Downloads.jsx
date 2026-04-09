import { Link } from 'react-router-dom';
import { Download, FileText, Clock, ShoppingBag, BookOpen, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { recipes } from '../data/recipes';

export default function Downloads() {
  const { user, purchases, isSubscriber } = useAuth();

  // Build the list of recipes the user has access to
  const ownedRecipes = isSubscriber
    ? recipes.map((r) => ({
        ...r,
        purchasedAt: null,
      }))
    : purchases
        .map((p) => {
          const recipe = recipes.find((r) => r.id === p.id);
          if (!recipe) return null;
          return { ...recipe, purchasedAt: p.purchasedAt };
        })
        .filter(Boolean);

  const totalOwned = isSubscriber ? recipes.length : purchases.length;
  const totalDownloads = isSubscriber
    ? recipes.length
    : purchases.length;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Subscription';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-to-br from-charcoal via-charcoal to-terracotta-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                  <BookOpen className="w-6 h-6 text-gold-light" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
                    My Recipe Collection
                  </h1>
                </div>
              </div>
              <p className="text-white/60 text-sm max-w-lg">
                {isSubscriber
                  ? 'As an All-Access subscriber, every recipe in our library is yours to enjoy.'
                  : user
                  ? 'Your personally curated collection of chef-crafted recipes, ready to download anytime.'
                  : 'Sign in to view your purchased recipes.'}
              </p>
            </div>

            {/* Quick Stats */}
            {user && (
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    {totalOwned}
                  </div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">
                    Recipes Owned
                  </div>
                </div>
                <div className="w-px h-10 bg-white/15" />
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gold-light">
                    {totalDownloads}
                  </div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">
                    Downloads
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subscriber Banner */}
      {isSubscriber && (
        <div className="bg-gradient-to-r from-forest/10 via-forest/5 to-gold/10 border-b border-forest/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-forest/15 flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 text-forest"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-semibold text-forest">
                  All-Access Subscriber
                </span>
                <span className="text-sm text-warm-gray ml-2">
                  &mdash; You have access to every recipe in our entire library!
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Not logged in */}
        {!user && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-cream-dark flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-warm-gray" />
            </div>
            <h2 className="text-2xl font-display font-bold text-charcoal mb-3">
              Sign in to view your recipes
            </h2>
            <p className="text-warm-gray mb-8 max-w-md mx-auto text-sm leading-relaxed">
              Log in to access your purchased recipes and download them anytime.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-terracotta hover:bg-terracotta-dark text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-terracotta/20 hover:shadow-terracotta/30 no-underline group"
            >
              Sign In
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}

        {/* Logged in but no purchases */}
        {user && ownedRecipes.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-cream-dark flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-warm-gray" />
            </div>
            <h2 className="text-2xl font-display font-bold text-charcoal mb-3">
              No recipes yet
            </h2>
            <p className="text-warm-gray mb-8 max-w-md mx-auto text-sm leading-relaxed">
              Your collection is empty. Browse our recipe shop and add your first
              recipe to get started on your culinary journey.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-terracotta hover:bg-terracotta-dark text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-terracotta/20 hover:shadow-terracotta/30 no-underline group"
            >
              Browse Recipes
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}

        {/* Recipe Grid */}
        {user && ownedRecipes.length > 0 && (
          <>
            {/* Results count */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-warm-gray">
                Showing{' '}
                <span className="font-semibold text-charcoal">
                  {ownedRecipes.length}
                </span>{' '}
                recipe{ownedRecipes.length !== 1 ? 's' : ''} in your collection
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {ownedRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-2xl overflow-hidden border border-light-gray hover:shadow-xl hover:shadow-charcoal/5 transition-all duration-300 group"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Owned badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-forest/90 backdrop-blur-sm text-white text-xs font-semibold rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-3 h-3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Owned
                      </span>
                    </div>

                    {/* Category */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-charcoal text-xs font-medium rounded-lg capitalize">
                        {recipe.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-base font-bold text-charcoal mb-1.5 line-clamp-2 group-hover:text-terracotta transition-colors">
                      {recipe.title}
                    </h3>

                    <p className="text-xs text-warm-gray line-clamp-2 mb-4 leading-relaxed">
                      {recipe.description}
                    </p>

                    {/* Meta row */}
                    <div className="flex items-center gap-3 text-xs text-warm-gray mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {recipe.prepTime}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-light-gray" />
                      <span>{recipe.difficulty}</span>
                      <span className="w-1 h-1 rounded-full bg-light-gray" />
                      <span>{recipe.servings} servings</span>
                    </div>

                    {/* Purchase date */}
                    {recipe.purchasedAt && (
                      <p className="text-[11px] text-warm-gray/70 mb-4 flex items-center gap-1.5">
                        <FileText className="w-3 h-3" />
                        Purchased {formatDate(recipe.purchasedAt)}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-terracotta hover:bg-terracotta-dark text-white text-sm font-semibold rounded-xl transition-all duration-200 no-underline"
                      >
                        <Download className="w-4 h-4" />
                        Download PDF
                      </a>
                      <Link
                        to={`/recipe/${recipe.id}`}
                        className="flex items-center justify-center w-10 h-10 bg-cream-dark hover:bg-light-gray rounded-xl transition-all duration-200 no-underline flex-shrink-0"
                        title="View Recipe"
                      >
                        <BookOpen className="w-4 h-4 text-charcoal" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            {!isSubscriber && (
              <div className="mt-14 bg-gradient-to-br from-cream-dark to-gold/10 rounded-2xl p-8 sm:p-10 border border-light-gray text-center">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-charcoal mb-3">
                  Want access to every recipe?
                </h3>
                <p className="text-warm-gray text-sm mb-6 max-w-lg mx-auto">
                  Upgrade to the All-Access Pass and unlock our entire library of
                  500+ recipes, including new exclusives every month.
                </p>
                <Link
                  to="/subscription"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl transition-all duration-300 no-underline group shadow-lg shadow-gold/20"
                >
                  Unlock All Recipes
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
