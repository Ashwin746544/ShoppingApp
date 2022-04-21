import "./MainContent.css";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import ProductCard from "../ProductCard/ProductCard";
import { useContext, useEffect, useState, useRef } from "react";
import SidebarContext from "../../SidebarContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useParams } from "react-router-dom";
import useHttpRequest from '../../useHttpRequest';
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import arrowUpIcon from '../../assets/arrowUp.svg';

const MY_API_KEY = "0Q75AAetcE7MZUKyrAG9DVI7";
const dropdownsArray = [
  {
    title: "Sort by",
    items: [
      { name: "Latest First", query: "releaseDate.dsc" },
      { name: "Price - Low to High", query: "salePrice.asc" },
      { name: "Price - High to Low", query: "salePrice.dsc" },
      { name: "Rating - Low to High", query: "customerReviewAverage.asc" },
      { name: "Rating - High to Low", query: "customerReviewAverage.desc" },
    ],
  },
  // { title: "condition", items: ["hello", "world", "welcome"] },
  // { title: "Delivery Options", items: ["cash", "UPI", "Debit"] },
];


const MainContent = ({ searchText }) => {

  const params = useParams();
  const ref = useRef();
  // const [paramsState, setParamsState] = useState(params);
  // console.log("PARAMS;;;;;;;;;;", params);
  console.log("Main Contern Rendered");

  const sidebarCtx = useContext(SidebarContext);
  const selectedFilters = sidebarCtx.selectedFilters;
  const sortingFilterQuery = sidebarCtx.sortingFilterQuery;
  const { isLoading, isError, fetchRequest } = useHttpRequest();
  // console.log("component rendered with Filter!", sidebarCtx.selectedFilters);
  const [products, setProducts] = useState([]);
  const [cursorMark, setCursorMark] = useState("*");
  const [loadMore, setLoadMore] = useState(0);
  const [isAppend, setIsAppend] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);
  // const [sortingFilterQuery, setSortingFilterQuery] = useState(null);
  let url = "";

  useEffect(() => {
    ref.current.addEventListener("scroll", loadMoreProduct);
    // return window.removeEventListener("scroll", loadMoreProduct);
  }, []);

  useEffect(() => {
    getProducts();
  }, [
    loadMore,
    searchText,
    sidebarCtx.sidebarCatId,
    selectedFilters,
    sortingFilterQuery,
    params.categoryId
  ]);

  //preparing filter Query
  let filterQueryArray = [];
  for (let filter of selectedFilters) {
    let combinedFilterQuery = filter.filterQueries.join("|");
    filterQueryArray.push(combinedFilterQuery);
  }
  let actualFilterQuery =
    filterQueryArray.length > 1
      ? `(${filterQueryArray.join("&")})`
      : filterQueryArray.join("&");
  // console.log("actualFilterQuery", actualFilterQuery);

  const sortingFilterQueryHandler = (query) => {
    // console.log("PLEASE SORT", query);
    // sidebarCtx.setSortingReset(false);
    sidebarCtx.selectSortingFilterHandler(query);
  };

  const getSortingFilterQuery = () => {
    return sortingFilterQuery ? "sort=" + sortingFilterQuery + "&" : "";
  };
  const wholeQueryArray = [];
  if (params.categoryId) {
    wholeQueryArray.push(`categoryPath.id=${params.categoryId}`);
  } else if (sidebarCtx.sidebarCatId) {
    wholeQueryArray.push(`categoryPath.id=${sidebarCtx.sidebarCatId}`);
  }
  if (searchText) {
    wholeQueryArray.push(searchText);
  }
  if (actualFilterQuery) {
    wholeQueryArray.push(actualFilterQuery);
  }

  url = `https://api.bestbuy.com/v1/products${wholeQueryArray.join("&") ? `(${wholeQueryArray.join("&")})` : ""
    }?show=all&pageSize=5&page=1&${getSortingFilterQuery()}apiKey=${MY_API_KEY}&format=json&cursorMark=${isAppend ? cursorMark : "*"
    }`;
  console.log("MAIN URL", url);
  const getProducts = async () => {
    const response = await fetchRequest(url);
    console.log(response);
    setCursorMark(response.nextCursorMark);
    if (isAppend) {
      setProducts((prevProducts) => [
        ...prevProducts,
        ...response.products,
      ]);
      setIsAppend(false);
    } else {
      setProducts([...response.products]);
    }
  };

  function loadMoreProduct() {
    if (
      // window.innerHeight + document.documentElement.scrollTop ===
      // document.scrollingElement.scrollHeight
      ref.current.clientHeight + ref.current.scrollTop ===
      ref.current.scrollHeight
    ) {
      setIsAppend(true);
      setLoadMore((prevValue) => prevValue + 1);
      console.log("load More");
      // getProducts();
    }
  }

  let content = null;
  if (isLoading) {
    if (isAppend) {
      content = (
        <>
          <div className="main__content-Middle">
            {products.map((product) => (
              <ProductCard key={product.sku} product={product} />
            ))}
          </div>
          <LoadingSpinner isAppend />
        </>
      );
    } else {
      content = <LoadingSpinner />;
    }
  } else {
    if (isError) {
      // content = <div className="text-center"><h1>Something Went Wrong,Try again!</h1></div>;
      content = <ErrorAlert />;
    } else {
      if (products.length == 0) {
        content = <div className="text-center"><h1>Oops,Products not Available!</h1></div>;
      } else {
        content = (
          <div className="main__content-Middle ">
            {/* <div className="row gx-3"> */}
            {products.map((product) => (
              <ProductCard key={product.sku} product={product} />
            ))}
          </div>
        );
      }
    }
  }

  return (
    // <div className="col-auto">
    <div className="main__content-container px-3 pt-3" ref={ref}>
      <button className="main__content-upBtn" onClick={() => ref.current.scrollTop = 0}><img src={arrowUpIcon} alt="up" /></button>
      <div className="row" style={{ margin: "0 -16px" }}>
        <div className="col-12 px-3">
          <div className="main__content-top d-flex flex-wrap">
            {dropdownsArray.map((dropdownData) => (
              <DropdownFilter
                key={dropdownData.title}
                dropdownData={dropdownData}
                sortingFilterQueryHandler={sortingFilterQueryHandler}
              />
            ))}
          </div>
        </div>
        <div className="col-12 px-3 py-3" style={{ minHeight: "600px" }}>
          {content}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default MainContent;
