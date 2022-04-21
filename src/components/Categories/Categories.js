import "./Categories.css";
import HangerIcon from "../../assets/Catagories/hanger.svg";
import CinemaIcon from "../../assets/Catagories/cinema.svg";
import ConcertIcon from "../../assets/Catagories/concert.svg";
import fitnessIcon from "../../assets/Catagories/fitness.svg";
import { Container, Navbar, Nav } from "react-bootstrap";
import Category from "../Category/Category";
import { useEffect, useState } from "react";
import ErrorAlert from "../ErrorAlert/ErrorAlert";


const Categories = ({ categoriesArray }) => {

  const [categories, setCategories] = useState([]);


  useEffect(() => {
    const transformedCategories = categoriesArray.slice(11, 21).map(topCategory => {
      return { name: topCategory.name, id: topCategory.id }
    });
    setCategories(transformedCategories);
  }, [categoriesArray]);

  // let categoriesContent = "";
  // if (categoriesArray.length === 0) {
  //   categoriesContent = <ErrorAlert />
  // } else {
  //   categoriesContent = categories.map((category) => (
  //     <Category key={category.name} category={category} />
  //   ));
  // }

  const categoriesContent = categories.map((category) => (
    <Category key={category.name} category={category} />
  ));

  // console.log(categoriesContent);
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
