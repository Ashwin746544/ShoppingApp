import "./MainContent.css";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import ProductCard from "../ProductCard/ProductCard";
import { useContext, useEffect, useState } from "react";
import SidebarCategoryContext from '../../SidebarCategoryContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const MY_API_KEY = "0Q75AAetcE7MZUKyrAG9DVI7";
const dropdownsArray = [
  { title: "Useless first", items: ["hello", "world", "welcome"] },
  { title: "condition", items: ["hello", "world", "welcome"] },
  { title: "Delivery Options", items: ["cash", "UPI", "Debit"] },
];

// let cursorMark = "*";

const MainContent = ({ searchText }) => {

  const sidebarCategoryCtx = useContext(SidebarCategoryContext);

  console.log("component rendered!", SidebarCategoryContext.sidebarCatId);
  const [products, setProducts] = useState([]);
  const [cursorMark, setCursorMark] = useState("*");
  const [loadMore, setLoadMore] = useState(0);
  const [isAppend, setIsAppend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let url = "";
  if (searchText) {
    url = `https://api.bestbuy.com/v1/products(${searchText})?show=all&pageSize=5&page=1&apiKey=${MY_API_KEY}&format=json&cursorMark=${cursorMark}`;
  } else if (sidebarCategoryCtx.sidebarCatId) {
    url = `https://api.bestbuy.com/v1/products(categoryPath.id=${sidebarCategoryCtx.sidebarCatId})?show=all&pageSize=5&page=1&apiKey=${MY_API_KEY}&format=json&cursorMark=${cursorMark}`;
  }
  else {
    url = `https://api.bestbuy.com/v1/products?show=all&pageSize=5&page=1&apiKey=${MY_API_KEY}&format=json&cursorMark=${cursorMark}`;
  }
  console.log(url);
  useEffect(() => {
    window.addEventListener('scroll', loadMoreProduct);
    // return window.removeEventListener("scroll", loadMoreProduct);
  }, []);


  useEffect(() => {
    getProducts();
  }, [loadMore, searchText, sidebarCategoryCtx.sidebarCatId]);

  const getProducts = () => {
    console.log("fetched data...");
    setIsLoading(true);
    fetch(url)
      .then(jsonResponse => jsonResponse.json())
      .then(
        response => {
          console.log(response);
          setCursorMark(response.nextCursorMark);
          if (isAppend) {
            setProducts((prevProducts) => [...prevProducts, ...response.products]);
            setIsAppend(false);
            setIsLoading(false);
          } else {
            setProducts([...response.products]);
            setIsLoading(false);
          }
        }
      ).catch(error => {
        console.log("Error Occured::::" + error);
        setIsLoading(false);
      }
      );
  }

  function loadMoreProduct() {
    if (window.innerHeight + document.documentElement.scrollTop === (document.scrollingElement.scrollHeight)) {
      setIsAppend(true);
      setLoadMore((prevValue) => prevValue + 1);
      // getProducts();
    }
  }

  let content = null;
  if (isLoading) {
    if (isAppend) {
      console.log("LOADING + APPEND");
      content = <><div className="main__content-Middle ">
        {/* <div className="row gx-3"> */}
        {products.map(product => <ProductCard key={product.sku} product={product} />)}
      </div><LoadingSpinner isAppend /></>;
    } else {
      console.log("ONLY LOADING");
      content = <LoadingSpinner />;
    }
  } else {
    console.log("NOT LOADING");
    content = <div className="main__content-Middle ">
      {/* <div className="row gx-3"> */}
      {products.map(product => <ProductCard key={product.sku} product={product} />)}
    </div>;
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
        <div className="col-12 px-3 py-3" style={{ minHeight: "600px" }}>
          {content}
        </div>
      </div>
    </div>
    // </div>
  );
}

export default MainContent;