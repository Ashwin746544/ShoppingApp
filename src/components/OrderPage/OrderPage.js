import { useState } from "react";
import OrderSummary from "../OrderSummary/OrderSummary";
import ShippingInfo from "../ShippingInfo/ShippingInfo";
import OrderStatus from '../OrderStatus/OrderStatus';
import "./OrderPage.css";

const OrderPage = () => {
  const [totalBill, setTotalBill] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  return (
    <section className="orderPage container">
      <div className="orderPage__title"><h2>{orderPlaced ? "Order Status" : "Getting Your Order"}</h2></div>
      <div className="orderPage__content">
        {
          orderPlaced
            ? <OrderStatus />
            : <>
              <ShippingInfo totalBill={totalBill} setOrderPlaced={setOrderPlaced} />
              <OrderSummary setTotalBill={setTotalBill} />
            </>
        }
      </div>
    </section>
  );
}

export default OrderPage;