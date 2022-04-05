import "./MainContent.css";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import ProductCard from "../ProductCard/ProductCard";

const MainContent = () => {


  const dropdownsArray = [
    { title: "Useless first", items: ["hello", "world", "welcome"] },
    { title: "condition", items: ["hello", "world", "welcome"] },
    { title: "Delivery Options", items: ["cash", "UPI", "Debit"] },
  ];

  return (
    <div className="col-9">
      <div className="main__content-container container px-3" fluid>
        <div className="row" style={{ margin: "0 -16px" }}>
          <div className="col-12 px-3">
            <div className="main__content-top d-flex">
              {dropdownsArray.map(dropdownData => <DropdownFilter key={dropdownData.title} dropdownData={dropdownData} />)}
            </div>
          </div>
          <div className="col-12 px-3 py-3">
            <div className="main__content-Middle ">
              <div className="row">
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;