import React, { useState } from 'react';
import SVGIcon from 'components/SVGIcon/SVGIcon';
import { SpotStatusTypes, SpotTypes } from 'constants.js';
import { capitalizeString } from 'helpers';
import { resetFilter } from 'components/map/helpers';
import styles from './FilterPanel.module.scss';
import { ContextMenuOptions } from './FilterPanel.constants';
import classNames from 'classnames';
import { StatusDisplayNames } from '../../constants';
import SelectMenu from '../../shared/selectMenu/SelectMenu';
import { ReactComponent as FilterIcon } from 'assets/icons/icon-filter.svg';
import { ReactComponent as ChevronIcon } from 'assets/icons/chevron-top.svg';

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
  const [showPanel, setShowPanel] = useState(true);

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

  function processOptionChange(value) {
    updateFilters(spotTypeFilter);
    setOptionValue(value);
  }

  /**
   * Render the context menu providing options to show different combinations
   * of filters
   */
  function renderOptions() {
    return (
      <SelectMenu
        items={[
          {
            label: 'Alles',
            onClick: () => processOptionChange(ContextMenuOptions.ALL),
          },
          {
            label: 'Opgeleverd in',
            onClick: () => processOptionChange(ContextMenuOptions.DELIVERED),
          },
          {
            label: 'Opgenomen als blackspot in',
            onClick: () => processOptionChange(ContextMenuOptions.BLACKSPOTS),
          },
          {
            label: 'Opgenomen als protocol in',
            onClick: () => processOptionChange(ContextMenuOptions.QUICKSCANS),
          },
        ]}
      />
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
          {StatusDisplayNames[type]}
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
          <div
            className={classNames(
              styles.IconDiv,
              type === SpotTypes.RISICO ? styles.RiscoIconMargin : ''
            )}
          >
            <SVGIcon small type={type} />
          </div>
          {capitalizeString(type)}
        </label>
      );
    });
  }

  return (
    <div
      className={classNames(styles.FilterPanel, {
        [styles.FilterPanelCollapsed]: !showPanel,
      })}
    >
      <div className={styles.TopBar} onClick={() => setShowPanel(!showPanel)}>
        <FilterIcon className={styles.FilterIcon} />
        Filters
        <ChevronIcon
          className={classNames(
            styles.ChevronIcon,
            showPanel ? '' : styles.ChevronIconRotated
          )}
        />
      </div>
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
