import { func } from 'prop-types';
import { useFilterStateValue } from 'shared/reducers/FilterContext';
import { Stadsdeel } from 'config';
import styles from '../FilterPanel.module.scss';

const StadsdeelFilter = ({ updateFilters, trackFilter }) => {
  const filter = useFilterStateValue();

  return (
    <>
      <h5>Stadsdeel</h5>
      {Object.keys(Stadsdeel).map((key) => {
        const type = Stadsdeel[key].name;
        const value = filter?.stadsdeelFilter[type];
        return (
          <label key={key} htmlFor={key} className={styles.CheckboxWrapper}>
            <input
              id={key}
              type="checkbox"
              checked={value}
              onChange={() => {
                const updatedFilter = {
                  ...filter?.stadsdeelFilter,
                  [type]: !value,
                };
                if (!value) {
                  trackFilter(type);
                }
                updateFilters(updatedFilter);
              }}
            />
            <span />
            {type}
          </label>
        );
      })}
    </>
  );
};

StadsdeelFilter.propTypes = {
  updateFilters: func.isRequired,
  trackFilter: func.isRequired,
};

export default StadsdeelFilter;
