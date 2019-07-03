import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SVGIcon from 'components/SVGIcon/SVGIcon';
import { SpotStatusTypes, SpotTypes } from 'constants.js';
import { resetFilter } from 'components/map/helpers';
import styles from './FilterPanel.module.scss';
import { ContextMenuOptions } from './FilterPanel.constants';
import classNames from 'classnames';
import { StatusDisplayNames, spotTypeDisplayNames } from '../../constants';
import SelectMenu from '../../shared/selectMenu/SelectMenu';
import { ReactComponent as FilterIcon } from 'assets/icons/icon-filter.svg';
import { ReactComponent as ChevronIcon } from 'assets/icons/chevron-top.svg';
import { trackFilter } from '../../helpers';

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
  setBlackspotListFilter,
  setQuickscanListFilter,
  setDeliveredListFilter,
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
    // Changing options should reset the filters
    updateFilters(
      // Reset the type filter
      resetFilter(spotTypeFilter)
    );

    // Set the list filters
    setBlackspotListFilter(value === ContextMenuOptions.BLACKSPOTS);
    setQuickscanListFilter(value === ContextMenuOptions.QUICKSCANS);
    setDeliveredListFilter(value === ContextMenuOptions.DELIVERED);

    // Set the option value
    setOptionValue(value);
  }

  /**
   * Render the context menu providing options to show different combinations
   * of filters
   */
  function renderOptions() {
    return (
      <>
        <h5>Toon</h5>
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
      </>
    );
  }

  /**
   * Render the checkboxes for the blackspot year filter
   */
  function renderBlackspotYearCheckboxes() {
    return (
      <div className={styles.YearFilter}>
        {Object.keys(blackspotYearFilter)
          .reverse()
          .map(year => {
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
                    updateFilters(
                      spotTypeFilter,
                      spotStatusTypeFilter,
                      updatedFilter
                    );
                  }}
                />
                <span />
                {year}
              </label>
            );
          })}
      </div>
    );
  }

  /**
   * Render the checkboxes for the delivered year filter
   */
  function renderDeliveredYearCheckboxes() {
    return (
      <div className={styles.YearFilter}>
        {Object.keys(deliveredYearFilter)
          .reverse()
          .map(year => {
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
                    updateFilters(
                      spotTypeFilter,
                      spotStatusTypeFilter,
                      false,
                      updatedFilter
                    );
                    if (!value) {
                      trackFilter('Delivered on: ' + year);
                    }
                  }}
                />
                <span />
                {year}
              </label>
            );
          })}
      </div>
    );
  }

  /**
   * Render the checkboxes for the quickscan year filter
   */
  function renderQuickscanYearCheckboxes() {
    return (
      <div className={styles.YearFilter}>
        {Object.keys(quickscanYearFilter)
          .reverse()
          .map(year => {
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
                    updateFilters(
                      spotTypeFilter,
                      spotStatusTypeFilter,
                      false,
                      false,
                      updatedFilter
                    );
                    if (!value) {
                      trackFilter('On quickscan list: ' + year);
                    }
                  }}
                />
                <span />
                {year}
              </label>
            );
          })}
      </div>
    );
  }

  /**
   * Render the checkboxes for the status filter
   */
  function renderStatusCheckboxes() {
    return (
      <>
        <h5>Status</h5>
        {Object.keys(SpotStatusTypes).map(key => {
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
                  updateFilters(
                    spotTypeFilter,
                    updatedFilter,
                    blackspotYearFilter,
                    deliveredYearFilter,
                    quickscanYearFilter
                  );
                  if (!value) {
                    trackFilter(type);
                  }
                }}
              />
              <span />
              <div
                className={classNames(
                  styles.StatusDiv,
                  getStatusClassName(type)
                )}
              />
              {StatusDisplayNames[type]}
            </label>
          );
        })}
      </>
    );
  }

  /**
   * Render the checkboxes for the type filter
   */
  function renderTypeCheckboxes() {
    return (
      <>
        <h5>Type</h5>
        {Object.keys(SpotTypes).map(key => {
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
                  if (!value) {
                    trackFilter(type);
                  }
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
              {spotTypeDisplayNames[type]}
            </label>
          );
        })}
      </>
    );
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
        {renderOptions()}

        {optionValue !== ContextMenuOptions.ALL ? <h5>Jaar</h5> : ''}
        {optionValue === ContextMenuOptions.BLACKSPOTS
          ? renderBlackspotYearCheckboxes()
          : ''}

        {optionValue === ContextMenuOptions.DELIVERED
          ? renderDeliveredYearCheckboxes()
          : ''}

        {optionValue === ContextMenuOptions.QUICKSCANS
          ? renderQuickscanYearCheckboxes()
          : ''}

        {optionValue === ContextMenuOptions.ALL ||
        optionValue === ContextMenuOptions.DELIVERED
          ? renderTypeCheckboxes()
          : ''}

        {optionValue !== ContextMenuOptions.DELIVERED
          ? renderStatusCheckboxes()
          : ''}
      </div>
    </div>
  );
};

FilterPanel.propTypes = {
  spotTypeFilter: PropTypes.object.isRequired,
  spotStatusTypeFilter: PropTypes.object.isRequired,
  blackspotYearFilter: PropTypes.object.isRequired,
  deliveredYearFilter: PropTypes.object.isRequired,
  quickscanYearFilter: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  setBlackspotListFilter: PropTypes.func.isRequired,
  setQuickscanListFilter: PropTypes.func.isRequired,
  setDeliveredListFilter: PropTypes.func.isRequired,
};

export default FilterPanel;
