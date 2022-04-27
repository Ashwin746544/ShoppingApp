import Filters from "../Filters/Filters";
import SidebarCategorises from "../SidebarCategories/SidebarCategories";
import "./Sidebar.css";
import RightArrow from "../../assets/right.svg";
import LeftArrow from "../../assets/left.svg";
import { useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import storesIcon from '../../assets/stores.svg';

const Sidebar = ({ categoriesArray }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [clicked, setClicked] = useState(false);

  const sidebarDisplayToggleHandler = () => {
    setClicked(true);
    setSidebarOpen((previousState) => !previousState);
  }
  return (
    <>
      {sidebarOpen ? <Backdrop onClick={sidebarDisplayToggleHandler} /> : null}
      <div className="sidebar" style={{ left: sidebarOpen ? "0" : (clicked && "-305px"), height: window.innerWidth < 992 ? "calc(100vh - 256px + 42px)" : "calc(100vh - 256px)" }}>
        <div className="sidebar__content-container">
          <button className="store__btn" ><img src={storesIcon} alt="stores" />Stores</button>
          <SidebarCategorises categoriesArray={categoriesArray} />
          <Filters />
        </div>
        <div className="sidebar__button-container d-block d-lg-none">
          <button onClick={sidebarDisplayToggleHandler} style={{ border: sidebarOpen && "none" }}><img src={sidebarOpen ? LeftArrow : RightArrow} alt="right" /></button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
