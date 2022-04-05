import "./DetailCategoryName.css";
import { Link } from "react-router-dom";

const DetailCategoryName = ({ children: name }) => {

  return (
    <div className="DetailCategoryName">
      <Link className="mb-3 text-decoration-none d-inline-block" to={`/${name}`} >{name}</Link>
    </div>);
}

export default DetailCategoryName;