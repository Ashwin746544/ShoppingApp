import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MainContent from '../MainContent/MainContent';
import ProductDetail from '../ProductDetail/ProductDetail';
import RelatedProducts from '../RelateProducts/RelatedProducts';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { pathname } = useLocation();
  // const [isLoading, setIsLoading] = useState(false);
  // const [productDetailIsLoading, setProductIsLoading] = useState(false);
  // const [relatedProductIsLoading, setRelatedProductsIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  // return (!productDetailIsLoading && !relatedProductIsLoading) ? <>
  //   <ProductDetail setProductIsLoading={setProductIsLoading} />
  //   <RelatedProducts setRelatedProductsIsLoading={setRelatedProductsIsLoading} />
  // </> : <LoadingSpinner />;
  return (
    <>
      <ProductDetail />
      <RelatedProducts />
    </>
  );
}

export default ProductDetailPage;