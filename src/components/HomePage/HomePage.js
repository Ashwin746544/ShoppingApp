import Layout from '../Layout/Layout';
import Categories from "../Categories/Categories";
import Filter from "../Filter/Filter";
import SidebarCategorises from "../SidebarCategories/SidebarCategories";
import Filters from "../Filters/Filters";
import Sidebar from "../Sidebar/Sidebar";
import MainContent from "../MainContent/MainContent";
import { Routes, Route } from 'react-router-dom';

const HomePage = ({ categoriesArray, searchText }) => {
  console.log("HOMEPAGE rendered")
  return (
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
          </Routes>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;