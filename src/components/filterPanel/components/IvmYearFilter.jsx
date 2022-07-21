import { func, object } from 'prop-types';
import YearFilter from './YearFilter';

const IvmYearFilter = ({ updateFilters, trackFilter, filterValues }) => {
  return (
    <YearFilter
      updateFilters={updateFilters}
      trackFilter={trackFilter}
      filterValues={filterValues}
      trackingMessage="On IVM list:"
    />
  );
};

IvmYearFilter.propTypes = {
  updateFilters: func.isRequired,
  trackFilter: func.isRequired,
  filterValues: object.isRequired,
};

export default IvmYearFilter;
