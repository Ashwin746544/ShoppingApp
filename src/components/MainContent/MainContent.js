import "./MainContent.css";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import ProductCard from "../ProductCard/ProductCard";
import { useEffect, useState } from "react";

const MY_API_KEY = "0Q75AAetcE7MZUKyrAG9DVI7";
const dropdownsArray = [
  { title: "Useless first", items: ["hello", "world", "welcome"] },
  { title: "condition", items: ["hello", "world", "welcome"] },
  { title: "Delivery Options", items: ["cash", "UPI", "Debit"] },
];

// let cursorMark = "*";

const MainContent = ({ searchText }) => {
  console.log("component rendered!");
  const [products, setProducts] = useState([]);
  const [cursorMark, setCursorMark] = useState("*");
  const [loadMore, setLoadMore] = useState(0);
  const [isAppend, setIsAppend] = useState(false);
  let url = "";
  if (searchText) {
    url = `https://api.bestbuy.com/v1/products(${searchText})?show=all&pageSize=5&page=1&apiKey=${MY_API_KEY}&format=json&cursorMark=${cursorMark}`;
  } else {
    url = `https://api.bestbuy.com/v1/products?show=all&pageSize=5&page=1&apiKey=${MY_API_KEY}&format=json&cursorMark=${cursorMark}`;
  }

  useEffect(() => {
    window.addEventListener('scroll', loadMoreProduct);
    // return window.removeEventListener("scroll", loadMoreProduct);
  }, []);


  useEffect(() => {
    getProducts();
  }, [loadMore, searchText]);

  const getProducts = () => {
    console.log("fetched data...");
    fetch(url)
      .then(jsonResponse => jsonResponse.json())
      .then(
        response => {
          console.log(response);
          setCursorMark(response.nextCursorMark);
          // cursorMark = response.nextCursorMark;
          if (isAppend) {
            setProducts((prevProducts) => [...prevProducts, ...response.products]);
            setIsAppend(false);
          } else {
            setProducts([...response.products]);
          }
        }
      ).catch(error => console.log("Error Occured::::" + error));
  }

  function loadMoreProduct() {
    if (window.innerHeight + document.documentElement.scrollTop === (document.scrollingElement.scrollHeight)) {
      setIsAppend(true);
      setLoadMore((prevValue) => prevValue + 1);
      // getProducts();
    }
  }

  return (
    // <div className="col-auto">
    <div className="main__content-container px-3 pt-3">
      <div className="row" style={{ margin: "0 -16px" }}>
        <div className="col-12 px-3">
          <div className="main__content-top d-flex flex-wrap">
            {dropdownsArray.map(dropdownData => <DropdownFilter key={dropdownData.title} dropdownData={dropdownData} />)}
          </div>
        </div>
        <div className="col-12 px-3 py-3">
          <div className="main__content-Middle ">
            {/* <div className="row gx-3"> */}
            {products.map(product => <ProductCard key={product.sku} product={product} />)}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default MainContent;