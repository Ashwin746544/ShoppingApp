import './MainContent.css';
import {
  useContext, useEffect, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import DropdownFilter from '../DropdownFilter/DropdownFilter';
import ProductCard from '../ProductCard/ProductCard';
import SidebarContext from '../../Contex/SidebarContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import useHttpRequest from '../../Hooks/useHttpRequest';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import arrowUpIcon from '../../assets/arrowUp.svg';
import CONSTANTS from '../../Variables';

function MainContent({ searchText }) {
  const params = useParams();
  const sidebarCtx = useContext(SidebarContext);
  const { selectedFilters } = sidebarCtx;
  const { sortingFilterQuery } = sidebarCtx;
  const { isLoading, isError, fetchRequest } = useHttpRequest();
  const [products, setProducts] = useState([]);
  const [cursorMark, setCursorMark] = useState('*');
  const [windowScrolled, setWindowScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // ArrowUp Scroll Handling
  const handleScrollButton = () => {
    if (window.scrollY > 200) {
      setWindowScrolled(true);
    } else {
      setWindowScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollButton);
  }, []);

  let url = '';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPage,
    searchText,
    sidebarCtx.sidebarCatId,
    selectedFilters,
    sortingFilterQuery,
    params.categoryId,
  ]);

  // preparing filter Query
  const filterQueryArray = [];
  selectedFilters.forEach((filter) => {
    const combinedFilterQuery = filter.filterQueries.join('|');
    filterQueryArray.push(combinedFilterQuery);
  });

  const actualFilterQuery = filterQueryArray.length > 1
    ? `(${filterQueryArray.join('&')})`
    : filterQueryArray.join('&');

  // Sorting handler
  const sortingFilterQueryHandler = (query) => {
    setCurrentPage(1);
    sidebarCtx.selectSortingFilterHandler(query);
  };

  const getSortingFilterQuery = () => (sortingFilterQuery ? `sort=${sortingFilterQuery}&` : '');

  // making url ready for search,category and fitler all together
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

  url = `https://api.bestbuy.com/v1/products${wholeQueryArray.join('&') ? `(${wholeQueryArray.join('&')})` : ''}?show=all&pageSize=5&page=1&${getSortingFilterQuery()}apiKey=${CONSTANTS.MY_API_KEY}&format=json&cursorMark=${currentPage > 1 ? cursorMark : '*'}`;

  const loadMoreData = () => {
    if (isLoading || isError) {
      return;
    }
    setCurrentPage((prevValue) => prevValue + 1);
  };

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
  } else if (isError) {
    content = <ErrorAlert />;
  } else if (products.length === 0) {
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

  return (
    <div id="scrollableDiv" className="main__content-container">
      <InfiniteScroll
        // dataLength={currentPage * 5}
        dataLength={Date.now()}
        next={loadMoreData}
        hasMore
        scrollThreshold="0px"
      >
        {windowScrolled && <button type="button" className="main__content-upBtn" onClick={() => window.scrollTo(0, 0)}><img src={arrowUpIcon} alt="up" /></button>}
        <div className="row" style={{ margin: '0 -16px' }}>
          <div className="col-12 px-3">
            <div className="main__content-top d-flex flex-wrap">
              {CONSTANTS.dropdownsArray.map((dropdownData) => (
                <DropdownFilter
                  key={dropdownData.title}
                  dropdownData={dropdownData}
                  sortingFilterQueryHandler={sortingFilterQueryHandler}
                />
              ))}
            </div>
          </div>
          <div className="col-12 px-3 py-3" style={{ minHeight: '600px' }}>
            {content}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default MainContent;
