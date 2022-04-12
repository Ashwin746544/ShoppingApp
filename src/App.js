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
import React, { useState } from "react";
import SidebarContext from './SidebarContext';

function App() {
  const [searchText, setSearchText] = useState(null);
  const [selectedSidebarCatId, setSelectedSidebarCatId] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filterReset, setFilterReset] = useState(false);

  const searchTextHandler = (text) => {
    setSearchText(text);
  }

  const changeSelectedSidebarCategory = (id) => {
    console.log("CATEGORY CHANGED");
    setSelectedSidebarCatId(id);
    setSelectedFilters([]);
    setFilterReset(true);
  }

  const addFilter = (filterName, filterQuery) => {
    const existingFilters = [...selectedFilters];
    const currentFilterIndex = existingFilters.findIndex(filter => filter.name === filterName);
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
    console.log("add filter", filterName, filterQuery);
  }
  const removeFilter = (filterName, filterQuery) => {
    const existingFilters = [...selectedFilters];
    const currentFilterIndex = existingFilters.findIndex(filter => filter.name === filterName);
    const newFilter = { ...existingFilters[currentFilterIndex] };
    const existingFilterQueries = [...newFilter.filterQueries];
    const existingFilterQueryIndex = existingFilterQueries.findIndex(query => query === filterQuery);
    existingFilterQueries.splice(existingFilterQueryIndex, 1);
    if (existingFilterQueries.length == 0) {
      existingFilters.splice(currentFilterIndex, 1);
    } else {
      newFilter.filterQueries = existingFilterQueries;
      existingFilters[currentFilterIndex] = newFilter;
    }
    setSelectedFilters(existingFilters);
    console.log("remove filter", filterName, filterQuery);
  }

  return (
    <SidebarContext.Provider value={{
      sidebarCatId: selectedSidebarCatId,
      selectSidebarCategoryHandler: changeSelectedSidebarCategory,
      addFilter: addFilter,
      removeFilter: removeFilter,
      selectedFilters: selectedFilters,
      resetFilter: filterReset
    }}>
      <div className="App">
        <Header searchTextHandler={searchTextHandler} />
        <Layout>
          <Categories />
          <div className="side__main-container">
            <div className="side__main-row">
              <Sidebar />
              <MainContent searchText={searchText} />
            </div>
          </div>
        </Layout>
      </div>
    </SidebarContext.Provider>
  );
}

export default App;
