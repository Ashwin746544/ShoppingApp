import {
  Button,
  Badge,
} from "react-bootstrap";
import UserIcon from "../../assets/user.svg";
const HeaderRight = () => {

  return (
    <div className="d-flex header__Right ps-3 ps-xl-0">
      <Button
        variant="outline-success"
        className="text general-btn header__Right-signIn actions"
      >
        SignIn
      </Button>
      <button className="general-btn text actions header__Right-cart">
        My Cart{" "}
        <Badge className="badge" bg="danger">
          5
        </Badge>
      </button>
      <button className="header__Right-profile">
        <img src={UserIcon} />
      </button>
    </div>);
}

export default HeaderRight;