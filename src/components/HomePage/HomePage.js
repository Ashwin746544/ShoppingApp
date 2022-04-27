
import Categories from "../Categories/Categories";
import Sidebar from "../Sidebar/Sidebar";
import MainContent from "../MainContent/MainContent";
import { Routes, Route, Navigate } from 'react-router-dom';

const HomePage = ({ categoriesArray, searchText }) => {
  return (
    <>
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
            <Route
              path="*"
              element={<Navigate to="/bestBuy-shoppingApp/not-found" replace />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default HomePage;