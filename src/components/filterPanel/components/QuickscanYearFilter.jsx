import { func, object } from 'prop-types';
import YearFilter from './YearFilter';

const QuickscanYearFilter = ({ updateFilters, trackFilter, filterValues }) => {
  return (
    <YearFilter
      updateFilters={updateFilters}
      trackFilter={trackFilter}
      filterValues={filterValues}
      trackingMessage="On quickscan list:"
    />
  );
};
QuickscanYearFilter.propTypes = {
  updateFilters: func.isRequired,
  trackFilter: func.isRequired,
  filterValues: object.isRequired,
};

export default QuickscanYearFilter;
