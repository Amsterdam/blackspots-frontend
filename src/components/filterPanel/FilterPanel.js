import React from 'react';
import SVGIcon from 'components/SVGIcon/SVGIcon';
import { SpotStatusTypes, SpotTypes } from 'constants.js';
import { capitalizeString } from 'helpers';
import styles from './FilterPanel.module.scss';
import classNames from 'classnames';

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

function renderTypeCheckboxes(spotTypeFilter, setSpotTypeFilter) {
  return Object.keys(SpotTypes).map(key => {
    const type = SpotTypes[key];
    const value = spotTypeFilter[type];
    return (
      <label key={key} className={styles.CheckboxWrapper}>
        <input
          type="checkbox"
          checked={value}
          onChange={e => {
            const updatedFilter = {
              ...spotTypeFilter,
              [type]: !value,
            };
            setSpotTypeFilter(updatedFilter);
          }}
        />
        <span />
        {/* <div className={styles.IconDiv}>
          <SVGIcon small type={type} />
        </div> */}
        {capitalizeString(type)}
      </label>
    );
  });
}

function renderStatusCheckboxes(spotStatusTypeFilter, setSpotStatusTypeFilter) {
  return Object.keys(SpotStatusTypes).map(key => {
    const type = SpotStatusTypes[key];
    const value = spotStatusTypeFilter[type];
    return (
      <label key={key} className={styles.CheckboxWrapper}>
        <input
          type="checkbox"
          checked={value}
          onChange={e => {
            const updatedFilter = {
              ...spotStatusTypeFilter,
              [type]: !value,
            };
            setSpotStatusTypeFilter(updatedFilter);
          }}
        />
        <span />
        {/* <div
          className={classNames(styles.StatusDiv, getStatusClassName(type))}
        /> */}
        {capitalizeString(type)}
      </label>
    );
  });
}

function renderYearCheckboxes(spotYearFilter, setSpotYearFilter) {
  return Object.keys(spotYearFilter).map(year => {
    const value = spotYearFilter[year];
    return (
      <label key={year} className={styles.CheckboxWrapper}>
        <input
          type="checkbox"
          checked={value}
          onChange={e => {
            const updatedFilter = {
              ...spotYearFilter,
              [year]: !value,
            };
            setSpotYearFilter(updatedFilter);
          }}
        />
        <span />
        {capitalizeString(year)}
      </label>
    );
  });
}

const FilterPanel = ({
  spotTypeFilter,
  setSpotTypeFilter,
  spotStatusTypeFilter,
  setSpotStatusTypeFilter,
  spotYearFilter,
  setSpotYearFilter,
}) => {
  return (
    <div className={styles.FilterPanel}>
      <div className={styles.FilterContainer}>
        {/* <h5>Toon</h5> */}
        <h5>Jaar</h5>
        {renderYearCheckboxes(spotYearFilter, setSpotYearFilter)}
        <h5>Type</h5>
        {renderTypeCheckboxes(spotTypeFilter, setSpotTypeFilter)}
        <h5>Status</h5>
        {renderStatusCheckboxes(spotStatusTypeFilter, setSpotStatusTypeFilter)}
      </div>
    </div>
  );
};

export default FilterPanel;
