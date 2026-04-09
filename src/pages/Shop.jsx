import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Star, ShoppingCart, Filter, ChevronDown, Crown, Clock, Users } from 'lucide-react';
import { recipes, categories } from '../data/recipes';
import { useCart } from '../context/CartContext';

const sortOptions = [
  { value: 'popular', label: 'Popular' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Top Rated' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const { addItem } = useCart();

  const activeCategory = searchParams.get('category') || 'all';

  const handleCategoryChange = (categoryId) => {
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };

  const filteredAndSortedRecipes = useMemo(() => {
    let result = [...recipes];

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter((r) => r.category === activeCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query) ||
          r.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          r.ingredients.some((ing) => ing.toLowerCase().includes(query))
      );
    }

    // Sort
    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const handleAddToCart = (e, recipe) => {
    e.preventDefault();
    e.stopPropagation();
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
      {/* Page Header */}
      <div className="bg-gradient-to-b from-cream-dark to-cream pt-10 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-3">
            Recipe Collection
          </h1>
          <p className="text-warm-gray text-lg mb-2">
            Discover your next favorite dish
          </p>
          <p className="text-sm text-warm-gray/70">
            {recipes.length} chef-crafted recipes and counting
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mt-6 mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes..."
            className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border border-light-gray text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all shadow-sm"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap border-0 cursor-pointer transition-all shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-terracotta text-white shadow-md shadow-terracotta/20'
                  : 'bg-white text-warm-gray hover:bg-cream-dark hover:text-charcoal'
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort + Results Count Bar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <p className="text-sm text-warm-gray">
            Showing{' '}
            <span className="font-semibold text-charcoal">
              {filteredAndSortedRecipes.length}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-charcoal">{recipes.length}</span>{' '}
            recipes
          </p>

          <div className="relative">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-warm-gray" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-light-gray rounded-xl pl-3 pr-8 py-2 text-sm text-charcoal cursor-pointer focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Recipe Grid */}
        {filteredAndSortedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                to={`/recipe/${recipe.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 no-underline border border-light-gray/50 hover:border-terracotta/20 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-[3/2]">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category badge - top left */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-charcoal text-xs font-medium px-3 py-1 rounded-full capitalize">
                    {categories.find((c) => c.id === recipe.category)?.icon}{' '}
                    {recipe.category}
                  </span>

                  {/* Premium badge - top right */}
                  {recipe.isPremium && (
                    <span className="absolute top-3 right-3 bg-gold text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                      <Crown className="w-3 h-3" />
                      Premium
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-charcoal mb-1.5 group-hover:text-terracotta transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-sm text-warm-gray line-clamp-2 mb-4 leading-relaxed">
                    {recipe.description}
                  </p>

                  {/* Meta Row */}
                  <div className="flex items-center gap-4 text-xs text-warm-gray mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {recipe.prepTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {recipe.servings} servings
                    </span>
                    <span className="flex items-center gap-1 text-gold">
                      <Star className="w-3.5 h-3.5 fill-gold" />
                      {recipe.rating}
                    </span>
                  </div>

                  {/* Bottom Row: Price + Add to Cart */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-light-gray/60">
                    <span className="text-xl font-bold text-terracotta">
                      ${recipe.price.toFixed(2)}
                    </span>
                    <button
                      onClick={(e) => handleAddToCart(e, recipe)}
                      className="flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white text-sm font-medium px-4 py-2.5 rounded-xl border-0 cursor-pointer transition-colors active:scale-95 transform"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-cream-dark rounded-full flex items-center justify-center mx-auto mb-5">
              <Filter className="w-8 h-8 text-warm-gray" />
            </div>
            <h3 className="text-xl font-bold text-charcoal mb-2">
              No recipes found
            </h3>
            <p className="text-warm-gray mb-6 max-w-md mx-auto">
              We couldn't find any recipes matching your search or filters. Try
              adjusting your criteria or browse all recipes.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                handleCategoryChange('all');
              }}
              className="bg-terracotta hover:bg-terracotta-dark text-white font-medium px-6 py-3 rounded-xl border-0 cursor-pointer transition-colors"
            >
              Browse All Recipes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
