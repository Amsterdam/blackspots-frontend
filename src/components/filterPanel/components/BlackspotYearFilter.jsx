import { func, object } from 'prop-types';
import YearFilter from './YearFilter';

const BlackspotYearFilter = ({ updateFilters, trackFilter, filterValues }) => {
  return (
    <YearFilter
      updateFilters={updateFilters}
      trackFilter={trackFilter}
      filterValues={filterValues}
      trackingMessage="On blackspot list:"
    />
  );
};

BlackspotYearFilter.propTypes = {
  updateFilters: func.isRequired,
  trackFilter: func.isRequired,
  filterValues: object.isRequired,
};

export default BlackspotYearFilter;
