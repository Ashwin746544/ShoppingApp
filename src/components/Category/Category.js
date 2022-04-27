import "./Category.css";
import { NavLink } from "react-router-dom";
import concertIcon from '../../assets/Catagories/concert.svg';

const Category = ({ category }) => {
  return (
    <NavLink
      className={({ isActive }) => `category ${isActive ? "active" : ""}`}
      to={`/bestBuy-shoppingApp/category/${category.id}`}
    >
      <div>
        <img src={concertIcon} alt="category" />
        <p>{category.name}</p>
      </div>
    </NavLink>
  );
};

export default Category;
