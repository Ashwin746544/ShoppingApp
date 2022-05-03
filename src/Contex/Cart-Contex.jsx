import React, { useEffect, useState } from 'react';

export const CartContex = React.createContext({
  cartItems: [],
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  emptyCartHandler: () => { },
});

function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems'));
    setCartItems(existingCartItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemHandler = (cartItem) => {
    const oldCartItems = [...cartItems];
    const existingCartItemIndex = oldCartItems.findIndex((item) => item.sku === cartItem.sku);
    const existingCartItem = oldCartItems[existingCartItemIndex];
    if (existingCartItem) {
      const newCartItem = { ...existingCartItem, quantity: existingCartItem.quantity + 1 };
      oldCartItems[existingCartItemIndex] = newCartItem;
    } else {
      oldCartItems.push({ ...cartItem, quantity: 1 });
    }
    setCartItems(oldCartItems);
  };

  const removeItemHandler = (sku, removeWhole = false) => {
    const oldCartItems = [...cartItems];
    const existingCartItemIndex = oldCartItems.findIndex((item) => item.sku === sku);
    const existingCartItem = oldCartItems[existingCartItemIndex];
    if (removeWhole) {
      oldCartItems.splice(existingCartItemIndex, 1);
    } else if (existingCartItem.quantity === 1) {
      oldCartItems.splice(existingCartItemIndex, 1);
    } else {
      const newCartItem = { ...existingCartItem, quantity: existingCartItem.quantity - 1 };
      oldCartItems[existingCartItemIndex] = newCartItem;
    }
    setCartItems(oldCartItems);
  };

  const emptyCartHandler = () => {
    setCartItems([]);
  };

  return (
    <CartContex.Provider
      value={
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        {
          cartItems,
          addItemToCart: addItemHandler,
          removeItemFromCart: removeItemHandler,
          emptyCartHandler,
        }
      }
    >
      {children}
    </CartContex.Provider>
  );
}

export default CartContextProvider;
