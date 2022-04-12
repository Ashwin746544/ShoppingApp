import Filter from "../Filter/Filter";
const filters = [
  {
    filterTitle: "Price",
    filterOptions: [
      { name: "$0 - $10", filterQuery: "(salePrice>=0&salePrice<=10)" },
      { name: "$10 - $100", filterQuery: "(salePrice>=10&salePrice<=100)" },
      { name: "$100 - $1000", filterQuery: "(salePrice>=100&salePrice<=1000)" },
      { name: "$1000 - $10000", filterQuery: "(salePrice>=1000&salePrice<=10000)" },
      { name: "$10000 & Above", filterQuery: "salePrice>=10000" },
    ]
  },
  {
    filterTitle: "Ratings",
    filterOptions: [
      { name: "⭐ & above", filterQuery: "customerReviewAverage>=1" },
      { name: "⭐⭐ & above", filterQuery: "customerReviewAverage>=2" },
      { name: "⭐⭐⭐ & above", filterQuery: "customerReviewAverage>=3" },
      { name: "⭐⭐⭐⭐ & above", filterQuery: "customerReviewAverage>=4" }
    ]
  },
  // {
  //   customerReviewAverage
  //   filterTitle: "Expanded Filters",
  //   filterOptions: [
  //     "Recommended",
  //     "Recently Added",
  //     "Expiring Soon",
  //     "Most Rated",
  //     "Price: Low → High",
  //     "Price: High → Low",
  //   ]
  // },
  // {
  //   filterTitle: "Year of manufacturing",
  //   filterOptions: ["1954", "1955", "1956", "1957", "1958", "1959"]
  // },

]

const Filters = () => {

  const content = filters.map(filter => <Filter key={filter.filterTitle} filterTitle={filter.filterTitle} filterOptions={filter.filterOptions} />);

  return <>{content}</>;
}

export default Filters;