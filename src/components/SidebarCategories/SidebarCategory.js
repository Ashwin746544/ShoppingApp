import "./SidebarCategory.css";

const SidebarCategory = () => {
  const SidebarCategories = [
    {
      categoryTitle: "Electronics",
      categoryOptions: [
        {
          categoryOptionTitle: "Cell Phones & Smartphones",
          categoryOptionCategoies: [
            "Cell Phone Accessories",
            "Cell Phone Gatgets",
            "Applications",
            "Smart Watches",
          ],
        },
        {
          categoryOptionTitle: "Cell Phones & Smartphones 2",
          categoryOptionCategoies: [
            "Cell Phone Accessories 2",
            "Cell Phone Gatgets 2",
            "Applications 2",
            "Smart Watches 2",
          ],
        },
        { categoryOptionTitle: "Category without nested Category" },
      ],
    },
    {
      categoryTitle: "Electronics 2",
      categoryOptions: [
        {
          categoryOptionTitle: "Cell Phones & Smartphones",
          categoryOptionCategoies: [
            "Cell Phone Accessories",
            "Cell Phone Gatgets",
            "Applications",
            "Smart Watches",
          ],
        },
        {
          categoryOptionTitle: "Cell Phones & Smartphones 2",
          categoryOptionCategoies: [
            "Cell Phone Accessories 2 2",
            "Cell Phone Gatgets 2 2",
            "Applications 2 2",
            "Smart Watches 2 2",
          ],
        },
      ],
    },
  ];
};

export default SidebarCategory;
