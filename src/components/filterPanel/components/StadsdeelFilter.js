import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FilterContext } from 'shared/reducers/FilterContext';
import { Stadsdeel } from 'config';
import styles from '../FilterPanel.module.scss';

const StadsdeelFilter = ({ updateFilters, trackFilter }) => {
  const {
    state: { filter },
  } = useContext(FilterContext);

  return (
    <>
      <h5>Stadsdeel</h5>
      {Object.keys(Stadsdeel).map(key => {
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
                updateFilters(
                  filter?.spotTypeFilter,
                  filter?.spotStatusTypeFilter,
                  filter?.blackspotYearFilter,
                  filter?.deliveredYearFilter,
                  filter?.quickscanYearFilter,
                  updatedFilter
                );
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
  updateFilters: PropTypes.func.isRequired,
  trackFilter: PropTypes.func.isRequired,
};

export default StadsdeelFilter;
