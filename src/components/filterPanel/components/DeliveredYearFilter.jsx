import { func, object } from 'prop-types';
import YearFilter from './YearFilter';

const DeliveredYearFilter = ({ updateFilters, trackFilter, filterValues }) => {
  return (
    <YearFilter
      updateFilters={updateFilters}
      trackFilter={trackFilter}
      filterValues={filterValues}
      trackingMessage="Delivered on:"
    />
  );
};

DeliveredYearFilter.propTypes = {
  updateFilters: func.isRequired,
  trackFilter: func.isRequired,
  filterValues: object.isRequired,
};

export default DeliveredYearFilter;
