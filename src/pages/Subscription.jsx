import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Crown, Check, Star, ArrowRight, Zap, BookOpen, Users, Gift, Shield, Clock, Download, Sparkles } from 'lucide-react';
import { subscriptionPlan, recipes } from '../data/recipes';
import { useCart } from '../context/CartContext';

const faqs = [
  {
    question: 'How does the subscription work?',
    answer:
      'Once you subscribe, you get instant, unlimited access to every recipe in our library — including all premium recipes. New recipes are added every month, and you get them automatically at no extra cost. Your subscription renews monthly until you decide to cancel.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Absolutely. There are no contracts and no commitment. You can cancel your subscription at any time from your account settings. You will continue to have access until the end of your current billing period.',
  },
  {
    question: 'What format are the recipes in?',
    answer:
      'Every recipe is available as a beautifully formatted web page you can view on any device. Subscribers also get printable PDF downloads for every recipe, perfect for keeping in the kitchen.',
  },
  {
    question: 'How many recipes do I get access to?',
    answer: `Right now you get instant access to all ${recipes.length} recipes in our library, including ${recipes.filter((r) => r.isPremium).length} premium recipes. We add 4-6 new exclusive recipes every month, so your collection keeps growing.`,
  },
  {
    question: 'Do I keep recipes if I cancel?',
    answer:
      'Any PDF recipes you have downloaded are yours to keep forever. However, online access to the full library and future recipes requires an active subscription.',
  },
];

const features = [
  {
    icon: BookOpen,
    title: 'Unlimited Recipes',
    description: 'Access every recipe in our library, no limits',
    color: 'bg-terracotta/10 text-terracotta',
  },
  {
    icon: Sparkles,
    title: 'New Monthly Recipes',
    description: '4-6 fresh recipes added every single month',
    color: 'bg-gold/10 text-gold',
  },
  {
    icon: Crown,
    title: 'Premium Included',
    description: '$5.99-$7.99 recipes at no extra cost',
    color: 'bg-forest/10 text-forest',
  },
  {
    icon: Download,
    title: 'Instant Downloads',
    description: 'PDF downloads, print anytime you want',
    color: 'bg-terracotta/10 text-terracotta',
  },
  {
    icon: Clock,
    title: 'Meal Planning',
    description: 'Weekly meal planning templates included',
    color: 'bg-gold/10 text-gold',
  },
  {
    icon: Users,
    title: 'Community Access',
    description: 'Join our private cooking community',
    color: 'bg-forest/10 text-forest',
  },
  {
    icon: Zap,
    title: 'Early Access',
    description: 'Seasonal collections before anyone else',
    color: 'bg-terracotta/10 text-terracotta',
  },
  {
    icon: Shield,
    title: 'Cancel Anytime',
    description: 'No contracts, no commitment, no hassle',
    color: 'bg-gold/10 text-gold',
  },
  {
    icon: Gift,
    title: 'Free Gift',
    description: 'Welcome bundle with 3 bonus recipes',
    color: 'bg-forest/10 text-forest',
  },
];

