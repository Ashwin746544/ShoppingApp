import Filter from "../Filter/Filter";
const FilterOptions1 = [
  "Recommended",
  "Recently Added",
  "Expiring Soon",
  "Most Rated",
  "Price: Low → High",
  "Price: High → Low",
];
const FilterOptions2 = ["1954", "1955", "1956", "1957", "1958", "1959"];

const Filters = () => {

  return (
    <>
      <Filter filterTitle="Expanded Filters" filterOptions={FilterOptions1} />
      <Filter
        filterTitle="Year of manufacturing"
        filterOptions={FilterOptions2}
      />
    </>
  );
}

export default Filters;