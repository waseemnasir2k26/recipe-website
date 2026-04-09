import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Package, Users, DollarSign, Plus, Edit2, Trash2, Eye, TrendingUp, ShoppingBag, Crown, ChefHat, ArrowLeft, Search, Filter } from 'lucide-react';
import { recipes, bundles } from '../data/recipes';
import { useAuth } from '../context/AuthContext';

const mockSubscribers = [
  { id: 1, name: 'Sarah Mitchell', email: 'sarah.m@gmail.com', plan: 'All-Access Pass', joined: '2026-01-15', status: 'Active', revenue: 59.94 },
  { id: 2, name: 'James Rodriguez', email: 'james.r@outlook.com', plan: 'All-Access Pass', joined: '2025-11-03', status: 'Active', revenue: 49.95 },
  { id: 3, name: 'Lisa Kim', email: 'lisa.kim@yahoo.com', plan: 'All-Access Pass', joined: '2026-02-20', status: 'Active', revenue: 29.97 },
  { id: 4, name: 'Michael Chen', email: 'm.chen@gmail.com', plan: 'All-Access Pass', joined: '2025-09-12', status: 'Cancelled', revenue: 69.93 },
  { id: 5, name: 'Emma Davis', email: 'emma.d@icloud.com', plan: 'All-Access Pass', joined: '2026-03-01', status: 'Active', revenue: 19.98 },
  { id: 6, name: 'Robert Wilson', email: 'r.wilson@gmail.com', plan: 'All-Access Pass', joined: '2025-12-08', status: 'Active', revenue: 39.96 },
];

const mockOrders = [
  { id: 'ORD-1847', customer: 'Sarah Mitchell', items: 'Weeknight Winners Bundle', total: 14.99, date: '2026-04-09', status: 'Completed' },
  { id: 'ORD-1846', customer: 'David Park', items: 'Beef Wellington, Tiramisu', total: 12.98, date: '2026-04-09', status: 'Completed' },
  { id: 'ORD-1845', customer: 'Emily Foster', items: 'All-Access Subscription', total: 9.99, date: '2026-04-08', status: 'Completed' },
  { id: 'ORD-1844', customer: 'Chris Lane', items: 'Date Night Collection', total: 19.99, date: '2026-04-08', status: 'Pending' },
  { id: 'ORD-1843', customer: 'Amanda Torres', items: 'Lobster Bisque, French Onion Soup', total: 11.98, date: '2026-04-07', status: 'Completed' },
  { id: 'ORD-1842', customer: 'Ryan O\'Brien', items: 'Healthy Start Pack', total: 12.99, date: '2026-04-07', status: 'Refunded' },
  { id: 'ORD-1841', customer: 'Jessica Wang', items: 'Comfort Food Classics', total: 16.99, date: '2026-04-06', status: 'Completed' },
  { id: 'ORD-1840', customer: 'Nathan Brooks', items: 'Truffle Mushroom Risotto', total: 5.99, date: '2026-04-06', status: 'Completed' },
  { id: 'ORD-1839', customer: 'Olivia Martin', items: 'All-Access Subscription', total: 9.99, date: '2026-04-05', status: 'Completed' },
  { id: 'ORD-1838', customer: 'Tyler Grant', items: 'Classic Eggs Benedict, Avocado Toast', total: 8.98, date: '2026-04-05', status: 'Pending' },
];

