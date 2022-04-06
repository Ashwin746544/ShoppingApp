import "./ProductCard.css";
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import shoesImg from "../../assets/Products/shoes.svg";


const ProductCard = () => {
  return (
    // <div className="col-auto">
    <Card className="p-3 pb-0 product">
      <Card.Img variant="top" src={shoesImg} />
      <Card.Body className="p-0 product__body">
        <p className="product__desc">
          Lee Pucker design. Leather botinki for handsome designers. Free shipping.
        </p>
        <p className="product__price">$ 13.95</p>
        <p className="product__desc-additional">
          1258 bids, 359 watchers
          $5.95 for shipping
        </p>
        <div className="product__bottom">
          <div className="rating-container">
            <div className="rating__icon-container">
              <span>&#11088;&#11088;&#11088;&#11088;&#11088;</span>
            </div>
            <span className="rating__num">4.99</span>
          </div>
          <Button variant="outline-primary" className="product__bottom-btn">Watch</Button>
        </div>
      </Card.Body>
    </Card>
    // </div>
  );
}

export default ProductCard;