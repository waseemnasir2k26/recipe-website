import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Package, Star, ShoppingCart, Plus, Minus, X, Sparkles, Check, ArrowRight } from 'lucide-react';
import { recipes, bundles } from '../data/recipes';
import { useCart } from '../context/CartContext';

const tagColors = {
  'Best Seller': 'bg-terracotta text-white',
  'Popular': 'bg-forest text-white',
  'New': 'bg-gold text-charcoal',
  'Cozy': 'bg-terracotta-light text-white',
};

export default function Bundles() {
  const { addItem } = useCart();
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [addedBundles, setAddedBundles] = useState({});

  const getRecipeById = (id) => recipes.find((r) => r.id === id);

  const toggleRecipeSelection = (recipe) => {
    setSelectedRecipes((prev) => {
      const exists = prev.find((r) => r.id === recipe.id);
      if (exists) {
        return prev.filter((r) => r.id !== recipe.id);
      }
      if (prev.length >= 5) return prev;
      return [...prev, recipe];
    });
  };

  const removeFromSelection = (recipeId) => {
    setSelectedRecipes((prev) => prev.filter((r) => r.id !== recipeId));
  };

  const isSelected = (recipeId) => selectedRecipes.some((r) => r.id === recipeId);

  const customBundlePricing = useMemo(() => {
    const total = selectedRecipes.reduce((sum, r) => sum + r.price, 0);
    const discount = selectedRecipes.length === 5 ? total * 0.3 : 0;
    const finalPrice = total - discount;
    return { total, discount, finalPrice };
  }, [selectedRecipes]);

  const handleAddBundle = (bundle) => {
    addItem({
      id: bundle.id,
      type: 'bundle',
      title: bundle.title,
      price: bundle.price,
      image: bundle.image,
    });
    setAddedBundles((prev) => ({ ...prev, [bundle.id]: true }));
    setTimeout(() => {
      setAddedBundles((prev) => ({ ...prev, [bundle.id]: false }));
    }, 2000);
  };

  const handleAddCustomBundle = () => {
    if (selectedRecipes.length !== 5) return;
    const customId = `custom-${Date.now()}`;
    addItem({
      id: customId,
      type: 'custom-bundle',
      title: `Custom Bundle (${selectedRecipes.map((r) => r.title).join(', ')})`,
      price: parseFloat(customBundlePricing.finalPrice.toFixed(2)),
      image: selectedRecipes[0].image,
    });
    setSelectedRecipes([]);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative bg-charcoal py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-terracotta rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-56 h-56 bg-gold rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-gold-light px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Package className="w-4 h-4" />
            Save up to 40%
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            Recipe Bundles
          </h1>
          <p className="text-lg sm:text-xl text-light-gray max-w-2xl mx-auto">
            Grab a curated collection or build your own custom bundle and save big
          </p>
        </div>
      </section>

      {/* Section 1: Pre-Made Bundles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal mb-3">
            Curated Recipe Bundles
          </h2>
          <p className="text-warm-gray text-lg">
            Hand-picked collections at amazing prices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bundles.map((bundle) => {
            const bundleRecipes = bundle.recipes.map(getRecipeById).filter(Boolean);
            const savePercent = Math.round(
              ((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100
            );

            return (
              <div
                key={bundle.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-light-gray hover:shadow-xl transition-shadow duration-300"
              >
                {/* Bundle Image */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img
                    src={bundle.image}
                    alt={bundle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {bundle.tag && (
                    <span
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                        tagColors[bundle.tag] || 'bg-terracotta text-white'
                      }`}
                    >
                      {bundle.tag}
                    </span>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-display font-bold text-white text-shadow">
                      {bundle.title}
                    </h3>
                  </div>
                </div>

                {/* Bundle Content */}
                <div className="p-6">
                  <p className="text-warm-gray mb-4 line-clamp-2">
                    {bundle.description}
                  </p>

                  {/* Recipe Thumbnails */}
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-sm text-warm-gray font-medium mr-1">
                      Includes:
                    </span>
                    <div className="flex -space-x-2">
                      {bundleRecipes.map((recipe) => (
                        <div
                          key={recipe.id}
                          className="w-9 h-9 rounded-full border-2 border-white overflow-hidden flex-shrink-0"
                          title={recipe.title}
                        >
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <span className="text-xs text-warm-gray ml-1">
                      {bundleRecipes.length} recipes
                    </span>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-warm-gray line-through">
                        ${bundle.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-2xl font-bold text-terracotta">
                        ${bundle.price.toFixed(2)}
                      </span>
                      <span className="bg-forest-light/10 text-forest font-semibold text-xs px-2 py-1 rounded-full">
                        Save {savePercent}%
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddBundle(bundle)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        addedBundles[bundle.id]
                          ? 'bg-forest text-white'
                          : 'bg-terracotta text-white hover:bg-terracotta-dark active:scale-95'
                      }`}
                    >
                      {addedBundles[bundle.id] ? (
                        <>
                          <Check className="w-4 h-4" />
                          Added!
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          Add Bundle to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-light-gray" />
      </div>

      {/* Section 2: Build Your Own Bundle */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-terracotta bg-terracotta/10 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Custom Builder
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal mb-3">
            Build Your Own Bundle
          </h2>
          <p className="text-warm-gray text-lg">
            Pick any 5 recipes and save 30%
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Recipe Selection Grid */}
          <div className="flex-1 lg:max-h-[700px] lg:overflow-y-auto lg:pr-2 custom-scrollbar">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {recipes.map((recipe) => {
                const selected = isSelected(recipe.id);
                const isFull = selectedRecipes.length >= 5 && !selected;

                return (
                  <button
                    key={recipe.id}
                    onClick={() => toggleRecipeSelection(recipe)}
                    disabled={isFull}
                    className={`relative rounded-xl overflow-hidden text-left transition-all duration-200 group ${
                      selected
                        ? 'ring-3 ring-terracotta shadow-lg scale-[1.02]'
                        : isFull
                        ? 'opacity-40 cursor-not-allowed'
                        : 'hover:shadow-md hover:scale-[1.02] ring-1 ring-light-gray'
                    } bg-white`}
                  >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Check Overlay */}
                      {selected && (
                        <div className="absolute inset-0 bg-terracotta/30 flex items-center justify-center">
                          <div className="bg-terracotta rounded-full p-2">
                            <Check className="w-5 h-5 text-white" strokeWidth={3} />
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Info */}
                    <div className="p-3">
                      <h4 className="text-sm font-semibold text-charcoal line-clamp-2 leading-tight mb-1">
                        {recipe.title}
                      </h4>
                      <p className="text-sm font-bold text-terracotta">
                        ${recipe.price.toFixed(2)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Custom Bundle Panel */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="lg:sticky lg:top-24 bg-white rounded-2xl shadow-lg border border-light-gray p-6">
              <div className="flex items-center gap-2 mb-5">
                <Package className="w-5 h-5 text-terracotta" />
                <h3 className="text-xl font-display font-bold text-charcoal">
                  Your Custom Bundle
                </h3>
              </div>

              {/* Selected Recipes List */}
              <div className="space-y-2 mb-5 min-h-[140px]">
                {selectedRecipes.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-cream-dark rounded-full flex items-center justify-center mx-auto mb-3">
                      <Plus className="w-5 h-5 text-warm-gray" />
                    </div>
                    <p className="text-warm-gray text-sm">
                      Select recipes from the grid to get started
                    </p>
                  </div>
                ) : (
                  selectedRecipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="flex items-center gap-3 bg-cream rounded-lg p-2 pr-3 group/item transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-charcoal truncate">
                          {recipe.title}
                        </p>
                        <p className="text-xs text-warm-gray">
                          ${recipe.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromSelection(recipe.id)}
                        className="p-1 rounded-full text-warm-gray hover:text-terracotta hover:bg-terracotta/10 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Progress */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-charcoal">
                    {selectedRecipes.length} of 5 selected
                  </span>
                  {selectedRecipes.length === 5 && (
                    <span className="text-xs font-semibold text-forest bg-forest/10 px-2 py-0.5 rounded-full">
                      Bundle ready!
                    </span>
                  )}
                </div>
                <div className="w-full h-2.5 bg-cream-dark rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${(selectedRecipes.length / 5) * 100}%`,
                      backgroundColor:
                        selectedRecipes.length === 5
                          ? 'var(--color-forest)'
                          : 'var(--color-terracotta)',
                    }}
                  />
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-light-gray pt-4 mb-5 space-y-2">
                {selectedRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-warm-gray truncate pr-2">
                      {recipe.title}
                    </span>
                    <span className="text-charcoal font-medium flex-shrink-0">
                      ${recipe.price.toFixed(2)}
                    </span>
                  </div>
                ))}

                {selectedRecipes.length > 0 && (
                  <>
                    <div className="border-t border-dashed border-light-gray pt-2 flex justify-between text-sm">
                      <span className="text-warm-gray">Subtotal</span>
                      <span className="text-charcoal font-medium">
                        ${customBundlePricing.total.toFixed(2)}
                      </span>
                    </div>

                    {selectedRecipes.length === 5 ? (
                      <div className="flex justify-between text-sm">
                        <span className="text-forest font-medium">
                          Bundle Discount (30%)
                        </span>
                        <span className="text-forest font-bold">
                          -${customBundlePricing.discount.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <div className="flex justify-between text-sm">
                        <span className="text-warm-gray italic">
                          Select {5 - selectedRecipes.length} more for 30% off
                        </span>
                      </div>
                    )}

                    <div className="border-t border-light-gray pt-2 flex justify-between">
                      <span className="text-charcoal font-bold">Total</span>
                      <div className="text-right">
                        {selectedRecipes.length === 5 && (
                          <span className="text-sm text-warm-gray line-through mr-2">
                            ${customBundlePricing.total.toFixed(2)}
                          </span>
                        )}
                        <span className="text-xl font-bold text-terracotta">
                          ${customBundlePricing.finalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Add Custom Bundle Button */}
              <button
                onClick={handleAddCustomBundle}
                disabled={selectedRecipes.length !== 5}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  selectedRecipes.length === 5
                    ? 'bg-terracotta text-white hover:bg-terracotta-dark active:scale-[0.98] shadow-lg shadow-terracotta/25'
                    : 'bg-light-gray text-warm-gray cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                Add Custom Bundle to Cart
              </button>

              {selectedRecipes.length === 5 && (
                <p className="text-center text-xs text-forest mt-3 font-medium">
                  You're saving ${customBundlePricing.discount.toFixed(2)} with this bundle!
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
