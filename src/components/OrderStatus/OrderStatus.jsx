import './OrderStatus.css';
import { Link } from 'react-router-dom';

function OrderStatus() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mx-auto mt-5">
          <div className="payment">
            <div className="payment_header">
              <div className="check"><i className="fa fa-check" aria-hidden="true" /></div>
            </div>
            <div className="content">
              <h1>Order has been Placed Successfully !</h1>
              <p>
                Your order number is:
                <strong>600004503</strong>
              </p>
              <p>We will email you a order details and tracking Info. </p>
              <p>Thank you for your purchase. </p>
              <Link to="/bestBuy-shoppingApp/" className="mt-3 d-inline-block">Continue Shopping</Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderStatus;
