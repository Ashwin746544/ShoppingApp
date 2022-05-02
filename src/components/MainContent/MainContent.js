import "./MainContent.css";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import ProductCard from "../ProductCard/ProductCard";
import { useContext, useEffect, useState, useRef, useCallback } from "react";
import SidebarContext from "../../SidebarContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useParams } from "react-router-dom";
import useHttpRequest from '../../useHttpRequest';
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import arrowUpIcon from '../../assets/arrowUp.svg';
import InfiniteScroll from 'react-infinite-scroll-component';

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
  const sidebarCtx = useContext(SidebarContext);
  const selectedFilters = sidebarCtx.selectedFilters;
  const sortingFilterQuery = sidebarCtx.sortingFilterQuery;
  const { isLoading, isError, fetchRequest } = useHttpRequest();
  const [products, setProducts] = useState([]);
  const [cursorMark, setCursorMark] = useState("*");
  const [windowScrolled, setWindowScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // ArrowUp Scroll Handling
  const handleScrollButton = () => {
    if (window.scrollY > 200) {
      setWindowScrolled(true);
    } else {
      setWindowScrolled(false);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScrollButton);
  }, []);

  let url = "";

  const getProducts = async () => {
    const response = await fetchRequest(url);
    if (response) {
      setCursorMark(response.nextCursorMark);
      if (currentPage > 1) {
        setProducts((prevProducts) => [
          ...prevProducts,
          ...response.products,
        ]);
      } else {
        setProducts([...response.products]);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, [
    currentPage,
    searchText,
    sidebarCtx.sidebarCatId,
    selectedFilters,
    sortingFilterQuery,
    params.categoryId,
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


  //Sorting handler    
  const sortingFilterQueryHandler = (query) => {
    setCurrentPage(1);
    sidebarCtx.selectSortingFilterHandler(query);
  };

  const getSortingFilterQuery = () => {
    return sortingFilterQuery ? "sort=" + sortingFilterQuery + "&" : "";
  };

  // making url ready for search,category and fitler all together 
  const wholeQueryArray = [];
  if (params.categoryId) {
    wholeQueryArray.push(`categoryPath.id=${params.categoryId}`);
  } else if (sidebarCtx.sidebarCatId) {
    wholeQueryArray.push(`categoryPath.id=${sidebarCtx.sidebarCatId}`);
  }
  if (searchText) {
    console.log(searchText);
    wholeQueryArray.push(searchText);
  }
  if (actualFilterQuery) {
    wholeQueryArray.push(actualFilterQuery);
  }
  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [actualFilterQuery]);

  url = `https://api.bestbuy.com/v1/products${wholeQueryArray.join("&") ? `(${wholeQueryArray.join("&")})` : ""
    }?show=all&pageSize=5&page=1&${getSortingFilterQuery()}apiKey=${MY_API_KEY}&format=json&cursorMark=${currentPage > 1 ? cursorMark : "*"
    }`;


  const loadMoreData = () => {
    console.log(isLoading);
    if (isLoading) {
      console.log("return");
      return;
    }
    setCurrentPage((prevValue) => prevValue + 1);
  }

  let content = null;
  if (isLoading) {
    if (currentPage > 1) {
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
      content = <ErrorAlert />;
    } else {
      if (products.length === 0) {
        content = <div className="text-center"><h1>Oops,Products not Available!</h1></div>;
      } else {
        content = (
          <div className="main__content-Middle ">
            {products.map((product) => (
              <ProductCard key={product.sku} product={product} />
            ))}
          </div>
        );
      }
    }
  }

  return (
    <div id="scrollableDiv" className="main__content-container">
      <InfiniteScroll
        // dataLength={currentPage * 5}
        dataLength={Date.now()}
        next={loadMoreData}
        hasMore={true}
        scrollThreshold="0px"
      >
        {windowScrolled && <button className="main__content-upBtn" onClick={() => window.scrollTo(0, 0)}><img src={arrowUpIcon} alt="up" /></button>}
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
      </InfiniteScroll>
    </div>
  );
};

export default MainContent;
