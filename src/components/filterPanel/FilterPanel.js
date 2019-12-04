import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import SVGIcon from 'components/SVGIcon/SVGIcon';
import { SpotStatusTypes, SpotTypes, Stadsdeel, endpoints } from 'constants.js';
import { resetFilter } from 'components/map/helpers';
import styles from './FilterPanel.module.scss';
import { ContextMenuOptions, MenuOptions } from './FilterPanel.constants';
import classNames from 'classnames';
import { StatusDisplayNames, SpotTypeDisplayNames } from '../../constants';
import SelectMenu from '../../shared/selectMenu/SelectMenu';
import { ReactComponent as FilterIcon } from 'assets/icons/icon-filter.svg';
import { ReactComponent as ChevronIcon } from 'assets/icons/chevron-top.svg';
import { Button, themeSpacing } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';
import useDownload from 'shared/hooks/useDownload';

const ExportButton = styled(Button)`
  margin: ${themeSpacing(2, 0)};
`;

const FilterWrapperStyle = styled.div`
  max-height: calc(550px - 33px);
  overflow-x: hidden;
  overflow-y: auto;
`;

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

const exportUrl = `${endpoints.blackspotsExport}`;

export const getExportFilter = stadsdeelFilter => {
  if (Object.values(stadsdeelFilter).filter(e => e).length === 0) return '';
  const stadsdeelName = Object.keys(stadsdeelFilter).find(
    key => stadsdeelFilter[key] === true
  );
  const stadsdeel = Object.values(Stadsdeel).find(
    item => item.name === stadsdeelName
  );
  return `stadsdeel=${stadsdeel.value}`;
};

const FilterPanel = ({
  spotTypeFilter,
  spotStatusTypeFilter,
  blackspotYearFilter,
  deliveredYearFilter,
  quickscanYearFilter,
  stadsdeelFilter,
  setFilters,
  setBlackspotListFilter,
  setQuickscanListFilter,
  setDeliveredListFilter,
  setStadsdeelFilter,
}) => {
  const [optionValue, setOptionValue] = useState(ContextMenuOptions.ALL);
  const [showPanel, setShowPanel] = useState(true);
  const { trackEvent } = useMatomo();
  const [downloadUrl, setDownloadUrl] = useState(exportUrl);
  const [canDownload, setCanDownload] = useState(true);

  const [, downloadFile] = useDownload();

  const exportFilter = () => {
    downloadFile(
      downloadUrl,
      `wbakaart-export-${new Date().toLocaleDateString('nl-NL')}.csv`
    );
  };

  useEffect(() => {
    setDownloadUrl(`${exportUrl}${getExportFilter(stadsdeelFilter)}`);
    setCanDownload(
      Object.values(stadsdeelFilter).filter(e => e).length <= 1 &&
        Object.values(spotTypeFilter).filter(e => e).length === 0 &&
        Object.values(spotStatusTypeFilter).filter(e => e).length === 0 &&
        optionValue === ContextMenuOptions.ALL
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stadsdeelFilter]);

  const trackFilter = name => {
    trackEvent({ category: 'Map filters', action: name });
  };

  /**
   * Update the filters of the actual map
   */
  function updateFilters(
    updatedSpotTypeFilter = false,
    updatedSpotStatusTypeFilter = false,
    updatedBlackspotYearFilter = false,
    updatedDeliveredYearFilter = false,
    updatedQuickscanYearFilter = false,
    updatedStadsdeelFilter = false
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
        : resetFilter(quickscanYearFilter),
      updatedStadsdeelFilter
        ? updatedStadsdeelFilter
        : resetFilter(stadsdeelFilter)
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
          items={[...MenuOptions]}
          selectionChanged={processOptionChange}
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
                    if (!value) {
                      trackFilter('On blackspot list: ' + year);
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
              {SpotTypeDisplayNames[type]}
            </label>
          );
        })}
      </>
    );
  }

  const renderStadsdeelCheckboxes = () => {
    return (
      <>
        <h5>Stadsdeel</h5>
        {Object.keys(Stadsdeel).map(key => {
          const type = Stadsdeel[key].name;
          const value = stadsdeelFilter[type];
          return (
            <label key={key} className={styles.CheckboxWrapper}>
              <input
                type="checkbox"
                checked={value}
                onChange={e => {
                  const updatedFilter = {
                    ...stadsdeelFilter,
                    [type]: !value,
                  };
                  if (!value) {
                    trackFilter(type);
                  }
                  updateFilters(
                    spotTypeFilter,
                    spotStatusTypeFilter,
                    blackspotYearFilter,
                    deliveredYearFilter,
                    quickscanYearFilter,
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
      <FilterWrapperStyle>
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
          {renderStadsdeelCheckboxes()}
          <div>
            <ExportButton
              variant="application"
              onClick={exportFilter}
              disabled={!canDownload}
            >
              Exporteer
            </ExportButton>
          </div>
        </div>
      </FilterWrapperStyle>
    </div>
  );
};

FilterPanel.propTypes = {
  spotTypeFilter: PropTypes.object.isRequired,
  spotStatusTypeFilter: PropTypes.object.isRequired,
  blackspotYearFilter: PropTypes.object.isRequired,
  deliveredYearFilter: PropTypes.object.isRequired,
  quickscanYearFilter: PropTypes.object.isRequired,
  stadsdeelFilter: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  setBlackspotListFilter: PropTypes.func.isRequired,
  setQuickscanListFilter: PropTypes.func.isRequired,
  setDeliveredListFilter: PropTypes.func.isRequired,
  setStadsdeelFilter: PropTypes.func.isRequired,
};

export default FilterPanel;