export default function Subscription() {
  const { addItem } = useCart();
  const [openFaq, setOpenFaq] = useState(null);

  const totalIndividual = recipes.reduce((sum, r) => sum + r.price, 0);
  const savings = (totalIndividual - subscriptionPlan.price).toFixed(2);
  const premiumRecipes = recipes.filter((r) => r.isPremium);

  const handleSubscribe = () => {
    addItem({
      id: 'sub-monthly',
      title: 'All-Access Monthly Subscription',
      price: 9.99,
      type: 'subscription',
      image: '',
    });
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* ───────────── HERO ───────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream to-white">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl translate-y-1/2" />

        <div className="relative max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta px-4 py-2 rounded-full text-sm font-semibold mb-8">
            <Crown className="w-4 h-4" />
            Most Popular Plan
          </div>

          {/* Title */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal mb-6 leading-tight">
            All-Access Pass
          </h1>

          {/* Subtitle */}
          <p className="text-warm-gray text-lg md:text-xl max-w-2xl mx-auto mb-10">
            One subscription. Every recipe. Forever growing.
          </p>

          {/* Price */}
          <div className="inline-flex flex-col items-center bg-white rounded-3xl shadow-xl shadow-terracotta/10 px-12 py-8 border border-light-gray">
            <div className="flex items-baseline gap-1">
              <span className="text-warm-gray text-2xl font-medium">$</span>
              <span className="text-6xl md:text-7xl font-bold text-terracotta tracking-tight">
                9
              </span>
              <span className="text-3xl md:text-4xl font-bold text-terracotta">.99</span>
              <span className="text-warm-gray text-lg ml-1">/month</span>
            </div>
            <p className="text-warm-gray text-sm mt-2">Billed monthly. Cancel anytime.</p>

            <button
              onClick={handleSubscribe}
              className="mt-6 bg-terracotta hover:bg-terracotta-dark text-white font-semibold px-10 py-4 rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:shadow-terracotta/25 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              Start Your Subscription
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ───────────── VALUE COMPARISON ───────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal text-center mb-4">
            Do The Math
          </h2>
          <p className="text-warm-gray text-center mb-12 text-lg">
            See how much you save with a subscription
          </p>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {/* Individual */}
            <div className="bg-cream rounded-2xl p-8 text-center border border-light-gray">
              <div className="w-12 h-12 bg-warm-gray/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-warm-gray" />
              </div>
              <p className="text-sm font-semibold text-warm-gray uppercase tracking-wider mb-2">
                Buy Individual
              </p>
              <p className="text-3xl font-bold text-charcoal">
                ${totalIndividual.toFixed(2)}
              </p>
              <p className="text-warm-gray text-sm mt-2">
                for all {recipes.length} recipes
              </p>
            </div>

            {/* Subscribe */}
            <div className="bg-terracotta rounded-2xl p-8 text-center text-white shadow-xl shadow-terracotta/20 relative md:-my-4">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-charcoal text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                Best Value
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-2">
                Subscribe
              </p>
              <p className="text-3xl font-bold">
                ${subscriptionPlan.price}/mo
              </p>
              <p className="text-white/80 text-sm mt-2">
                Unlimited access
              </p>
            </div>

            {/* Savings */}
            <div className="bg-forest/5 rounded-2xl p-8 text-center border-2 border-forest/20">
              <div className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-forest" />
              </div>
              <p className="text-sm font-semibold text-forest uppercase tracking-wider mb-2">
                You Save
              </p>
              <p className="text-3xl font-bold text-forest">
                ${savings}+
              </p>
              <p className="text-warm-gray text-sm mt-2">instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── FEATURES GRID ───────────── */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal text-center mb-4">
            Everything You Get
          </h2>
          <p className="text-warm-gray text-center mb-14 text-lg max-w-2xl mx-auto">
            Your subscription unlocks a complete cooking experience
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl p-6 border border-light-gray hover:shadow-lg hover:shadow-charcoal/5 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-charcoal text-lg mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-warm-gray text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── PREMIUM RECIPES PREVIEW ───────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold-light px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Crown className="w-4 h-4" />
              Premium Collection
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">
              Included with Your Subscription
            </h2>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              These premium recipes are normally ${recipes.filter((r) => r.isPremium).reduce((min, r) => Math.min(min, r.price), Infinity).toFixed(2)}-${recipes.filter((r) => r.isPremium).reduce((max, r) => Math.max(max, r.price), 0).toFixed(2)} each — free with your All-Access Pass
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-cream rounded-2xl overflow-hidden border border-light-gray hover:shadow-xl hover:shadow-charcoal/5 transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Included badge */}
                  <div className="absolute top-3 right-3 bg-forest text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                    <Check className="w-3.5 h-3.5" />
                    Included
                  </div>
                  {/* Crossed-out price */}
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-warm-gray text-sm font-medium px-3 py-1 rounded-full line-through">
                    ${recipe.price.toFixed(2)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.round(recipe.rating)
                              ? 'text-gold fill-gold'
                              : 'text-light-gray'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-warm-gray">
                      ({recipe.reviews})
                    </span>
                  </div>
                  <h3 className="font-semibold text-charcoal text-lg mb-1">
                    {recipe.title}
                  </h3>
                  <p className="text-warm-gray text-sm line-clamp-2">
                    {recipe.description}
                  </p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-warm-gray">
                    <span className="bg-cream-dark px-2 py-0.5 rounded">
                      {recipe.prepTime} prep
                    </span>
                    <span className="bg-cream-dark px-2 py-0.5 rounded">
                      {recipe.cookTime} cook
                    </span>
                    <span className="bg-cream-dark px-2 py-0.5 rounded">
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── FAQ ───────────── */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal text-center mb-4">
            Common Questions
          </h2>
          <p className="text-warm-gray text-center mb-12 text-lg">
            Everything you need to know before subscribing
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-light-gray overflow-hidden transition-shadow duration-300 hover:shadow-md"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                  >
                    <span className="font-semibold text-charcoal text-lg pr-4">
                      {faq.question}
                    </span>
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? 'bg-terracotta text-white rotate-45'
                          : 'bg-cream text-charcoal'
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="px-6 pb-6 text-warm-gray leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── FINAL CTA ───────────── */}
      <section className="relative overflow-hidden bg-terracotta">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 right-10 w-56 h-56 bg-terracotta-dark/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 py-20 text-center">
          <Crown className="w-12 h-12 text-white/30 mx-auto mb-6" />

          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Start Cooking?
          </h2>
          <p className="text-white/80 text-lg mb-4 max-w-xl mx-auto">
            Join hundreds of home cooks who have upgraded their kitchen game. Get
            every recipe for less than the price of a single ingredient.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {['Unlimited Recipes', 'Cancel Anytime', 'New Recipes Monthly'].map(
              (label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 bg-white/15 text-white text-sm px-4 py-2 rounded-full"
                >
                  <Check className="w-4 h-4" />
                  {label}
                </span>
              )
            )}
          </div>

          <button
            onClick={handleSubscribe}
            className="bg-white text-terracotta font-bold px-12 py-4 rounded-full text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1 cursor-pointer inline-flex items-center gap-2"
          >
            Subscribe Now — $9.99/mo
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-white/50 text-sm mt-6">
            No commitment. Cancel anytime. Instant access.
          </p>
        </div>
      </section>
    </div>
  );
}
