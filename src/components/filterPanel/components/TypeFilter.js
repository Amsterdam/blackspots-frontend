import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FilterContext } from 'shared/reducers/FilterContext';
import { SpotTypes, SpotTypeDisplayNames } from 'config';
import SVGIcon from 'components/SVGIcon/SVGIcon';
import classNames from 'classnames';
import styles from '../FilterPanel.module.scss';

const StadsdeelFilter = ({ updateFilters, trackFilter }) => {
  const {
    state: { filter },
  } = useContext(FilterContext);

  return (
    <>
      <h5>Type</h5>
      {Object.keys(SpotTypes).map(key => {
        const type = SpotTypes[key];
        const value = filter?.spotTypeFilter[type];
        return (
          <label key={key} htmlFor={key} className={styles.CheckboxWrapper}>
            <input
              id={key}
              type="checkbox"
              checked={value}
              onChange={() => {
                const updatedFilter = {
                  ...filter?.spotTypeFilter,
                  [type]: !value,
                };
                if (!value) {
                  trackFilter(type);
                }
                updateFilters(
                  updatedFilter,
                  filter?.spotStatusTypeFilter,
                  filter?.blackspotYearFilter,
                  filter?.deliveredYearFilter,
                  filter?.quickscanYearFilter,
                  filter?.stadsdeelFilter
                );
              }}
            />
            <span />
            <div
              className={classNames(
                styles.IconDiv,
                type === SpotTypes.RISICO ? styles.RiscoIconMargin : ''
              )}
            >
              <SVGIcon small type={type} />
            </div>
            {SpotTypeDisplayNames[type]}
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