export default function Admin() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('recipes');
  const [recipeList, setRecipeList] = useState(recipes.map(r => ({ ...r, published: true })));
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', price: '', category: '' });
  const [orderFilter, setOrderFilter] = useState('All');

  const tabs = [
    { id: 'recipes', label: 'Recipes', icon: ChefHat },
    { id: 'bundles', label: 'Bundles', icon: Package },
    { id: 'subscribers', label: 'Subscribers', icon: Users },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
  ];

  const stats = [
    { label: 'Total Revenue', value: '$12,847', icon: DollarSign, trend: '+18%', color: 'bg-emerald-100 text-emerald-700', iconBg: 'bg-emerald-500' },
    { label: 'Total Orders', value: '1,284', icon: ShoppingBag, trend: '+12%', color: 'bg-blue-100 text-blue-700', iconBg: 'bg-blue-500' },
    { label: 'Active Subscribers', value: '347', icon: Crown, trend: '+24%', color: 'bg-amber-100 text-amber-700', iconBg: 'bg-gold' },
    { label: 'Recipes Published', value: String(recipes.length), icon: ChefHat, trend: '+3', color: 'bg-red-100 text-terracotta', iconBg: 'bg-terracotta' },
  ];

  // --- Recipe handlers ---
  const handleDelete = (id) => {
    setRecipeList(prev => prev.filter(r => r.id !== id));
  };

  const handleTogglePublish = (id) => {
    setRecipeList(prev => prev.map(r => r.id === id ? { ...r, published: !r.published } : r));
  };

  const startEdit = (recipe) => {
    setEditingId(recipe.id);
    setEditForm({ title: recipe.title, price: String(recipe.price), category: recipe.category });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: '', price: '', category: '' });
  };

  const saveEdit = (id) => {
    setRecipeList(prev => prev.map(r => r.id === id ? { ...r, title: editForm.title, price: parseFloat(editForm.price) || r.price, category: editForm.category } : r));
    cancelEdit();
  };

  const filteredRecipes = recipeList.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrders = orderFilter === 'All' ? mockOrders : mockOrders.filter(o => o.status === orderFilter);

  const activeSubscribers = mockSubscribers.filter(s => s.status === 'Active');
  const mrr = activeSubscribers.length * 9.99;
  const churnRate = ((mockSubscribers.length - activeSubscribers.length) / mockSubscribers.length * 100).toFixed(1);

  // --- Status badge helper ---
  const statusBadge = (status) => {
    const styles = {
      Completed: 'bg-emerald-100 text-emerald-700',
      Pending: 'bg-amber-100 text-amber-700',
      Refunded: 'bg-red-100 text-red-700',
      Active: 'bg-emerald-100 text-emerald-700',
      Cancelled: 'bg-gray-200 text-gray-600',
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white border-b border-light-gray sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-warm-gray hover:text-terracotta transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back to Store
            </Link>
            <div className="hidden sm:block w-px h-6 bg-light-gray" />
            <h1 className="text-xl sm:text-2xl font-bold text-charcoal font-display">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-warm-gray hidden sm:inline">
              Welcome, <span className="font-semibold text-charcoal">{user?.name || 'Admin'}</span>
            </span>
            <div className="w-9 h-9 rounded-full bg-terracotta text-white flex items-center justify-center text-sm font-bold">
              {(user?.name || 'A')[0].toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-light-gray p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${stat.color}`}>
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend} this month
                </span>
              </div>
              <p className="text-2xl font-bold text-charcoal">{stat.value}</p>
              <p className="text-sm text-warm-gray mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 bg-white rounded-xl border border-light-gray p-1.5 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-terracotta text-white shadow-sm'
                  : 'text-warm-gray hover:text-charcoal hover:bg-cream'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===================== RECIPES TAB ===================== */}
        {activeTab === 'recipes' && (
          <div>
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray" />
                <input
                  type="text"
                  placeholder="Search recipes by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-light-gray bg-white text-charcoal text-sm placeholder:text-warm-gray/60 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta"
                />
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-forest text-white rounded-lg text-sm font-semibold hover:bg-forest-light transition-colors shadow-sm">
                <Plus className="w-4 h-4" />
                Add New Recipe
              </button>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block bg-white rounded-xl border border-light-gray overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-light-gray bg-cream/50">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Recipe</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Category</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Price</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Rating</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Status</th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-gray">
                  {filteredRecipes.map((recipe) => (
                    <tr key={recipe.id} className="hover:bg-cream/30 transition-colors">
                      {editingId === recipe.id ? (
                        <>
                          <td className="py-3 px-4">
                            <input
                              type="text"
                              value={editForm.title}
                              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                              className="w-full px-2 py-1.5 text-sm border border-light-gray rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={editForm.category}
                              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                              className="px-2 py-1.5 text-sm border border-light-gray rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                            >
                              {['breakfast', 'lunch', 'dinner', 'desserts', 'soups', 'smoothies', 'snacks'].map(c => (
                                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3 px-4">
                            <input
                              type="number"
                              step="0.01"
                              value={editForm.price}
                              onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                              className="w-20 px-2 py-1.5 text-sm border border-light-gray rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                            />
                          </td>
                          <td className="py-3 px-4 text-sm text-charcoal">{recipe.rating}</td>
                          <td className="py-3 px-4" />
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => saveEdit(recipe.id)} className="px-3 py-1.5 bg-forest text-white text-xs font-medium rounded-md hover:bg-forest-light transition-colors">Save</button>
                              <button onClick={cancelEdit} className="px-3 py-1.5 bg-gray-200 text-charcoal text-xs font-medium rounded-md hover:bg-gray-300 transition-colors">Cancel</button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img src={recipe.image} alt={recipe.title} className="w-10 h-10 rounded-lg object-cover" />
                              <div>
                                <p className="text-sm font-semibold text-charcoal">{recipe.title}</p>
                                <p className="text-xs text-warm-gray">{recipe.reviews} reviews</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-block px-2.5 py-1 bg-cream-dark rounded-full text-xs font-medium text-charcoal capitalize">{recipe.category}</span>
                          </td>
                          <td className="py-3 px-4 text-sm font-semibold text-charcoal">${recipe.price.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              <span className="text-gold text-sm">&#9733;</span>
                              <span className="text-sm font-medium text-charcoal">{recipe.rating}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleTogglePublish(recipe.id)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${recipe.published ? 'bg-forest' : 'bg-gray-300'}`}
                            >
                              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${recipe.published ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Link to={`/recipe/${recipe.id}`} className="p-2 text-warm-gray hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                                <Eye className="w-4 h-4" />
                              </Link>
                              <button onClick={() => startEdit(recipe)} className="p-2 text-warm-gray hover:text-terracotta hover:bg-terracotta/10 rounded-lg transition-colors" title="Edit">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(recipe.id)} className="p-2 text-warm-gray hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredRecipes.length === 0 && (
                <div className="py-12 text-center text-warm-gray text-sm">No recipes found matching your search.</div>
              )}
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-3">
              {filteredRecipes.map((recipe) => (
                <div key={recipe.id} className="bg-white rounded-xl border border-light-gray p-4">
                  {editingId === recipe.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                        placeholder="Recipe title"
                      />
                      <div className="flex gap-3">
                        <input
                          type="number"
                          step="0.01"
                          value={editForm.price}
                          onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                          className="w-24 px-3 py-2 text-sm border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                          placeholder="Price"
                        />
                        <select
                          value={editForm.category}
                          onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                          className="flex-1 px-3 py-2 text-sm border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                        >
                          {['breakfast', 'lunch', 'dinner', 'desserts', 'soups', 'smoothies', 'snacks'].map(c => (
                            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => saveEdit(recipe.id)} className="flex-1 px-3 py-2 bg-forest text-white text-sm font-medium rounded-lg hover:bg-forest-light transition-colors">Save</button>
                        <button onClick={cancelEdit} className="flex-1 px-3 py-2 bg-gray-200 text-charcoal text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <img src={recipe.image} alt={recipe.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-charcoal truncate">{recipe.title}</p>
                            <p className="text-xs text-warm-gray capitalize">{recipe.category} &middot; ${recipe.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <span className="text-gold">&#9733;</span>
                            <span className="font-medium text-charcoal">{recipe.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <button
                            onClick={() => handleTogglePublish(recipe.id)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${recipe.published ? 'bg-forest' : 'bg-gray-300'}`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${recipe.published ? 'translate-x-6' : 'translate-x-1'}`} />
                          </button>
                          <div className="flex items-center gap-1">
                            <Link to={`/recipe/${recipe.id}`} className="p-1.5 text-warm-gray hover:text-blue-600 rounded-md transition-colors">
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button onClick={() => startEdit(recipe)} className="p-1.5 text-warm-gray hover:text-terracotta rounded-md transition-colors">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(recipe.id)} className="p-1.5 text-warm-gray hover:text-red-600 rounded-md transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {filteredRecipes.length === 0 && (
                <div className="py-12 text-center text-warm-gray text-sm">No recipes found matching your search.</div>
              )}
            </div>
          </div>
        )}

        {/* ===================== BUNDLES TAB ===================== */}
        {activeTab === 'bundles' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-warm-gray">{bundles.length} bundles</p>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-forest text-white rounded-lg text-sm font-semibold hover:bg-forest-light transition-colors shadow-sm">
                <Plus className="w-4 h-4" />
                Create Bundle
              </button>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block bg-white rounded-xl border border-light-gray overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-light-gray bg-cream/50">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Bundle</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-warm-gray uppercase tracking-wider"># Recipes</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Original Price</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Sale Price</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Discount</th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-gray">
                  {bundles.map((bundle) => {
                    const discount = Math.round((1 - bundle.price / bundle.originalPrice) * 100);
                    return (
                      <tr key={bundle.id} className="hover:bg-cream/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img src={bundle.image} alt={bundle.title} className="w-10 h-10 rounded-lg object-cover" />
                            <div>
                              <p className="text-sm font-semibold text-charcoal">{bundle.title}</p>
                              {bundle.tag && (
                                <span className="inline-block mt-0.5 px-2 py-0.5 bg-gold-light/30 text-gold text-xs font-medium rounded-full">{bundle.tag}</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-charcoal font-medium">{bundle.recipes.length}</td>
                        <td className="py-3 px-4 text-sm text-warm-gray line-through">${bundle.originalPrice.toFixed(2)}</td>
                        <td className="py-3 px-4 text-sm font-semibold text-forest">${bundle.price.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">-{discount}%</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button className="p-2 text-warm-gray hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-warm-gray hover:text-terracotta hover:bg-terracotta/10 rounded-lg transition-colors" title="Edit">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-warm-gray hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-3">
              {bundles.map((bundle) => {
                const discount = Math.round((1 - bundle.price / bundle.originalPrice) * 100);
                return (
                  <div key={bundle.id} className="bg-white rounded-xl border border-light-gray p-4">
                    <div className="flex items-start gap-3">
                      <img src={bundle.image} alt={bundle.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-charcoal">{bundle.title}</p>
                            <p className="text-xs text-warm-gray">{bundle.recipes.length} recipes</p>
                          </div>
                          {bundle.tag && (
                            <span className="px-2 py-0.5 bg-gold-light/30 text-gold text-xs font-medium rounded-full flex-shrink-0">{bundle.tag}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm font-semibold text-forest">${bundle.price.toFixed(2)}</span>
                          <span className="text-xs text-warm-gray line-through">${bundle.originalPrice.toFixed(2)}</span>
                          <span className="text-xs font-semibold text-emerald-600">-{discount}%</span>
                        </div>
                        <div className="flex items-center justify-end gap-1 mt-2">
                          <button className="p-1.5 text-warm-gray hover:text-blue-600 rounded-md transition-colors"><Eye className="w-4 h-4" /></button>
                          <button className="p-1.5 text-warm-gray hover:text-terracotta rounded-md transition-colors"><Edit2 className="w-4 h-4" /></button>
                          <button className="p-1.5 text-warm-gray hover:text-red-600 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================== SUBSCRIBERS TAB ===================== */}
        {activeTab === 'subscribers' && (
          <div>
            {/* Subscriber Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl border border-light-gray p-5">
                <p className="text-sm text-warm-gray">Active Subscribers</p>
                <p className="text-2xl font-bold text-charcoal mt-1">{activeSubscribers.length}</p>
              </div>
              <div className="bg-white rounded-xl border border-light-gray p-5">
                <p className="text-sm text-warm-gray">Monthly Recurring Revenue</p>
                <p className="text-2xl font-bold text-forest mt-1">${mrr.toFixed(2)}</p>
              </div>
              <div className="bg-white rounded-xl border border-light-gray p-5">
                <p className="text-sm text-warm-gray">Churn Rate</p>
                <p className="text-2xl font-bold text-terracotta mt-1">{churnRate}%</p>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block bg-white rounded-xl border border-light-gray overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-light-gray bg-cream/50">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Subscriber</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Plan</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Joined</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Status</th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-gray">
                  {mockSubscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-cream/30 transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm font-semibold text-charcoal">{sub.name}</p>
                          <p className="text-xs text-warm-gray">{sub.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-charcoal">{sub.plan}</td>
                      <td className="py-3 px-4 text-sm text-warm-gray">{new Date(sub.joined).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                      <td className="py-3 px-4">{statusBadge(sub.status)}</td>
                      <td className="py-3 px-4 text-right text-sm font-semibold text-charcoal">${sub.revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-3">
              {mockSubscribers.map((sub) => (
                <div key={sub.id} className="bg-white rounded-xl border border-light-gray p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-charcoal">{sub.name}</p>
                      <p className="text-xs text-warm-gray">{sub.email}</p>
                    </div>
                    {statusBadge(sub.status)}
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-light-gray">
                    <span className="text-xs text-warm-gray">Joined {new Date(sub.joined).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="text-sm font-semibold text-charcoal">${sub.revenue.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== ORDERS TAB ===================== */}
        {activeTab === 'orders' && (
          <div>
            {/* Filter Bar */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
              <Filter className="w-4 h-4 text-warm-gray flex-shrink-0" />
              {['All', 'Completed', 'Pending', 'Refunded'].map((status) => (
                <button
                  key={status}
                  onClick={() => setOrderFilter(status)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    orderFilter === status
                      ? 'bg-terracotta text-white'
                      : 'bg-white border border-light-gray text-warm-gray hover:text-charcoal hover:border-warm-gray'
                  }`}
                >
                  {status}
                  {status !== 'All' && (
                    <span className="ml-1.5 opacity-70">
                      ({mockOrders.filter(o => o.status === status).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block bg-white rounded-xl border border-light-gray overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-light-gray bg-cream/50">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Order #</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Customer</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Items</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Date</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Status</th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-gray">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-cream/30 transition-colors">
                      <td className="py-3 px-4 text-sm font-mono font-semibold text-charcoal">{order.id}</td>
                      <td className="py-3 px-4 text-sm text-charcoal">{order.customer}</td>
                      <td className="py-3 px-4 text-sm text-warm-gray max-w-[200px] truncate">{order.items}</td>
                      <td className="py-3 px-4 text-sm text-warm-gray">{new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                      <td className="py-3 px-4">{statusBadge(order.status)}</td>
                      <td className="py-3 px-4 text-right text-sm font-semibold text-charcoal">${order.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredOrders.length === 0 && (
                <div className="py-12 text-center text-warm-gray text-sm">No orders match this filter.</div>
              )}
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-3">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl border border-light-gray p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-mono font-semibold text-charcoal">{order.id}</p>
                      <p className="text-xs text-warm-gray mt-0.5">{order.customer}</p>
                    </div>
                    {statusBadge(order.status)}
                  </div>
                  <p className="text-xs text-warm-gray mt-2 truncate">{order.items}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-light-gray">
                    <span className="text-xs text-warm-gray">{new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="text-sm font-semibold text-charcoal">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
              {filteredOrders.length === 0 && (
                <div className="py-12 text-center text-warm-gray text-sm">No orders match this filter.</div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
