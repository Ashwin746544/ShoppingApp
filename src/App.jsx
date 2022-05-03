import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import Header from './components/Header/Header';
import CartContextProvider from './Contex/Cart-Contex';
import useHttpRequest from './Hooks/useHttpRequest';
import { SidebarContextProvider } from './Contex/SidebarContext';
import AppRoutes from './AppRoutes';
import CONSTANTS from './Variables';

function App() {
  const [searchText, setSearchText] = useState(null);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const { fetchRequest } = useHttpRequest();
  const { pathname } = useLocation();

  const searchTextHandler = (text) => {
    setSearchText(text);
  };

  const getCategories = useCallback(async () => {
    const response = await fetchRequest(CONSTANTS.topCategoryUrl);
    if (response) {
      setCategoriesArray(response.categories);
    } else {
      // console.log('ERROR: COULD NOT FETCH CATEGORY');
    }
  }, [fetchRequest]);

  useEffect(() => {
    if (matchPath({ path: '/bestBuy-shoppingApp' }, pathname) || matchPath({ path: '/bestBuy-shoppingApp/category/:categoryId' }, pathname)) {
      getCategories();
    }
  }, [getCategories, pathname]);

  return (
    <CartContextProvider>
      <SidebarContextProvider>
        <div className="App">
          <Header searchTextHandler={searchTextHandler} />
          <AppRoutes categoriesArray={categoriesArray} searchText={searchText} />
        </div>
      </SidebarContextProvider>
    </CartContextProvider>
  );
}

export default App;
