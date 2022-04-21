import './CartItem.css';
import { Button } from 'react-bootstrap';
import CartProductCounterButton from '../CartProductCounterButton/CartProductcounterButton';
import { useContext } from 'react';
import { CartContex } from '../../Cart-Contex';

const CartItem = ({ cartItem }) => {
  const cartCtx = useContext(CartContex);
  console.log(cartItem);
  const total = ((cartItem.salePrice * cartItem.quantity) + cartItem.shippingCost) || 0;
  return (
    <div className='cartItem mb-2'>
      <div className="CartItem__item-detail">
        <h5>{cartItem.name}</h5>
        <img src={cartItem.image} alt={cartItem.name} />
      </div>
      <div className="CartItem__item-summary">
        <h5><strong>Summary:</strong></h5>
        <table>
          <tbody>
            <tr><th>Quantity:</th><td>{cartItem.quantity}</td></tr>
            <tr><th>Price:</th><td>${cartItem.salePrice}</td></tr>
            <tr><th>Shipping Cost:</th><td>${cartItem.shippingCost}</td></tr>
            <tr><th>Total:</th><td>${total.toFixed(2)}</td></tr>
          </tbody>
        </table>
        <div className='careItem__item-actions d-flex mt-2'>
          <CartProductCounterButton
            itemAdded={() => cartCtx.addItemToCart(cartItem)}
            itemRemoved={() => cartCtx.removeItemFromCart(cartItem.sku)}
            count={cartItem.quantity}
          />
          {/* <Button variant="danger" className='mt-1'>Remove From Cart</Button> */}
          <Button variant="danger" className='ms-2' onClick={() => cartCtx.removeItemFromCart(cartItem.sku, true)}>X</Button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;