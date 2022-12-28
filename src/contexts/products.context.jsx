import { createContext, useState } from 'react';
import SHOP_DATA from '../shop-data.json';
//actual value u want to access
export const productsContext = createContext({
  products: [],
  setProducts: () => null,
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(SHOP_DATA);
  const value = { products, setProducts };
  return (
    <productsContext.Provider value={value}>
      {children}
    </productsContext.Provider>
  );
};
