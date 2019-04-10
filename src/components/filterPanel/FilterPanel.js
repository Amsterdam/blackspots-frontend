import React from 'react';
import SVGIcon from 'components/SVGIcon/SVGIcon';
import { SpotStatusTypes, SpotIcons, SpotStatusColor } from 'constants.js';
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

function getTypeCheckboxes() {
  return Object.entries(SpotIcons).map((type, i) => {
    return (
      <label key={`icon_${i}`}>
        <input type="checkbox" />
        <SVGIcon small type={type[0]} />
        {capitalizeString(type[0])}
      </label>
    );
  });
}

function getStatusCheckboxes() {
  return Object.entries(SpotStatusColor).map((status, i) => {
    getStatusClassName(status);
    return (
      <label key={`status_${i}`}>
        <input type="checkbox" />
        <div
          className={classNames(
            styles.StatusDiv,
            getStatusClassName(status[0])
          )}
        />
        {capitalizeString(status[0])}
      </label>
    );
  });
}

const FilterPanel = () => {
  return (
    <div className={styles.FilterPanel}>
      <div className={styles.FilterContainer}>
        <h5>Toon</h5>
        <h5>Type</h5>
        {getTypeCheckboxes()}
        <h5>Status</h5>
        {getStatusCheckboxes()}
      </div>
    </div>
  );
};

export default FilterPanel;
