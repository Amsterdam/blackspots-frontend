import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import SVGIcon from 'components/SVGIcon/SVGIcon';
import { SpotStatusTypes, SpotTypes, Stadsdeel, endpoints } from 'config';
import { resetFilter } from 'components/map/helpers';
import classNames from 'classnames';
import { ReactComponent as FilterIcon } from 'assets/icons/icon-filter.svg';
import { ReactComponent as ChevronIcon } from 'assets/icons/chevron-top.svg';
import { Button, themeSpacing } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';
import useDownload from 'shared/hooks/useDownload';
import SelectMenu from '../../shared/selectMenu/SelectMenu';
import { StatusDisplayNames, SpotTypeDisplayNames } from '../../config';
import { ContextMenuOptions, MenuOptions } from './FilterPanel.constants';
import styles from './FilterPanel.module.scss';

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

const exportUrl = `${endpoints.blackspots}export/?`;

export const getExportFilter = stadsdeelFilter => {
  if (Object.values(stadsdeelFilter).filter(Boolean).length === 0) return '';
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
}) => {
  const [optionValue, setOptionValue] = useState(ContextMenuOptions.ALL);
  const [showPanel, setShowPanel] = useState(true);
  const { trackEvent } = useMatomo();
  const [downloadUrl, setDownloadUrl] = useState(exportUrl);
  const [canDownload, setCanDownload] = useState(true);

  const { downloadFile } = useDownload();

  const exportFilter = useCallback(() => {
    downloadFile(
      downloadUrl,
      `wbakaart-export-${new Date().toLocaleDateString('nl-NL')}.csv`
    );
  }, [downloadUrl]);

  useEffect(() => {
    setDownloadUrl(`${exportUrl}${getExportFilter(stadsdeelFilter)}`);
    setCanDownload(
      Object.values(stadsdeelFilter).filter(e => e).length <= 1 &&
        Object.values(spotTypeFilter).filter(e => e).length === 0 &&
        Object.values(spotStatusTypeFilter).filter(e => e).length === 0 &&
        optionValue === ContextMenuOptions.ALL
    );
  }, [stadsdeelFilter, spotTypeFilter, spotStatusTypeFilter]);

  const trackFilter = useCallback(
    name => {
      trackEvent({ category: 'Map filters', action: name });
    },
    [trackEvent]
  );

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
      updatedSpotTypeFilter || resetFilter(spotTypeFilter),
      updatedSpotStatusTypeFilter || resetFilter(spotStatusTypeFilter),
      updatedBlackspotYearFilter || resetFilter(blackspotYearFilter),
      updatedDeliveredYearFilter || resetFilter(deliveredYearFilter),
      updatedQuickscanYearFilter || resetFilter(quickscanYearFilter),
      updatedStadsdeelFilter || resetFilter(stadsdeelFilter)
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
              <label
                key={year}
                htmlFor={year}
                className={styles.CheckboxWrapper}
              >
                <input
                  id={year}
                  type="checkbox"
                  checked={value}
                  onChange={() => {
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
                      trackFilter(`On blackspot list: ${year}`);
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
              <label
                key={year}
                htmlFor={year}
                className={styles.CheckboxWrapper}
              >
                <input
                  id={year}
                  type="checkbox"
                  checked={value}
                  onChange={() => {
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
                      trackFilter(`Delivered on: ${year}`);
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
              <label
                key={year}
                htmlFor={year}
                className={styles.CheckboxWrapper}
              >
                <input
                  id={year}
                  type="checkbox"
                  checked={value}
                  onChange={() => {
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
                      trackFilter(`On quickscan list: ${year}`);
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
            <label key={key} htmlFor={key} className={styles.CheckboxWrapper}>
              <input
                id={key}
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
            <label key={key} htmlFor={key} className={styles.CheckboxWrapper}>
              <input
                id={key}
                type="checkbox"
                checked={value}
                onChange={() => {
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

  const renderStadsdeelCheckboxes = useMemo(() => {
    return (
      <>
        <h5>Stadsdeel</h5>
        {Object.keys(Stadsdeel).map(key => {
          const type = Stadsdeel[key].name;
          const value = stadsdeelFilter[type];
          return (
            <label key={key} htmlFor={key} className={styles.CheckboxWrapper}>
              <input
                id={key}
                type="checkbox"
                checked={value}
                onChange={() => {
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
  }, [stadsdeelFilter]);

  const togglePanel = () => setShowPanel(!showPanel);
  const handleKeyPress = event => {
    if (event.key === 'Enter') togglePanel();
  };

  return (
    <div
      data-testid="filter-panel"
      className={classNames(styles.FilterPanel, {
        [styles.FilterPanelCollapsed]: !showPanel,
      })}
    >
      <div
        role="button"
        className={styles.TopBar}
        onClick={togglePanel}
        onKeyPress={handleKeyPress}
        tabIndex="0"
      >
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
          {optionValue !== ContextMenuOptions.ALL && <h5>Jaar</h5>}
          {optionValue === ContextMenuOptions.BLACKSPOTS &&
            renderBlackspotYearCheckboxes()}
          {optionValue === ContextMenuOptions.DELIVERED &&
            renderDeliveredYearCheckboxes()}
          {optionValue === ContextMenuOptions.QUICKSCANS &&
            renderQuickscanYearCheckboxes()}
          {(optionValue === ContextMenuOptions.ALL ||
            optionValue === ContextMenuOptions.DELIVERED) &&
            renderTypeCheckboxes()}
          {optionValue !== ContextMenuOptions.DELIVERED &&
            renderStatusCheckboxes()}
          {renderStadsdeelCheckboxes}
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
  spotTypeFilter: PropTypes.shape({}).isRequired,
  spotStatusTypeFilter: PropTypes.shape({}).isRequired,
  blackspotYearFilter: PropTypes.shape({}).isRequired,
  deliveredYearFilter: PropTypes.shape({}).isRequired,
  quickscanYearFilter: PropTypes.shape({}).isRequired,
  stadsdeelFilter: PropTypes.shape({}).isRequired,
  setFilters: PropTypes.func.isRequired,
  setBlackspotListFilter: PropTypes.func.isRequired,
  setQuickscanListFilter: PropTypes.func.isRequired,
  setDeliveredListFilter: PropTypes.func.isRequired,
};

export default FilterPanel;
