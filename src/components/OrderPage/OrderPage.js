import OrderSummary from "../OrderSummary/OrderSummary";
import ShippingInfo from "../ShippingInfo/ShippingInfo";
import "./OrderPage.css";

const OrderPage = () => {
  return (
    <section className="orderPage container">
      <div className="orderPage__title"><h2>Getting Your Order</h2></div>
      <div className="orderPage__content">
        <ShippingInfo />
        <OrderSummary />
      </div>
    </section>
  );
}

export default OrderPage;