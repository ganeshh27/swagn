import { createContext, useState, useEffect } from 'react';
// import SHOP_DATA from '../shop-data.json';
//actual value u want to access
export const cartOpenContext = createContext({
  cartOpen: false,
  setCartOpen: () => {},
});

export const CartOpenProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);

  const value = { cartOpen, setCartOpen };
  return (
    <cartOpenContext.Provider value={value}>
      {children}
    </cartOpenContext.Provider>
  );
};
