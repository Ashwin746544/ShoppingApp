import "./Category.css";
import { NavLink } from "react-router-dom";

const Category = ({ category }) => {
  return (
    <NavLink
      className={({ isActive }) => `category ${isActive ? "active" : ""}`}
      to={`/${category.name}`}
    >
      <div>
        <img src={category.iconImg} />
        <p>{category.name}</p>
      </div>
    </NavLink>
  );
};

export default Category;
