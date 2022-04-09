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
import SidebarCategoryContext from './SidebarCategoryContext';

function App() {
  const [searchText, setSearchText] = useState(null);
  const [selectedSidebarCatId, setSelectedSidebarCatId] = useState(null);

  const searchTextHandler = (text) => {
    setSearchText(text);
  }

  const changeSelectedSidebarCategory = (id) => {
    console.log("CATEGORY CHANGED");
    setSelectedSidebarCatId(id);
  }

  return (
    <SidebarCategoryContext.Provider value={{ sidebarCatId: selectedSidebarCatId, selectSidebarCategoryHandler: changeSelectedSidebarCategory }}>
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
    </SidebarCategoryContext.Provider>
  );
}

export default App;
