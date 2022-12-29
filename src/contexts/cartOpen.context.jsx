import { createContext, useState, useEffect } from 'react';
// import SHOP_DATA from '../shop-data.json';
//actual value u want to access
export const cartOpenContext = createContext({
  cartOpen: false,
  setCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
  cartCount: 0,
  setCartCount: () => {},
});

const addCartItems = (cartItems, productToAdd) => {
  console.log('addCartItems ', cartItems, productToAdd);
  let isCartItem = cartItems.find((item) => item.id === productToAdd.id);
  console.log('isCartItem', isCartItem);
  if (isCartItem) {
    return cartItems.map((item) =>
      item.id == productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    // productToAdd.quantity = 1;
    cartItems = [...cartItems, { ...productToAdd, quantity: 1 }];
    console.log('final cartItems', cartItems);

    return cartItems;
  }
};

const deleteCartItems = (cartItems, productToDelete) => {
  cartItems = cartItems.filter((item) => item.id !== productToDelete.id);

  return cartItems;
};

const removeCartItems = (cartItems, productToRemove) => {
  console.log('addCartItems ', cartItems, productToRemove);
  let cartItemFound = cartItems.filter(
    (item) => item.id == productToRemove.id
  )[0];
  console.log('cartItemFound', cartItemFound, cartItemFound.quantity);
  if (cartItemFound.quantity > 1) {
    console.log('quantitu is greater');
    return cartItems.map((item) =>
      item.id == productToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  } else {
    console.log('quantitu is lesser');
    // productToAdd.quantity = 1;
    cartItems = cartItems.filter((item) => item.id !== productToRemove.id);
    console.log('final cartItems', cartItems);

    return cartItems;
  }
};
export const CartOpenProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const addItemToCart = (product) => {
    setCartItems(addCartItems(cartItems, product));
    // setCartCount(cartCount + 1);
  };

  const removeItemFromCart = (product) => {
    setCartItems(removeCartItems(cartItems, product));
  };

  const deleteItemFromCart = (product) => {
    setCartItems(deleteCartItems(cartItems, product));
  };

  useEffect(() => {
    let newCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCount);
  }, [cartItems]);

  useEffect(() => {
    let newCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCount);
  }, [cartItems]);

  const value = {
    cartOpen,
    setCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    cartTotal,

    removeItemFromCart,
    deleteItemFromCart,
  };

  return (
    <cartOpenContext.Provider value={value}>
      {children}
    </cartOpenContext.Provider>
  );
};
