import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import Filter from "./components/Filter/Filter";

function App() {
  const FilterOptions1 = [
    "Recommended",
    "Recently Added",
    "Expiring Soon",
    "Most Rated",
    "Price: Low → High",
    "Price: High → Low",
  ];
  const FilterOptions2 = ["1954", "1955", "1956", "1957", "1958", "1959"];
  return (
    <div className="App">
      <Header />
      <Categories />
      <Filter filterTitle="Expanded Filters" filterOptions={FilterOptions1} />
      <Filter
        filterTitle="Year of manufacturing"
        filterOptions={FilterOptions2}
      />
    </div>
  );
}

export default App;
