import "./Header.css";
import SearchIcon from "../../assets/search.svg";
import UserIcon from "../../assets/user.svg";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
  Badge,
} from "react-bootstrap";
import Logo from "../../assets/logo.svg";

const Header = () => {
  return (
    <header className="header container-fluid px-0 py-3">
      <Navbar bg="light" expand="lg" className="py-0">
        <Container fluid className="px-0">
          <Navbar.Brand href="#" className="header__logo py-0 px-3">
            <img src={Logo} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse
            id="navbarScroll"
            className="d-lg-flex justify-content-between"
          >
            <Nav
              className="my-2 my-lg-0 header__links"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link
                href="#action1"
                className="header__links-link text px-3 py-1"
              >
                Sell on Shopka
              </Nav.Link>
              <Nav.Link
                href="#action2"
                className="header__links-link text px-3 py-1"
              >
                Register
              </Nav.Link>
            </Nav>
            <div className="header__middle">
              <div className="header__middle-search circularDiv p-2">
                <img src={SearchIcon} />
                <input type="search" placeholder="search..." className="ms-1" />
              </div>
              <p className="text px-3 py-1 mb-0">Consumer Electronics</p>
            </div>
            <div className="d-flex header__Right">
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
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
