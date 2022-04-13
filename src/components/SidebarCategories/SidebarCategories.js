import { useEffect, useState } from "react";
import Detail from "../Detail/Detail";
import SidebarCategory from "../SidebarCategory/SidebarCategory";
import "./SidebarCategories.css";

const SidebarCategorises = ({ categoriesArray }) => {


  const [sidebarCategories, setSidebarCategories] = useState([]);
  useEffect(() => {
    const transformedCategories = categoriesArray.slice(0, 10).filter(category => category.subCategories.length > 0);
    setSidebarCategories(transformedCategories);
  }, [categoriesArray]);

  const content = sidebarCategories.map((sidebarCategory, index) => <SidebarCategory key={sidebarCategory.name} sidebarCategory={sidebarCategory} />);

  return (
    <div className="sidebarCategories ps-3">
      <Detail title="All Category" isOpen={true}>
        {content}
      </Detail>
    </div>
  );
};


export default SidebarCategorises;
