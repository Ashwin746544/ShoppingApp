import Filter from '../Filter/Filter';
import CONSTANTS from '../../Variables';

function Filters() {
  const content = CONSTANTS.filters.map(
    (filter) => (
      <Filter
        key={filter.filterTitle}
        filterTitle={filter.filterTitle}
        filterOptions={filter.filterOptions}
      />
    ),
  );

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{content}</>;
}

export default Filters;
