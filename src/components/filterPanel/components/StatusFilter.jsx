import { useContext } from 'react';
import PropTypes from 'prop-types';
import { FilterContext } from 'shared/reducers/FilterContext';
import { SpotStatusTypes, StatusDisplayNames } from 'config';
import classNames from 'classnames';
import styles from '../FilterPanel.module.scss';

function getStatusClassName(status) {
  const statusClassMapper = {
    [SpotStatusTypes.ONDERZOEK]: styles.Onderzoek,
    [SpotStatusTypes.VOORBEREIDING]: styles.Voorbereiding,
    [SpotStatusTypes.GEREED]: styles.Gereed,
    [SpotStatusTypes.GEEN_MAATREGEL]: styles.GeenMaatregel,
    [SpotStatusTypes.UITVOERING]: styles.Uitvoering,
    [SpotStatusTypes.ONBEKEND]: styles.Onbekend,
  };

  return statusClassMapper[status];
}

const StatusFilter = ({ updateFilters, trackFilter }) => {
  const {
    state: { filter },
  } = useContext(FilterContext);

  return (
    <>
      <h5>Status</h5>
      {Object.keys(SpotStatusTypes).map((key) => {
        const type = SpotStatusTypes[key];
        const value = filter?.spotStatusTypeFilter[type];
        return (
          <label key={key} htmlFor={key} className={styles.CheckboxWrapper}>
            <input
              id={key}
              type="checkbox"
              checked={value}
              onChange={() => {
                const updatedFilter = {
                  ...filter?.spotStatusTypeFilter,
                  [type]: !value,
                };
                updateFilters(
                  filter?.spotTypeFilter,
                  updatedFilter,
                  filter?.blackspotYearFilter,
                  filter?.deliveredYearFilter,
                  filter?.quickscanYearFilter,
                  filter?.stadsdeelFilter,
                  filter?.ivmYearFilter
                );
                if (!value) {
                  trackFilter(type);
                }
              }}
            />
            <span />
            <div
              className={classNames(styles.StatusDiv, getStatusClassName(type))}
            />
            {StatusDisplayNames[type]}
          </label>
        );
      })}
    </>
  );
};

StatusFilter.propTypes = {
  updateFilters: PropTypes.func.isRequired,
  trackFilter: PropTypes.func.isRequired,
};

export default StatusFilter;
