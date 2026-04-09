import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [isSubscriber, setIsSubscriber] = useState(false);

  const login = (email, password) => {
    if (email === 'admin@recipes.com' && password === 'admin') {
      setUser({ name: 'Admin', email });
      setIsAdmin(true);
      return true;
    }
    setUser({ name: email.split('@')[0], email });
    setIsAdmin(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  const addPurchase = (items) => {
    setPurchases(prev => [...prev, ...items.map(i => ({ ...i, purchasedAt: new Date().toISOString() }))]);
  };

  const subscribe = () => setIsSubscriber(true);

  return (
    <AuthContext.Provider value={{
      user, isAdmin, isSubscriber, purchases,
      login, logout, addPurchase, subscribe,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
