import "./FilterOptions.css";

const FilterOption = ({ name, fQuery }) => {
  return (
    <div className="filterOption">
      <input type="checkbox" onChange={() => console.log("FILTER:" + fQuery)} />
      <span>{name}</span>
    </div>
  );
};

export default FilterOption;
