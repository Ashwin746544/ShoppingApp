import './ShippingInfo.css';
import { Form, Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import Modal from '../Modal/Modal';
import { CartContex } from '../../Contex/Cart-Contex';

function ShippingInfo({ totalBill, setOrderPlaced }) {
  const cartCtx = useContext(CartContex);
  const [openModal, setOpenModal] = useState(false);
  const [userData, setUserData] = useState({ state: 'gujarat', saveDetail: 'false' });
  const [validated, setValidated] = useState(false);
  let timeoutId = '';
  let lastChangedInput = '';

  const checkoutHandler = (shippingInfo) => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push({ orderItems: cartCtx.cartItems, shippingInfo, totalAmout: totalBill });
    localStorage.setItem('orders', JSON.stringify(orders));
    cartCtx.emptyCartHandler();
    setOrderPlaced(true);
  };

  const inputChangeHandler = (event) => {
    const key = event.target.name;
    const value = event.target.value.trim();
    if (lastChangedInput === key) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setUserData({ ...userData, [key]: value });
      }, 500);
    } else {
      timeoutId = setTimeout(() => {
        setUserData((prevUserData) => ({ ...prevUserData, [key]: value }));
      }, 500);
      lastChangedInput = key;
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      setOpenModal(true);
    }
  };

  return (
    <>
      <Modal
        modalHeading="Order Confirmation"
        openModal={openModal}
        cancelHandler={() => setOpenModal(false)}
        proceedHandler={() => checkoutHandler(userData)}
        setOpenModal={setOpenModal}
      >
        Are You Want to Place Order?
      </Modal>
      <div className="shippingInfo">
        <h3>Shipping Information</h3>
        <Form noValidate validated={validated} onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" name="name" onChange={inputChangeHandler} required pattern="[A-Za-z ]{5,}" />
            <Form.Control.Feedback type="invalid">
              Please enter valid name and it should be more than 5 character Long!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Address</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter Address" name="address" onChange={inputChangeHandler} required minLength={15} />
            <Form.Control.Feedback type="invalid">
              name should be more than 15 character Long!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCity">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Enter City" name="city" onChange={inputChangeHandler} required minLength={3} />
            <Form.Control.Feedback type="invalid">
              name should be more than 2 character Long!
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex">
            <Form.Group className="mb-3 me-2" controlId="formBasicState">
              <Form.Label>State</Form.Label>
              <Form.Select aria-label="Default select example" name="state" onChange={inputChangeHandler} required>
                <option value="gujarat">Gujarat</option>
                <option value="rajasthan">Rajasthan</option>
                <option value="maharastra">Maharastra</option>
                <option value="utter predesh">Utter Pradesh</option>
                <option value="karnataka">Karnataka</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicZipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control type="number" placeholder="Enter Zip-Code" name="zipCode" onChange={inputChangeHandler} required pattern="^/(^\d{5}$)|(^\d{5}-\d{4}$)/" />
              <Form.Control.Feedback type="invalid">
                Please enter a valid Zip Code!
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Save this shipping details for future Orders" name="saveDetail" value onChange={inputChangeHandler} />
          </Form.Group>
          <h3>Contact Information</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" onChange={inputChangeHandler} required />
            <Form.Control.Feedback type="invalid">
              Please enter a valid Email!
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              We will never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="Enter Phone" name="phone" onChange={inputChangeHandler} required pattern="^[0-9]{10}$" />
            <Form.Control.Feedback type="invalid">
              Please enter a valid Phone Number!
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Place Order
          </Button>
        </Form>
      </div>
    </>
  );
}

export default ShippingInfo;
