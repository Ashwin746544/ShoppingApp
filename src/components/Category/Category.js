import "./Category.css";
import { NavLink } from "react-router-dom";

const Category = ({ category }) => {
  return (
    <NavLink
      activeClassName="active"
      to={`/${category.name}`}
      className="category"
    >
      <div>
        <img src={category.iconImg} />
        <p>{category.name}</p>
      </div>
    </NavLink>
  );
};

export default Category;
