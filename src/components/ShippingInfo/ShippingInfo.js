import "./ShippingInfo.css";
import { Form, Button } from 'react-bootstrap';
import { useState } from "react";
import GenericModal from "../GenericModal/GenericModal";

const ShippingInfo = () => {
  const [openModal, setOpenModal] = useState(false);
  const [userData, setUserData] = useState({});
  let outerUserData = {};
  let name = "";
  let timeoutId = "";
  let lastChangedInput = "";
  console.log("Shipping Info rendered!");

  const checkoutHandler = (data) => {
    // console.log("name::", name);
    console.log("USER DATA::", data);
  }

  const inputChangeHandler = (event) => {
    const key = event.target.name;
    const value = event.target.value.trim();
    console.log(event.target.name);

    // console.log("lastChangedInput", lastChangedInput, "and current input", key);
    // if (lastChangedInput == key) {
    //   clearTimeout(timeoutId);
    //   console.log("lastkey is same");
    // }
    // lastChangedInput = key;


    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setUserData({ ...userData, [key]: value });
    }, 500);


    // lastChangedInput = key;


    // setUserData({ ...userData, [key]: value });
    // outerUserData = { ...outerUserData, key: value };
    // outerUserData[key] = value;
  }

  const submitHandler = (event) => {
    console.log("name::", name);
    event.preventDefault();
    setOpenModal(true);
  }
  return (
    <>
      {/* {openModal && <GenericModal
        modalHeading="Order Confirmation"
        openModal={openModal}
        cancelHandler={() => setOpenModal(false)}
        proceedHandler={() => checkoutHandler(userData)}
        setOpenModal={setOpenModal}>
        Are You Want to Proceed Further?
      </GenericModal>} */}
      <GenericModal
        modalHeading="Order Confirmation"
        openModal={openModal}
        cancelHandler={() => setOpenModal(false)}
        proceedHandler={() => checkoutHandler(userData)}
        setOpenModal={setOpenModal}>
        Are You Want to Proceed Further?
      </GenericModal>
      <div className="shippingInfo">
        <h3>Shipping Information</h3>
        <Form onSubmit={submitHandler} >
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" name="name" onChange={inputChangeHandler} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Address</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter Address" name="address" onChange={inputChangeHandler} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCity">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Enter City" name="city" onChange={inputChangeHandler} required />
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
              <Form.Control type="number" placeholder="Enter Zip-Code" name="zipCode" onChange={inputChangeHandler} required />
            </Form.Group>
          </div>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Save this shipping details for future Orders" name="saveDetail" onChange={inputChangeHandler} />
          </Form.Group>
          <h3>Contact Information</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" onChange={inputChangeHandler} required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="number" placeholder="Enter Phone" name="phone" onChange={inputChangeHandler} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Order Now
          </Button>
        </Form>
      </div>
    </>
  );
}

export default ShippingInfo;