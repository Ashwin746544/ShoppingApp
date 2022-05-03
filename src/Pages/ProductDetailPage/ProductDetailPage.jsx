import { useState } from 'react';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import RelatedProducts from '../../components/RelateProducts/RelatedProducts';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './ProductDetailPage.css';
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';

function ProductDetailPage() {
  const [productDetailIsLoading, setProductIsLoading] = useState(false);
  const [relatedProductsIsLoading, setRelatedProductsIsLoading] = useState(false);
  const [productDetailHasError, setProductDetailHasError] = useState(false);
  const [relatedProductsHasError, setRelatedProductsHasError] = useState(false);

  const isLoading = productDetailIsLoading || relatedProductsIsLoading;
  const isError = productDetailHasError || relatedProductsHasError;

  const ErrorContent = isError ? <ErrorAlert onlyRefresh />
    : (
      <>
        <ProductDetail
          setProductIsLoading={setProductIsLoading}
          setProductDetailHasError={setProductDetailHasError}
        />
        <RelatedProducts
          setRelatedProductsIsLoading={setRelatedProductsIsLoading}
          setRelatedProductsHasError={setRelatedProductsHasError}
        />
      </>
    );

  const LoadingContent = (
    <>
      <ProductDetail
        setProductIsLoading={setProductIsLoading}
        setProductDetailHasError={setProductDetailHasError}
      />
      <RelatedProducts
        setRelatedProductsIsLoading={setRelatedProductsIsLoading}
        setRelatedProductsHasError={setRelatedProductsHasError}
      />
      <LoadingSpinner shouldCoverPage />
    </>
  );
  return !isLoading ? ErrorContent : LoadingContent;
}

export default ProductDetailPage;
