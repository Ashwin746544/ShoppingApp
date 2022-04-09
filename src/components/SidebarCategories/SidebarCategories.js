import { useEffect, useState } from "react";
import Detail from "../Detail/Detail";
import SidebarCategory from "../SidebarCategory/SidebarCategory";
import "./SidebarCategories.css";

const SidebarCategorises = () => {


  const [sidebarCategories, setSidebarCategories] = useState([]);
  useEffect(() => {
    fetch("https://api.bestbuy.com/v1/categories?format=json&show=name,subCategories&apiKey=0Q75AAetcE7MZUKyrAG9DVI7")
      .then(jsonResponse => jsonResponse.json())
      .then(response => {
        console.log(response);
        const transformedResponsed = response.categories.filter(category => category.subCategories.length > 0);
        setSidebarCategories(transformedResponsed);
      });
  }, []);
  // const sidebarCategories = [
  //   {
  //     title: "Electronics",
  //     options: [
  //       {
  //         optionTitle: "Cell Phones & Smartphones",
  //         optionCategories: [
  //           "Cell Phone Accessories",
  //           "Cell Phone Gatgets",
  //           "Applications",
  //           "Smart Watches",
  //         ],
  //       },
  //       {
  //         optionTitle: "Cell Phones & Smartphones 2",
  //         optionCategories: [
  //           "Cell Phone Accessories 2",
  //           "Cell Phone Gatgets 2",
  //           "Applications 2",
  //           "Smart Watches 2",
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     title: "Electronics 2",
  //     options: [
  //       {
  //         optionTitle: "Cell Phones & Smartphones",
  //         optionCategories: [
  //           "Cell Phone Accessories",
  //           "Cell Phone Gatgets",
  //           "Applications",
  //           "Smart Watches",
  //         ],
  //       },
  //       {
  //         optionTitle: "Cell Phones & Smartphones 2",
  //         optionCategories: [
  //           "Cell Phone Accessories 2 2",
  //           "Cell Phone Gatgets 2 2",
  //           "Applications 2 2",
  //           "Smart Watches 2 2",
  //         ],
  //       },
  //     ],
  //   },
  // ];
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
