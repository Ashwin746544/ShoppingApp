import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import ProductDetailPage from './Pages/ProductDetailPage/ProductDetailPage';
import CartPage from './Pages/CartPage/CartPage';
import OrderPage from './Pages/OrderPage/OrderPage';
import PageNotFound from './Pages/PageNotFound/PageNotFound';

function AppRoutes({ categoriesArray, searchText }) {
  return (
    <Routes>
      <Route path="/bestBuy-shoppingApp/*" element={<HomePage categoriesArray={categoriesArray} searchText={searchText} />} />
      <Route path="/bestBuy-shoppingApp/product/:productId" element={<ProductDetailPage key={Date.now()} />} />

      <Route path="/bestBuy-shoppingApp/mycart" element={<CartPage />} />
      <Route path="/bestBuy-shoppingApp/order" element={<OrderPage />} />
      <Route path="/bestBuy-shoppingApp/not-found" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
