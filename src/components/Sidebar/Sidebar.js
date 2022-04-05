import Filters from "../Filters/Filters";
import SidebarCategorises from "../SidebarCategories/SidebarCategories";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className=" col-auto">
      <div className="sidebar">
        <SidebarCategorises />
        <Filters />
      </div>
    </div>
  );
};

export default Sidebar;
