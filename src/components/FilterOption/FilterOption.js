import { useContext } from "react";
import "./FilterOption.css";
import SidebarContext from '../../SidebarContext';

// let isInitial = true;
const FilterOption = ({ name, filterName, fQuery }) => {
  const sidebarCtx = useContext(SidebarContext);
  const onChangeHandler = (event) => {
    if (event.target.checked) {
      sidebarCtx.addFilter(filterName, fQuery);
    } else {
      sidebarCtx.removeFilter(filterName, fQuery);
    }
  }
  let isChecked = false;
  const currentFilter = sidebarCtx.selectedFilters.find(filter => filter.name == filterName);
  if (currentFilter) {
    if (currentFilter.filterQueries.includes(fQuery)) {
      isChecked = true;
    }
  }
  return (
    <div className="filterOption">
      <input type="checkbox" onChange={onChangeHandler} checked={isChecked} />
      <span>{name}</span>
    </div>
  );
};

export default FilterOption;
