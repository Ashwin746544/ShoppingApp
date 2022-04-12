import "./Filter.css";
import { Accordion } from "react-bootstrap";
import FilterOption from "../FilterOption/FilterOption";

const Filter = ({ filterTitle, filterOptions }) => {
  const filterOptionsContent = filterOptions.map((fOption) => (
    <FilterOption name={fOption.name} key={fOption.name} filterName={filterTitle} fQuery={fOption.filterQuery} />
  ));

  return (
    <div className="filter__container">
      <Accordion defaultActiveKey="0" flush className="filter">
        <Accordion.Item eventKey="0">
          <Accordion.Header className="text filter__title">
            {filterTitle}
          </Accordion.Header>
          <Accordion.Body className="filter__body">
            {filterOptionsContent}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Filter;
