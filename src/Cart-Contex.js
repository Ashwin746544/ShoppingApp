import React, { useEffect, useState } from 'react';


export const CartContex = React.createContext({
  cartItems: [],
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  emptyCartHandler: () => { }
});

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const existingCartItems = JSON.parse(localStorage.getItem("cartItems"));
    console.log("getting cartItems from localStorage", existingCartItems);
    setCartItems(existingCartItems);
  }, []);
  useEffect(() => {
    console.log("setting cartItems in localStorage", cartItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemHandler = (cartItem) => {
    const oldCartItems = [...cartItems];
    console.log("Item Added To Cart:", cartItem);
    const existingCartItemIndex = oldCartItems.findIndex(item => item.sku === cartItem.sku);
    const existingCartItem = oldCartItems[existingCartItemIndex];
    if (existingCartItem) {
      const newCartItem = { ...existingCartItem, quantity: existingCartItem.quantity + 1 };
      oldCartItems[existingCartItemIndex] = newCartItem;
    } else {
      oldCartItems.push({ ...cartItem, quantity: 1 });
    }
    setCartItems(oldCartItems);
  }
  const removeItemHandler = (sku, removeWhole = false) => {
    const oldCartItems = [...cartItems];
    const existingCartItemIndex = oldCartItems.findIndex(item => item.sku === sku);
    const existingCartItem = oldCartItems[existingCartItemIndex];
    if (removeWhole) {
      oldCartItems.splice(existingCartItemIndex, 1);
    } else {
      if (existingCartItem.quantity === 1) {
        oldCartItems.splice(existingCartItemIndex, 1);
      } else {
        const newCartItem = { ...existingCartItem, quantity: existingCartItem.quantity - 1 };
        oldCartItems[existingCartItemIndex] = newCartItem;
      }
    }
    setCartItems(oldCartItems);
    console.log("Item Removed From Cart:", sku);
  }

  const emptyCartHandler = () => {
    setCartItems([]);
  }

  return <CartContex.Provider
    value={{ cartItems: cartItems, addItemToCart: addItemHandler, removeItemFromCart: removeItemHandler, emptyCartHandler: emptyCartHandler }}
  >{children}</CartContex.Provider>
}

export default CartContextProvider;