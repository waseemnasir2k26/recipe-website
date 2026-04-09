import { useParams, Link } from 'react-router-dom';
import { Star, Clock, Users, ChefHat, ShoppingCart, ArrowLeft, Download, Heart, Share2, BookOpen, Lock } from 'lucide-react';
import { recipes } from '../data/recipes';
import { useCart } from '../context/CartContext';

const difficultyColor = {
  Easy: 'bg-forest text-white',
  Medium: 'bg-gold text-charcoal',
  Hard: 'bg-terracotta text-white',
};

const includedItems = [
  'Step-by-step instructions with photos',
  'Complete ingredient list with measurements',
  "Chef's tips & variations",
  'Nutritional information',
  'Printable format',
];

export default function RecipeDetail() {
  const { id } = useParams();
  const { addItem } = useCart();

  const recipe = recipes.find((r) => r.id === Number(id));

  if (!recipe) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-4">
        <BookOpen className="w-16 h-16 text-warm-gray mb-4" />
        <h1 className="text-3xl font-display font-bold text-charcoal mb-2">Recipe Not Found</h1>
        <p className="text-warm-gray mb-6">Sorry, we couldn't find the recipe you're looking for.</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-terracotta text-white px-6 py-3 rounded-xl font-semibold hover:bg-terracotta-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Recipes
        </Link>
      </div>
    );
  }

  const relatedRecipes = recipes
    .filter((r) => r.category === recipe.category && r.id !== recipe.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addItem({
      id: recipe.id,
      type: 'recipe',
      title: recipe.title,
      price: recipe.price,
      image: recipe.image,
    });
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-warm-gray hover:text-terracotta transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Recipes
        </Link>
      </div>

      {/* Hero Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Left - Image */}
          <div className="relative">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-[350px] sm:h-[450px] object-cover rounded-2xl shadow-xl"
            />
            <span
              className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${difficultyColor[recipe.difficulty] || 'bg-warm-gray text-white'}`}
            >
              {recipe.difficulty}
            </span>
            {recipe.isPremium && (
              <span className="absolute top-4 right-4 bg-gold text-charcoal px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                Premium
              </span>
            )}
          </div>

          {/* Right - Details */}
          <div className="flex flex-col justify-center">
            {/* Category Tag */}
            <span className="inline-block w-fit bg-cream-dark text-warm-gray px-3 py-1 rounded-full text-sm font-medium capitalize mb-3">
              {recipe.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-charcoal mb-3 leading-tight">
              {recipe.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(recipe.rating)
                        ? 'text-gold fill-gold'
                        : i < recipe.rating
                          ? 'text-gold fill-gold/50'
                          : 'text-light-gray'
                    }`}
                  />
                ))}
              </div>
              <span className="text-charcoal font-semibold">{recipe.rating}</span>
              <span className="text-warm-gray">({recipe.reviews} reviews)</span>
            </div>

            {/* Description */}
            <p className="text-warm-gray text-lg leading-relaxed mb-6">
              {recipe.description}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2 bg-cream-dark rounded-xl px-3 py-3">
                <Clock className="w-5 h-5 text-terracotta" />
                <div>
                  <p className="text-xs text-warm-gray">Prep</p>
                  <p className="text-sm font-semibold text-charcoal">{recipe.prepTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-cream-dark rounded-xl px-3 py-3">
                <Clock className="w-5 h-5 text-forest" />
                <div>
                  <p className="text-xs text-warm-gray">Cook</p>
                  <p className="text-sm font-semibold text-charcoal">{recipe.cookTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-cream-dark rounded-xl px-3 py-3">
                <Users className="w-5 h-5 text-gold" />
                <div>
                  <p className="text-xs text-warm-gray">Servings</p>
                  <p className="text-sm font-semibold text-charcoal">{recipe.servings}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-cream-dark rounded-xl px-3 py-3">
                <ChefHat className="w-5 h-5 text-warm-gray" />
                <div>
                  <p className="text-xs text-warm-gray">Difficulty</p>
                  <p className="text-sm font-semibold text-charcoal">{recipe.difficulty}</p>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-terracotta">${recipe.price.toFixed(2)}</span>
              <span className="text-warm-gray text-sm flex items-center gap-1">
                <Download className="w-4 h-4" />
                PDF Download
              </span>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl cursor-pointer mb-4"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>

            {/* Secondary Buttons */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-light-gray text-warm-gray hover:text-terracotta hover:border-terracotta transition-colors cursor-pointer">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-medium">Wishlist</span>
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-light-gray text-warm-gray hover:text-forest hover:border-forest transition-colors cursor-pointer">
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-light-gray p-8">
          <h2 className="text-2xl font-display font-bold text-charcoal mb-6 flex items-center gap-2">
            <Download className="w-6 h-6 text-terracotta" />
            What's Included in Your PDF
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {includedItems.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-forest/10 text-forest rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-charcoal font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-2xl shadow-sm border border-light-gray p-8 relative overflow-hidden">
          <h2 className="text-2xl font-display font-bold text-charcoal mb-6">
            Ingredients Preview
          </h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {recipe.ingredients.map((ingredient) => (
              <span
                key={ingredient}
                className="bg-cream-dark text-charcoal px-4 py-2 rounded-full text-sm font-medium border border-light-gray"
              >
                {ingredient}
              </span>
            ))}
          </div>
          {/* Lock Overlay */}
          <div className="bg-gradient-to-t from-white via-white/90 to-transparent absolute bottom-0 left-0 right-0 h-24 flex items-end justify-center pb-4">
            <span className="inline-flex items-center gap-2 text-warm-gray text-sm font-medium bg-cream-dark px-4 py-2 rounded-full">
              <Lock className="w-4 h-4" />
              Full measurements included in PDF
            </span>
          </div>
        </div>
      </section>

      {/* Related Recipes */}
      {relatedRecipes.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-2xl font-display font-bold text-charcoal mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedRecipes.map((related) => (
              <Link
                key={related.id}
                to={`/recipe/${related.id}`}
                className="group bg-white rounded-2xl shadow-sm border border-light-gray overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-charcoal text-lg mb-2 group-hover:text-terracotta transition-colors">
                    {related.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-terracotta font-bold text-lg">
                      ${related.price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      <span className="text-sm text-charcoal font-medium">{related.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
