import { func, object, string } from 'prop-types';
import styles from '../FilterPanel.module.scss';

export default function YearFilter({
  updateFilters,
  trackFilter,
  filterValues,
  trackingMessage,
}) {
  return (
    <div className={styles.YearFilter}>
      {Object.keys(filterValues)
        .reverse()
        .map((year) => {
          const value = filterValues[year];
          return (
            <label key={year} htmlFor={year} className={styles.CheckboxWrapper}>
              <input
                id={year}
                type="checkbox"
                checked={value}
                data-testid={year}
                onChange={() => {
                  const updatedFilter = {
                    ...filterValues,
                    [year]: !value,
                  };
                  updateFilters(updatedFilter);
                  if (!value) {
                    trackFilter(`${trackingMessage} ${year}`);
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
}

YearFilter.propTypes = {
  updateFilters: func.isRequired,
  trackFilter: func.isRequired,
  filterValues: object.isRequired,
  trackingMessage: string.isRequired,
};
