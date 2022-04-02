import "./Header.css";
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Logo from '../../assets/logo.svg';


const Header = () => {
  return (
    <header className="header container-fluid px-0">
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#" className="header_logo"><img src={Logo} alt="logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 header_links"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1" className="header_links-link">Sell on Shopka</Nav.Link>
              <Nav.Link href="#action2" className="header_links-link">Register</Nav.Link>
            </Nav>
            <Form className="d-flex header_Right">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">SignIn</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;