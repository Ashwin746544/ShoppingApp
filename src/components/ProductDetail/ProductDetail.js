import { useParams } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = () => {
  const params = useParams();
  return (
    <section className="Product-detail">
      This is product Details of {params.productId}
    </section>
  );
};

export default ProductDetail;
