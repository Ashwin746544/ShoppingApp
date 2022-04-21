import { useContext, useEffect } from "react";
import "./OrderSummary.css";
import { CartContex } from '../../Cart-Contex';

const OrderSummary = ({ setTotalBill }) => {
  const cartCtx = useContext(CartContex);
  const subTotal = cartCtx.cartItems.reduce((sum, cartItem) => ((cartItem.salePrice * cartItem.quantity) + cartItem.shippingCost) + sum, 0);
  const total = subTotal + ((subTotal * 6.75) / 100);

  useEffect(() => {
    setTotalBill(total);
  }, [setTotalBill, total]);


  return (
    <div className="orderSummary">
      <div className="orderSummary__title">
        <h3>Order Summary</h3>
      </div>
      <div className="orderSummary__content">
        <table>
          <tbody>
            {cartCtx.cartItems.map(cartItem => <tr key={cartItem.name}>
              <td className="img-container">
                <img src={cartItem.image} alt={cartItem.name} />
              </td>
              <td>
                <p>{cartItem.name}</p>
              </td>
              <td>
                <p className="mb-1"><strong>${cartItem.salePrice}</strong></p>
                <p>QTY: {cartItem.quantity}</p>
                <hr />
                <p><strong>${(cartItem.salePrice * cartItem.quantity).toFixed(2)}</strong></p>
              </td>
            </tr>
            )}
            <tr><td colSpan={3}><hr style={{ backgroundColor: "gray", height: "2px", margin: "1rem -10px" }}></hr></td></tr>
            <tr>
              <td colSpan={2}>
                <p>Items Subtotal</p>
              </td>
              <td>
                <p><strong>${subTotal.toFixed(2)}</strong></p>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <p>Sales Tax(including GST%)</p>
              </td>
              <td>
                <p>6.75%</p>
              </td>
            </tr>
            <tr><td colSpan={3}><hr style={{ backgroundColor: "gray", height: "2px", margin: "1rem -10px" }}></hr></td></tr>
            <tr>
              <td colSpan={2}>
                <p>Total</p>
              </td>
              <td>
                <p><strong>${total.toFixed(2)}</strong></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderSummary;