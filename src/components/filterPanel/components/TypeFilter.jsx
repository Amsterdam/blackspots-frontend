import { func } from 'prop-types';
import { useFilterStateValue } from 'shared/reducers/FilterContext';
import { SpotTypes, SpotTypeDisplayNames } from 'config';
import SVGIcon from 'components/SVGIcon/SVGIcon';
import classNames from 'classnames';
import styles from '../FilterPanel.module.scss';

const TypeFilter = ({ updateFilters, trackFilter }) => {
  const filter = useFilterStateValue();

  return (
    <>
      <h5>Type</h5>
      {Object.keys(SpotTypes).map((key) => {
        const type = SpotTypes[key];
        const value = filter?.spotTypeFilter[type];
        return (
          <label key={key} htmlFor={key} className={styles.CheckboxWrapper}>
            <input
              id={key}
              type="checkbox"
              checked={value}
              value={value}
              onChange={() => {
                const updatedFilter = {
                  ...filter?.spotTypeFilter,
                  [type]: !value,
                };
                if (!value) {
                  trackFilter(type);
                }
                updateFilters(updatedFilter);
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

TypeFilter.propTypes = {
  updateFilters: func.isRequired,
  trackFilter: func.isRequired,
};

export default TypeFilter;
