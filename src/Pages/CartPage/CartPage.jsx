import './CartPage.css';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CartContex } from '../../Contex/Cart-Contex';
import CartItem from '../../components/CartItem/CartItem';

function CartPage() {
  const cartCtx = useContext(CartContex);
  const { cartItems } = cartCtx;
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      {cartItems.map((cartItem) => <CartItem key={cartItem.name} cartItem={cartItem} />)}
      {
        cartCtx.cartItems.length > 0
          ? <Button variant="primary" className="w-100 mt-4" onClick={() => navigate('/bestBuy-shoppingApp/order')}>Checkout</Button>
          : (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '500px', fontSize: '20px' }}>
              <strong>
                {' '}
                No Items Added To The Cart,
                <Link to="/bestBuy-shoppingApp/">Explore Products</Link>
              </strong>
            </div>
          )
      }
    </div>
  );
}

export default CartPage;
