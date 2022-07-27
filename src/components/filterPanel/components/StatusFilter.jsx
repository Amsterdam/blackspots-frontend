import { func } from 'prop-types';
import { useFilterStateValue } from 'shared/reducers/FilterContext';
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
  const filter = useFilterStateValue();

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
                updateFilters(updatedFilter);
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
  updateFilters: func.isRequired,
  trackFilter: func.isRequired,
};

export default StatusFilter;
