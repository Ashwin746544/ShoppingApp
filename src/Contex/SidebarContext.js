import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SidebarContext = React.createContext({
  sidebarCatId: null,
  selectSidebarCategoryHandler: () => { },
  selectedFilters: [],
  addFilter: () => { },
  removeFilter: () => { },
  resetFilter: false,
  resetSorting: false,
  sortingFilterQuery: null,
  selectSortingFilterHandler: () => { },
});

export function SidebarContextProvider({ children }) {
  const navigate = useNavigate();
  const [selectedSidebarCatId, setSelectedSidebarCatId] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortingFilterQuery, setSortingFilterQuery] = useState(null);
  const [filterReset, setFilterReset] = useState(false);

  const changeSelectedSidebarCategory = (id) => {
    navigate('/bestBuy-shoppingApp/');
    setSelectedSidebarCatId(id);
    setSelectedFilters([]);
    setFilterReset(true);
    setSortingFilterQuery(null);
  };

  const changeSelectedSortingHandler = (query) => {
    setSortingFilterQuery(query);
  };

  const addFilter = (filterName, filterQuery) => {
    const existingFilters = [...selectedFilters];
    const currentFilterIndex = existingFilters.findIndex(
      (filter) => filter.name === filterName,
    );
    if (currentFilterIndex === -1) {
      const newFilter = { name: filterName, filterQueries: [filterQuery] };
      existingFilters.push(newFilter);
    } else {
      const newFilter = { ...existingFilters[currentFilterIndex] };
      const existingFilterQueries = [...newFilter.filterQueries];
      existingFilterQueries.push(filterQuery);
      newFilter.filterQueries = existingFilterQueries;
      existingFilters[currentFilterIndex] = newFilter;
    }
    setSelectedFilters(existingFilters);
    setFilterReset(false);
  };

  const removeFilter = (filterName, filterQuery) => {
    const existingFilters = [...selectedFilters];
    const currentFilterIndex = existingFilters.findIndex(
      (filter) => filter.name === filterName,
    );
    const newFilter = { ...existingFilters[currentFilterIndex] };
    const existingFilterQueries = [...newFilter.filterQueries];
    const existingFilterQueryIndex = existingFilterQueries.findIndex(
      (query) => query === filterQuery,
    );
    existingFilterQueries.splice(existingFilterQueryIndex, 1);
    if (existingFilterQueries.length === 0) {
      existingFilters.splice(currentFilterIndex, 1);
    } else {
      newFilter.filterQueries = existingFilterQueries;
      existingFilters[currentFilterIndex] = newFilter;
    }
    setSelectedFilters(existingFilters);
  };

  return (
    <SidebarContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        sidebarCatId: selectedSidebarCatId,
        selectSidebarCategoryHandler: changeSelectedSidebarCategory,
        addFilter,
        removeFilter,
        selectedFilters,
        resetFilter: filterReset,
        sortingFilterQuery,
        selectSortingFilterHandler: changeSelectedSortingHandler,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export default SidebarContext;
