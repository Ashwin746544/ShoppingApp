import "./ProductCard.css";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import shoesImg from "../../assets/Products/shoes.svg";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    // <div className="col-auto">
    <Link to={`/product/${product.sku}`} className="product__wrapper-link">
      <Card className="p-3 pb-0 product">
        <Card.Img variant="top" src={product.image} />
        <Card.Body className="p-0 product__body">
          <p className="product__desc">{product.name}</p>
          <p className="product__price">$ {product.salePrice}</p>
          <p className="product__desc-additional">
            1258 bids, 359 watchers $5.95 for shipping
          </p>
          <div className="product__bottom">
            <div className="rating-container">
              <div className="rating__icon-container">
                <span>&#11088;&#11088;&#11088;&#11088;&#11088;</span>
              </div>
              <span className="rating__num">
                {product.customerReviewAverage
                  ? product.customerReviewAverage.toPrecision(2)
                  : "2.5"}
              </span>
            </div>
            <Button variant="outline-primary" className="product__bottom-btn">
              Watch
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Link>
    // </div>
  );
};

export default ProductCard;
