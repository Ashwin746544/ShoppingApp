import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import { useContext, useEffect, useState } from "react";
import useHttpRequest from '../../useHttpRequest';
import { Button } from 'react-bootstrap';
import CartProductCounterButton from "../CartProductCounterButton/CartProductcounterButton";
import { CartContex } from '../../Cart-Contex';

const ProductDetail = ({ setProductIsLoading, setProductDetailHasError }) => {
  // const ProductDetail = () => {

  const cartCtx = useContext(CartContex);
  const params = useParams();
  const { isLoading, isError, fetchRequest } = useHttpRequest();
  const [productDetail, setProductDetail] = useState({});
  const showProductCounter = cartCtx.cartItems.find(item => item.sku === productDetail.sku) ? true : false;
  // console.log("product Detail:", productDetail);
  const cartItemDetail = {
    sku: productDetail.sku,
    name: productDetail.name,
    image: productDetail.image,
    salePrice: productDetail.salePrice,
    shippingCost: productDetail.shippingCost
  }

  useEffect(() => {
    console.log("PARAMS Changes");
    getProductDetail();
  }, [params]);
  useEffect(() => {
    console.log("Product Detail Loading:", isLoading);
    setProductDetailHasError(isError);
    setProductIsLoading(isLoading);
  }, [isLoading, isError]);
  const getProductDetail = async () => {
    console.log(params.productId);
    const response = await fetchRequest(`https://api.bestbuy.com/v1/products(sku=${params.productId})?format=json&show=all&apiKey=0Q75AAetcE7MZUKyrAG9DVI7`);
    setProductDetail(response.products[0]);
    console.log(response.products[0]);
  }

  const getProductCountFromCartItem = () => {
    const currentCartItem = cartCtx.cartItems.find(item => item.sku === productDetail.sku);
    return currentCartItem ? currentCartItem.quantity : 0;
  }
  return (
    <section className="Product-detail-container container mt-5">
      <div className="product-detail">
        <div className="product__img-container">
          <img src={productDetail.image} alt={productDetail.name} />
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
          <div className="product__order-container d-flex mt-3">
            {!showProductCounter && <Button variant="primary" onClick={() => cartCtx.addItemToCart(cartItemDetail)}>Add To Cart</Button>}
            {showProductCounter && <><CartProductCounterButton
              itemAdded={() => cartCtx.addItemToCart(cartItemDetail)}
              itemRemoved={() => cartCtx.removeItemFromCart(cartItemDetail.sku)}
              count={getProductCountFromCartItem()}
            />
              <Button variant="danger" onClick={() => cartCtx.removeItemFromCart(cartItemDetail.sku, true)}>Remove From Cart</Button></>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
