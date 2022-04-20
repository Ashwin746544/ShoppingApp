import './Cart.css';
import CartItem from '../CartItem/CartItem';
import { CartContex } from '../../Cart-Contex';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


const Cart = () => {
  const cartCtx = useContext(CartContex);
  const cartItems = cartCtx.cartItems;
  const navigate = useNavigate();
  return (
    <div className='cart-container'>
      {cartItems.map(cartItem => <CartItem key={cartItem.name} cartItem={cartItem} />)}
      {
        cartCtx.cartItems.length > 0
          ? <Button variant='primary' className='w-100 mt-4' onClick={() => navigate("/order")}>Checkout</Button>
          : <div className='d-flex justify-content-center align-items-center' style={{ height: "500px", fontSize: "20px" }}>
            <strong> No Items Added To The Cart,<Link to="/">Explore Products</Link></strong>
          </div>}
    </div>
  );
}

export default Cart;