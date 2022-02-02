import { useContext } from 'react';
import PropTypes from 'prop-types';
import { FilterContext } from 'shared/reducers/FilterContext';
import styles from '../FilterPanel.module.scss';

const BlackspotYearFilter = ({ updateFilters, trackFilter }) => {
  const {
    state: { filter },
  } = useContext(FilterContext);

  return (
    <div className={styles.YearFilter}>
      {Object.keys(filter?.blackspotYearFilter)
        .reverse()
        .map((year) => {
          const value = filter?.blackspotYearFilter[year];
          return (
            <label key={year} htmlFor={year} className={styles.CheckboxWrapper}>
              <input
                id={year}
                type="checkbox"
                checked={value}
                data-testid={year}
                onChange={() => {
                  const updatedFilter = {
                    ...filter?.blackspotYearFilter,
                    [year]: !value,
                  };
                  updateFilters(
                    filter?.spotTypeFilter,
                    filter?.spotStatusTypeFilter,
                    updatedFilter,
                    filter?.deliveredYearFilter,
                    filter?.quickscanYearFilter,
                    filter?.stadsdeelFilter
                  );
                  if (!value) {
                    trackFilter(`On blackspot list: ${year}`);
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

BlackspotYearFilter.propTypes = {
  updateFilters: PropTypes.func.isRequired,
  trackFilter: PropTypes.func.isRequired,
};

export default BlackspotYearFilter;
