import { Routes, Route, Navigate } from 'react-router-dom';
import Categories from '../../components/Categories/Categories';
import Sidebar from '../../components/Sidebar/Sidebar';
import MainContent from '../../components/MainContent/MainContent';

function HomePage({ categoriesArray, searchText }) {
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
