const CONSTANTS = {
  topCategoryUrl: `https://api.bestbuy.com/v1/categories?show=all&pageSize=100&apiKey=0Q75AAetcE7MZUKyrAG9DVI7&format=json&cursorMark=*`,
  MY_API_KEY: '0Q75AAetcE7MZUKyrAG9DVI7',
  dropdownsArray: [
    {
      title: 'Sort by',
      items: [
        { name: 'Latest First', query: 'releaseDate.dsc' },
        { name: 'Price - Low to High', query: 'salePrice.asc' },
        { name: 'Price - High to Low', query: 'salePrice.dsc' },
        { name: 'Rating - Low to High', query: 'customerReviewAverage.asc' },
        { name: 'Rating - High to Low', query: 'customerReviewAverage.desc' },
      ],
    },
    { title: 'condition', items: [] },
    { title: 'Delivery Options', items: [] },
  ],
  filters: [
    {
      filterTitle: 'Price',
      filterOptions: [
        { name: '$0 - $10', filterQuery: '(salePrice>=0&salePrice<=10)' },
        { name: '$10 - $100', filterQuery: '(salePrice>=10&salePrice<=100)' },
        { name: '$100 - $1000', filterQuery: '(salePrice>=100&salePrice<=1000)' },
        { name: '$1000 - $10000', filterQuery: '(salePrice>=1000&salePrice<=10000)' },
        { name: '$10000 & Above', filterQuery: 'salePrice>=10000' },
      ],
    },
    {
      filterTitle: 'Ratings',
      filterOptions: [
        { name: '⭐ & above', filterQuery: 'customerReviewAverage>=1' },
        { name: '⭐⭐ & above', filterQuery: 'customerReviewAverage>=2' },
        { name: '⭐⭐⭐ & above', filterQuery: 'customerReviewAverage>=3' },
        { name: '⭐⭐⭐⭐ & above', filterQuery: 'customerReviewAverage>=4' },
      ],
    },
  ],
};

export default CONSTANTS;
