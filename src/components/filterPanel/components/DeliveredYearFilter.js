import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FilterContext } from 'shared/reducers/FilterContext';
import styles from '../FilterPanel.module.scss';

const DeliveredYearFilter = ({ updateFilters, trackFilter }) => {
  const {
    state: { filter },
  } = useContext(FilterContext);

  return (
    <div className={styles.YearFilter}>
      {Object.keys(filter?.deliveredYearFilter)
        .reverse()
        .map(year => {
          const value = filter?.deliveredYearFilter[year];
          return (
            <label key={year} htmlFor={year} className={styles.CheckboxWrapper}>
              <input
                id={year}
                type="checkbox"
                checked={value}
                onChange={() => {
                  const updatedFilter = {
                    ...filter?.deliveredYearFilter,
                    [year]: !value,
                  };
                  updateFilters(
                    filter?.spotTypeFilter,
                    filter?.spotStatusTypeFilter,
                    filter?.blackspotYearFilter,
                    updatedFilter,
                    filter?.quickscanYearFilter,
                    filter?.stadsdeelFilter
                  );
                  if (!value) {
                    trackFilter(`Delivered on: ${year}`);
                  }
                }}
              />
              <span />
              {year}
            </label>
          );
        })}
    </div>
  );
};

DeliveredYearFilter.propTypes = {
  updateFilters: PropTypes.func.isRequired,
  trackFilter: PropTypes.func.isRequired,
};

export default DeliveredYearFilter;
