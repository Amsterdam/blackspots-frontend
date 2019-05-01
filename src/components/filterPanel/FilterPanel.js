import React, { useState } from 'react';
// import SVGIcon from 'components/SVGIcon/SVGIcon';
import { SpotStatusTypes, SpotTypes } from 'constants.js';
import { capitalizeString } from 'helpers';
import { resetFilter } from 'components/map/helpers';
import styles from './FilterPanel.module.scss';
import { ContextMenuOptions } from './FilterPanel.constants';
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

const FilterPanel = ({
  spotTypeFilter,
  spotStatusTypeFilter,
  blackspotYearFilter,
  deliveredYearFilter,
  quickscanYearFilter,
  setFilters,
}) => {
  const [optionValue, setOptionValue] = useState(ContextMenuOptions.ALL);

  /**
   * Update the filters of the actual map
   */
  function updateFilters(
    updatedSpotTypeFilter = false,
    updatedSpotStatusTypeFilter = false,
    updatedBlackspotYearFilter = false,
    updatedDeliveredYearFilter = false,
    updatedQuickscanYearFilter = false
  ) {
    // For every filter, if it has an actual filter object, pass it along to
    // the setFilter function received from the map, else, pass a resetted
    // filter.
    setFilters(
      updatedSpotTypeFilter
        ? updatedSpotTypeFilter
        : resetFilter(spotTypeFilter),
      updatedSpotStatusTypeFilter
        ? updatedSpotStatusTypeFilter
        : resetFilter(spotStatusTypeFilter),
      updatedBlackspotYearFilter
        ? updatedBlackspotYearFilter
        : resetFilter(blackspotYearFilter),
      updatedDeliveredYearFilter
        ? updatedDeliveredYearFilter
        : resetFilter(deliveredYearFilter),
      updatedQuickscanYearFilter
        ? updatedQuickscanYearFilter
        : resetFilter(quickscanYearFilter)
    );
  }

  /**
   * Render the context menu providing options to show different combinations
   * of filters
   */
  function renderOptions() {
    return (
      <div className={styles.ContextMenuWrapper}>
        <select
          className={styles.ContextMenu}
          onChange={e => {
            updateFilters(spotTypeFilter);
            setOptionValue(e.target.value);
          }}
        >
          <option value={ContextMenuOptions.ALL}>Alles</option>
          <option value={ContextMenuOptions.DELIVERED}>Opgeleverd in</option>
          <option value={ContextMenuOptions.BLACKSPOTS}>
            Opgenomen als blackspot in
          </option>
          <option value={ContextMenuOptions.QUICKSCANS}>
            Opgenomen als protocol in
          </option>
        </select>
      </div>
    );
  }

  /**
   * Render the checkboxes for the blackspot year filter
   */
  function renderBlackspotYearCheckboxes() {
    return Object.keys(blackspotYearFilter).map(year => {
      const value = blackspotYearFilter[year];
      return (
        <label key={year} className={styles.CheckboxWrapper}>
          <input
            type="checkbox"
            checked={value}
            onChange={e => {
              const updatedFilter = {
                ...blackspotYearFilter,
                [year]: !value,
              };
              updateFilters(spotTypeFilter, false, updatedFilter);
            }}
          />
          <span />
          {year}
        </label>
      );
    });
  }

  /**
   * Render the checkboxes for the delivered year filter
   */
  function renderDeliveredYearCheckboxes() {
    return Object.keys(deliveredYearFilter).map(year => {
      const value = deliveredYearFilter[year];
      return (
        <label key={year} className={styles.CheckboxWrapper}>
          <input
            type="checkbox"
            checked={value}
            onChange={e => {
              const updatedFilter = {
                ...deliveredYearFilter,
                [year]: !value,
              };
              updateFilters(spotTypeFilter, false, false, updatedFilter);
            }}
          />
          <span />
          {year}
        </label>
      );
    });
  }

  /**
   * Render the checkboxes for the quickscan year filter
   */
  function renderQuickscanYearCheckboxes() {
    return Object.keys(quickscanYearFilter).map(year => {
      const value = quickscanYearFilter[year];
      return (
        <label key={year} className={styles.CheckboxWrapper}>
          <input
            type="checkbox"
            checked={value}
            onChange={e => {
              const updatedFilter = {
                ...quickscanYearFilter,
                [year]: !value,
              };
              updateFilters(spotTypeFilter, false, false, false, updatedFilter);
            }}
          />
          <span />
          {year}
        </label>
      );
    });
  }

  /**
   * Render the checkboxes for the status filter
   */
  function renderStatusCheckboxes() {
    return Object.keys(SpotStatusTypes).map(key => {
      const type = SpotStatusTypes[key];
      const value = spotStatusTypeFilter[type];
      return (
        <label key={key} className={styles.CheckboxWrapper}>
          <input
            type="checkbox"
            checked={value}
            onChange={() => {
              const updatedFilter = {
                ...spotStatusTypeFilter,
                [type]: !value,
              };
              updateFilters(spotTypeFilter, updatedFilter);
            }}
          />
          <span />
          <div
            className={classNames(styles.StatusDiv, getStatusClassName(type))}
          />
          {capitalizeString(type)}
        </label>
      );
    });
  }

  /**
   * Render the checkboxes for the type filter
   */
  function renderTypeCheckboxes() {
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
              updateFilters(
                updatedFilter,
                spotStatusTypeFilter,
                blackspotYearFilter,
                deliveredYearFilter,
                quickscanYearFilter
              );
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

  return (
    <div className={styles.FilterPanel}>
      <div className={styles.FilterContainer}>
        <h5>Toon</h5>
        {renderOptions()}

        {optionValue === ContextMenuOptions.BLACKSPOTS ||
        optionValue === ContextMenuOptions.DELIVERED ||
        optionValue === ContextMenuOptions.QUICKSCANS ? (
          <h5>Jaar</h5>
        ) : (
          ''
        )}
        {optionValue === ContextMenuOptions.BLACKSPOTS
          ? renderBlackspotYearCheckboxes()
          : ''}

        {optionValue === ContextMenuOptions.DELIVERED
          ? renderDeliveredYearCheckboxes()
          : ''}

        {optionValue === ContextMenuOptions.QUICKSCANS
          ? renderQuickscanYearCheckboxes()
          : ''}

        <h5>Type</h5>
        {renderTypeCheckboxes()}

        {optionValue === ContextMenuOptions.ALL ? (
          <>
            <h5>Status</h5>
            {renderStatusCheckboxes()}
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
