import { useState } from 'react';
import ProductDetail from '../ProductDetail/ProductDetail';
import RelatedProducts from '../RelateProducts/RelatedProducts';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './ProductDetailPage.css';
import ErrorAlert from '../ErrorAlert/ErrorAlert';

const ProductDetailPage = () => {
  const [productDetailIsLoading, setProductIsLoading] = useState(false);
  const [relatedProductsIsLoading, setRelatedProductsIsLoading] = useState(false);
  const [productDetailHasError, setProductDetailHasError] = useState(false);
  const [relatedProductsHasError, setRelatedProductsHasError] = useState(false);

  const isLoading = productDetailIsLoading || relatedProductsIsLoading;
  const isError = productDetailHasError || relatedProductsHasError;

  return !isLoading ? (
    isError ? <ErrorAlert onlyRefresh /> :
      <>
        <ProductDetail setProductIsLoading={setProductIsLoading} setProductDetailHasError={setProductDetailHasError} />
        <RelatedProducts setRelatedProductsIsLoading={setRelatedProductsIsLoading} setRelatedProductsHasError={setRelatedProductsHasError} />
      </>)
    : <>
      <ProductDetail setProductIsLoading={setProductIsLoading} setProductDetailHasError={setProductDetailHasError} />
      <RelatedProducts setRelatedProductsIsLoading={setRelatedProductsIsLoading} setRelatedProductsHasError={setRelatedProductsHasError} />
      <LoadingSpinner shouldCoverPage={true} />
    </>;
}

export default ProductDetailPage;