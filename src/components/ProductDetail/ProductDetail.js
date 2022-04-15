import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import { useEffect, useState } from "react";
import useHttpRequest from '../../useHttpRequest';

// const ProductDetail = ({ setProductIsLoading }) => {
const ProductDetail = () => {
  const params = useParams();
  const { isLoading, isError, fetchRequest } = useHttpRequest();

  const [productDetail, setProductDetail] = useState({});
  useEffect(() => {
    getProductDetail();
    // fetch(
    //   `https://api.bestbuy.com/v1/products(sku=${params.productId})?format=json&show=all&apiKey=0Q75AAetcE7MZUKyrAG9DVI7`
    // )
    //   .then((jsonResponse) => jsonResponse.json())
    //   .then((response) => {
    //     setProductDetail(response.products[0]);
    //     console.log("product detail", response);
    //   });
  }, []);
  // useEffect(() => {
  //   setProductIsLoading(isLoading);
  // }, [isLoading]);
  const getProductDetail = async () => {
    const response = await fetchRequest(`https://api.bestbuy.com/v1/products(sku=${params.productId})?format=json&show=all&apiKey=0Q75AAetcE7MZUKyrAG9DVI7`);
    setProductDetail(response.products[0]);
  }
  return (
    <section className="Product-detail-container container mt-5">
      <div className="product-detail">
        <div className="product__img-container">
          <img src={productDetail.image} />
        </div>
        <div className="product__detail-content">
          <p className="product__detail-name mb-0">{productDetail.name}</p>
          {/* <p className="product__detail-desc">
            {productDetail.longDescription}
          </p> */}
          <p className="text-success mb-0 mt-3" style={{ fontWeight: 600 }}>Regular Price</p>
          <div className="product__detail-price my-2 mt-0 d-flex align-items-center">
            <span className="price">${productDetail.salePrice} </span>
            <span className="badge bg-success ms-3">
              {productDetail.freeShipping && "Free Shipping"}
            </span>
          </div>
          <div className="product__detail-sku my-2">
            <span>
              <strong>Model:</strong>
              {productDetail.modelNumber}&nbsp;&nbsp;&nbsp;
            </span>
            <span>
              <strong>SKU:</strong>
              {productDetail.sku}
            </span>
          </div>
          <div className="product__detail-rating my-2">
            <div>
              <span>⭐⭐⭐⭐⭐</span>
              <span className="ms-2 badge bg-primary py-2">{productDetail.customerReviewAverage || "2.5"}</span>
            </div>
            <div>
              <span className="ms-2">
                ({productDetail.customerReviewCount || "500"} Reviews)
              </span>
              {productDetail.customerTopRated && (
                <span className="badge ms-2 bg-primary py-2" >Top Rated</span>
              )}
            </div>
          </div>
          {/* <p className="product__detail-desc mt-2">
            {productDetail.longDescription}
          </p> */}
          <div className="product__detail-specifications my-2">
            <p className="mb-2">
              <strong>Specifications:</strong>
            </p>
            <table>
              <tbody>
                {productDetail.details &&
                  productDetail.details.map((detail) => (
                    <tr key={detail.name}>
                      <th>{detail.name}</th>
                      <td>{detail.value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
