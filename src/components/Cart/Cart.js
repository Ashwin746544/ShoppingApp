import './Cart.css';
import CartItem from '../CartItem/CartItem';
import { CartContex } from '../../Cart-Contex';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';

const DummyCart = [{
  image: "https://pisces.bbystatic.com/prescaled/500/500/image2/BestBuy_US/images/products/3803/3803006_sd.jpg",
  name: "Bowers & Wilkins - STAV 24 S2 24' Speaker Stands (Pair) - Black",
  salePrice: 249.98,
  shippingCost: 10,
  quantity: 3,
  sku: 7380174
}]

const Cart = () => {
  const cartCtx = useContext(CartContex);
  const cartItems = cartCtx.cartItems;
  return (
    <div className='cart-container'>
      {cartItems.map(cartItem => <CartItem key={cartItem.name} cartItem={cartItem} />)}
      <Button variant='primary' className='w-100 mt-4'>Checkout</Button>
    </div>
  );
}

export default Cart;