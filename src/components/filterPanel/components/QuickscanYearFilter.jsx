import { useContext } from 'react';
import PropTypes from 'prop-types';
import { FilterContext } from 'shared/reducers/FilterContext';
import styles from '../FilterPanel.module.scss';

const QuickscanYearFilter = ({ updateFilters, trackFilter }) => {
  const {
    state: { filter },
  } = useContext(FilterContext);

  return (
    <div className={styles.YearFilter}>
      {Object.keys(filter?.quickscanYearFilter)
        .reverse()
        .map((year) => {
          const value = filter?.quickscanYearFilter[year];
          return (
            <label key={year} htmlFor={year} className={styles.CheckboxWrapper}>
              <input
                id={year}
                type="checkbox"
                data-testid={year}
                checked={value}
                onChange={() => {
                  const updatedFilter = {
                    ...filter?.quickscanYearFilter,
                    [year]: !value,
                  };
                  updateFilters(
                    filter?.spotTypeFilter,
                    filter?.spotStatusTypeFilter,
                    filter?.blackspotYearFilter,
                    filter?.deliveredYearFilter,
                    updatedFilter,
                    filter?.stadsdeelFilter,
                    filter?.ivmYearFilter
                  );
                  if (!value) {
                    trackFilter(`On quickscan list: ${year}`);
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
QuickscanYearFilter.propTypes = {
  updateFilters: PropTypes.func.isRequired,
  trackFilter: PropTypes.func.isRequired,
};

export default QuickscanYearFilter;
