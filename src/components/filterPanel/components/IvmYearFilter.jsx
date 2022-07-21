import { useContext } from 'react';
import { func } from 'prop-types';
import { FilterContext } from 'shared/reducers/FilterContext';
import styles from '../FilterPanel.module.scss';

const IvmYearFilter = ({ updateFilters, trackFilter }) => {
  const {
    state: { filter },
  } = useContext(FilterContext);

  return (
    <div className={styles.YearFilter}>
      {Object.keys(filter?.ivmYearFilter)
        .reverse()
        .map((year) => {
          const value = filter?.ivmYearFilter[year];
          return (
            <label key={year} htmlFor={year} className={styles.CheckboxWrapper}>
              <input
                id={year}
                type="checkbox"
                checked={value}
                data-testid={year}
                onChange={() => {
                  const updatedFilter = {
                    ...filter?.ivmYearFilter,
                    [year]: !value,
                  };
                  updateFilters(
                    filter?.spotTypeFilter,
                    filter?.spotStatusTypeFilter,
                    filter?.blackspotYearFilter,
                    filter?.deliveredYearFilter,
                    filter?.quickscanYearFilter,
                    filter?.stadsdeelFilter,
                    updatedFilter
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

IvmYearFilter.propTypes = {
  updateFilters: func.isRequired,
  trackFilter: func.isRequired,
};

export default IvmYearFilter;
