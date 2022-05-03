import {
  Button,
  Badge,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserIcon from '../../assets/user.svg';
import { CartContex } from '../../Contex/Cart-Contex';

function HeaderRight() {
  const navigate = useNavigate();
  const cartCtx = useContext(CartContex);
  return (
    <div className="d-flex header__Right ps-3 ps-xl-0">
      <Button
        variant="outline-primary"
        className="text general-btn header__Right-signIn actions"
      >
        SignIn
      </Button>
      <button type="button" className="general-btn text actions header__Right-cart" onClick={() => navigate('/bestBuy-shoppingApp/mycart')}>
        My Cart
        {' '}
        {cartCtx.cartItems.length >= 1 && (
          <Badge className="badge" bg="danger">
            {cartCtx.cartItems.length}
          </Badge>
        )}
      </button>
      <button type="button" className="header__Right-profile">
        <img src={UserIcon} alt="user" />
      </button>
    </div>
  );
}

export default HeaderRight;
