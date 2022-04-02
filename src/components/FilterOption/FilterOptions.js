import "./FilterOptions.css";

const FilterOption = ({ name }) => {
  return (
    <div className="filterOption">
      <input type="checkbox" />
      <span>{name}</span>
    </div>
  );
};

export default FilterOption;
