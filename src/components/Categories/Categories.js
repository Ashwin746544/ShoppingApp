import "./Categories.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import Category from "../Category/Category";
import { useEffect, useState } from "react";


const Categories = ({ categoriesArray }) => {

  const [categories, setCategories] = useState([]);


  useEffect(() => {
    const transformedCategories = categoriesArray.slice(11, 21).map(topCategory => {
      return { name: topCategory.name, id: topCategory.id }
    });
    setCategories(transformedCategories);
  }, [categoriesArray]);

  const categoriesContent = categories.map((category) => (
    <Category key={category.name} category={category} />
  ));

  return (
    <Container className="categories mt-4" fluid>
      <Navbar bg="none" expand="md" className="py-0">
        <Container className="categories__navbar">
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="text"
          />
          <Navbar.Collapse id="basic-navbar-nav pt-3">
            <Nav className="me-auto categories__wrapper">
              {categoriesContent}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};

export default Categories;
