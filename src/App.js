import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import React, { useCallback, useEffect, useState, } from "react";
import SidebarContext from "./SidebarContext";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import ProductDetailPage from "./components/ProductDetailpage/ProductDetailPage";
import CartContextProvider from "./Cart-Contex";
import OrderPage from "./components/OrderPage/OrderPage";
import Cart from "./components/Cart/Cart";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import useHttpRequest from "./useHttpRequest";

const topCategoryUrl = `https://api.bestbuy.com/v1/categories?show=all&pageSize=100&apiKey=0Q75AAetcE7MZUKyrAG9DVI7&format=json&cursorMark=*`;

function App() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(null);
  const [selectedSidebarCatId, setSelectedSidebarCatId] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortingFilterQuery, setSortingFilterQuery] = useState(null);
  const [filterReset, setFilterReset] = useState(false);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const { fetchRequest } = useHttpRequest();


  const searchTextHandler = (text) => {
    setSearchText(text);
  };
  const getCategories = useCallback(async () => {
    const response = await fetchRequest(topCategoryUrl);
    if (response) {
      setCategoriesArray(response.categories);
    } else {
      console.log("ERROR: COULD NOT FETCH CATEGORY");
    }
  }, [fetchRequest]);


  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const changeSelectedSidebarCategory = (id) => {
    navigate("/");
    setSelectedSidebarCatId(id);
    setSelectedFilters([]);
    setFilterReset(true);
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
    if (existingFilterQueries.length === 0) {
      existingFilters.splice(currentFilterIndex, 1);
    } else {
      newFilter.filterQueries = existingFilterQueries;
      existingFilters[currentFilterIndex] = newFilter;
    }
    setSelectedFilters(existingFilters);
  };

  return (
    <CartContextProvider>
      <SidebarContext.Provider
        value={{
          sidebarCatId: selectedSidebarCatId,
          selectSidebarCategoryHandler: changeSelectedSidebarCategory,
          addFilter: addFilter,
          removeFilter: removeFilter,
          selectedFilters: selectedFilters,
          resetFilter: filterReset,
          sortingFilterQuery: sortingFilterQuery,
          selectSortingFilterHandler: changeSelectedSortingHandler,
        }}
      >
        <div className="App">
          <Header searchTextHandler={searchTextHandler} />
          <Routes>
            <Route path="/bestBuy-shoppingApp/*" element={<HomePage categoriesArray={categoriesArray} searchText={searchText} />} />
            <Route path="/bestBuy-shoppingApp/product/:productId" element={<ProductDetailPage key={Date.now()} />} />
            <Route path="/bestBuy-shoppingApp/mycart" element={<Cart />} />
            <Route path="/bestBuy-shoppingApp/order" element={<OrderPage />} />
            <Route path="/bestBuy-shoppingApp/not-found" element={<PageNotFound />} />
          </Routes>
        </div>
      </SidebarContext.Provider>
    </CartContextProvider>
  );
}

export default App;
