import React from "react";

const SidebarContext = React.createContext({
  sidebarCatId: null,
  selectSidebarCategoryHandler: () => { },
  selectedFilters: [],
  addFilter: () => { },
  removeFilter: () => { },
  resetFilter: false
});

export default SidebarContext;