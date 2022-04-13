import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import Filter from "./components/Filter/Filter";
import SidebarCategorises from "./components/SidebarCategories/SidebarCategories";
import Filters from "./components/Filters/Filters";
import Sidebar from "./components/Sidebar/Sidebar";
import Layout from "./components/Layout/Layout";
import MainContent from "./components/MainContent/MainContent";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import React, { useEffect, useState } from "react";
import SidebarContext from "./SidebarContext";
import { Route, Routes, useNavigate } from "react-router-dom";

const topCategoryUrl = `https://api.bestbuy.com/v1/categories?show=all&pageSize=100&apiKey=0Q75AAetcE7MZUKyrAG9DVI7&format=json&cursorMark=*`;

function App() {
  const [searchText, setSearchText] = useState(null);
  const [selectedSidebarCatId, setSelectedSidebarCatId] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortingFilterQuery, setSortingFilterQuery] = useState(null);
  const [filterReset, setFilterReset] = useState(false);
  const [categoriesArray, setCategoriesArray] = useState([]);
  // const [sortingReset, setSortingReset] = useState(false);
  const navigate = useNavigate();
  console.log("App component Rendered!");

  const searchTextHandler = (text) => {
    setSearchText(text);
  };
  const getCategories = () => {
    fetch(topCategoryUrl)
      .then((jsonResponse) => jsonResponse.json())
      .then((response) => {
        console.log("category response", response);
        setCategoriesArray(response.categories);
      })
      .catch((error) => {
        console.log("Error Occured for fetching top category::::" + error);
      });
  };
  useEffect(() => {
    getCategories();
  }, []);

  const changeSelectedSidebarCategory = (id) => {
    navigate("/");
    // console.log("CATEGORY CHANGED");
    setSelectedSidebarCatId(id);
    setSelectedFilters([]);
    setFilterReset(true);
    // setSortingReset(true);
    setSortingFilterQuery(null);
  };
  const changeSelectedSortingHandler = (query) => {
    setSortingFilterQuery(query);
  };

  const addFilter = (filterName, filterQuery) => {
    const existingFilters = [...selectedFilters];
    const currentFilterIndex = existingFilters.findIndex(
      (filter) => filter.name === filterName
    );
    if (currentFilterIndex === -1) {
      const newFilter = { name: filterName, filterQueries: [filterQuery] };
      existingFilters.push(newFilter);
    } else {
      const newFilter = { ...existingFilters[currentFilterIndex] };
      const existingFilterQueries = [...newFilter.filterQueries];
      existingFilterQueries.push(filterQuery);
      newFilter.filterQueries = existingFilterQueries;
      existingFilters[currentFilterIndex] = newFilter;
    }
    setSelectedFilters(existingFilters);
    setFilterReset(false);
    // console.log("add filter", filterName, filterQuery);
  };
  const removeFilter = (filterName, filterQuery) => {
    const existingFilters = [...selectedFilters];
    const currentFilterIndex = existingFilters.findIndex(
      (filter) => filter.name === filterName
    );
    const newFilter = { ...existingFilters[currentFilterIndex] };
    const existingFilterQueries = [...newFilter.filterQueries];
    const existingFilterQueryIndex = existingFilterQueries.findIndex(
      (query) => query === filterQuery
    );
    existingFilterQueries.splice(existingFilterQueryIndex, 1);
    if (existingFilterQueries.length == 0) {
      existingFilters.splice(currentFilterIndex, 1);
    } else {
      newFilter.filterQueries = existingFilterQueries;
      existingFilters[currentFilterIndex] = newFilter;
    }
    setSelectedFilters(existingFilters);
    // console.log("remove filter", filterName, filterQuery);
  };

  return (
    <SidebarContext.Provider
      value={{
        sidebarCatId: selectedSidebarCatId,
        selectSidebarCategoryHandler: changeSelectedSidebarCategory,
        addFilter: addFilter,
        removeFilter: removeFilter,
        selectedFilters: selectedFilters,
        resetFilter: filterReset,
        // resetSorting: sortingReset,
        // setSortingReset: setSortingReset,
        sortingFilterQuery: sortingFilterQuery,
        selectSortingFilterHandler: changeSelectedSortingHandler,
      }}
    >
      <div className="App">
        <Header searchTextHandler={searchTextHandler} />
        <Layout>
          <Categories categoriesArray={categoriesArray} />
          <div className="side__main-container">
            <div className="side__main-row">
              <Sidebar categoriesArray={categoriesArray} />
              <Routes>
                <Route
                  path="/"
                  element={<MainContent searchText={searchText} />}
                />
                <Route
                  path="/category/:categoryId"
                  element={<MainContent searchText={searchText} />}
                />
                <Route path="/product/:productId" element={<ProductDetail />} />
              </Routes>
            </div>
          </div>
        </Layout>
      </div>
    </SidebarContext.Provider>
  );
}

export default App;
