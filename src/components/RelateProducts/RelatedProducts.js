import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import './RelatedProducts.css';
import useHttpRequest from '../../useHttpRequest';

const RelatedProducts = ({ setRelatedProductsIsLoading, setRelatedProductsHasError }) => {
  const params = useParams();
  const { isLoading, isError, fetchRequest } = useHttpRequest();
  const [relatedProducts, setRelatedProducts] = useState([]);


  const getRelatedProducts = useCallback(async () => {
    const response = await fetchRequest(`https://api.bestbuy.com/v1/products/${params.productId}/alsoViewed?pageSize=50&apiKey=0Q75AAetcE7MZUKyrAG9DVI7`);
    const transformedProducts = response ? response.results.map(relatedProduct => {
      return {
        sku: relatedProduct.sku,
        image: relatedProduct.images.standard,
        name: relatedProduct.names.title,
        salePrice: relatedProduct.prices.regular,
        customerReviewAverage: relatedProduct.customerReviews.averageScore
      };
    }) : [];
    setRelatedProducts(transformedProducts);
  }, [fetchRequest, params]);


  useEffect(() => {
    getRelatedProducts();
  }, [getRelatedProducts]);


  useEffect(() => {
    setRelatedProductsHasError(isError);
    setRelatedProductsIsLoading(isLoading);
  }, [isLoading, isError, setRelatedProductsHasError, setRelatedProductsIsLoading]);

  return (
    <section className='relatedProducts container mt-5'>
      <h2 className='relatedProducts__title text-center'>Product You May also Like</h2>
      <div className='relatedProduct__content-container mt-4'>
        {relatedProducts.map(product => <ProductCard key={product.sku} product={product} />)}
      </div>
    </section>
  );
}

export default RelatedProducts;