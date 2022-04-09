import "./DetailCategoryName.css";
import { Link } from "react-router-dom";
import SidebarCategoryContext from '../../SidebarCategoryContext';
import { useContext } from "react";

const DetailCategoryName = ({ children: name, catId }) => {

  const ctx = useContext(SidebarCategoryContext);

  return (
    <div className="DetailCategoryName">
      {/* <Link className="mb-3 text-decoration-none d-inline-block" to={`/${name}`} >{name}</Link> */}
      <p className="mb-3 text-decoration-none d-inline-block" onClick={() => ctx.selectSidebarCategoryHandler(catId)}>{name}</p>
    </div>
  );
}

export default DetailCategoryName;