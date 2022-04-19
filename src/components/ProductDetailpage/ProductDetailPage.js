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
  const [productDetailIsLoading, setProductIsLoading] = useState(false);
  const [relatedProductsIsLoading, setRelatedProductsIsLoading] = useState(false);
  const [productDetailHasError, setProductDetailHasError] = useState(false);
  const [relatedProductsHasError, setRelatedProductsHasError] = useState(false);

  const isLoading = productDetailIsLoading || relatedProductsIsLoading;
  const isError = productDetailHasError || relatedProductsHasError;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return !isLoading ? (
    isError ? <div className='d-flex align-items-center justify-content-center' style={{ height: "100vh", }}><h1>Something went Wrong!</h1></div> :
      <>
        <ProductDetail setProductIsLoading={setProductIsLoading} setProductDetailHasError={setProductDetailHasError} />
        <RelatedProducts setRelatedProductsIsLoading={setRelatedProductsIsLoading} setRelatedProductsHasError={setRelatedProductsHasError} />
      </>)
    : <>
      <ProductDetail setProductIsLoading={setProductIsLoading} setProductDetailHasError={setProductDetailHasError} />
      <RelatedProducts setRelatedProductsIsLoading={setRelatedProductsIsLoading} setRelatedProductsHasError={setRelatedProductsHasError} />
      <LoadingSpinner shouldCoverPage={true} />
    </>;
  // return (
  //   <>
  //     <ProductDetail />
  //     <RelatedProducts />
  //   </>
  // );
}

export default ProductDetailPage;