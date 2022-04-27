import "./Header.css";
import {
  Navbar,
  Container,
  Nav,
} from "react-bootstrap";
import HeaderRight from "../HeaderRight/HeaderRight";
import HeaderMiddle from "../HeaderMiddle/HeaderMiddle";
import { useNavigate } from "react-router-dom";

const Header = ({ searchTextHandler }) => {
  const navigate = useNavigate();
  return (
    <header className="header container-fluid px-0 py-3">
      <Navbar expand="xl" className="py-0">
        <Container fluid className="px-0">
          <Navbar.Brand onClick={() => navigate("/")} className="header__logo py-0 px-3 d-flex align-items-center me-lg-0" style={{ cursor: "pointer" }}>
            <div className="logo-container d-flex align-items-center justify-content-center">
              <span>S</span>
            </div>
            <p className="logo-name mb-0" >Shopka</p>
          </Navbar.Brand>
          <div className="header__middle-container ms-auto d-none d-lg-block d-xl-none">
            <HeaderMiddle searchTextHandler={searchTextHandler} />
          </div>
          <div className="ms-auto d-none header__right-container-out " >
            <HeaderRight />
          </div>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse
            id="navbarScroll"
            className="d-xl-flex justify-content-between ms-5 ms-xl-0 collapse_content"
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
            <div className="header__middle-container me-2 me-sm-0 d-block d-lg-none d-xl-block">
              <HeaderMiddle searchTextHandler={searchTextHandler} />
            </div>
            <div className="my-3 my-sm-0 d-block d-sm-none d-xl-block" >
              <HeaderRight />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
