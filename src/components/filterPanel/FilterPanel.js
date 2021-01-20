import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { Stadsdeel, endpoints } from 'config';
import classNames from 'classnames';
import { ReactComponent as FilterIcon } from 'assets/icons/icon-filter.svg';
import { ReactComponent as ChevronIcon } from 'assets/icons/chevron-top.svg';
import { Button, themeSpacing } from '@amsterdam/asc-ui';
import styled from 'styled-components';
import { FilterContext } from 'shared/reducers/FilterContext';
import { actions, initialState } from 'shared/reducers/filter';
import useDownload from 'shared/hooks/useDownload';
import SelectMenu from '../../shared/selectMenu/SelectMenu';
import StadsdeelFilter from './components/StadsdeelFilter';
import TypeFilter from './components/TypeFilter';
import StatusFilter from './components/StatusFilter';
import BlackspotYearFilter from './components/BlackspotYearFilter';
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

const FilterPanel = () => {
  const {
    state: { filter },
    dispatch,
  } = useContext(FilterContext);

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
  }, [downloadUrl, downloadFile]);

  useEffect(() => {
    setDownloadUrl(`${exportUrl}${getExportFilter(filter?.stadsdeelFilter)}`);
    setCanDownload(
      Object.values(filter?.stadsdeelFilter).filter(e => e).length <= 1 &&
        Object.values(filter?.spotTypeFilter).filter(e => e).length === 0 &&
        Object.values(filter?.spotStatusTypeFilter).filter(e => e).length ===
          0 &&
        optionValue === ContextMenuOptions.ALL
    );
  }, [
    filter?.stadsdeelFilter,
    filter?.spotTypeFilter,
    filter?.spotStatusTypeFilter,
    optionValue,
  ]);

  const trackFilter = useCallback(
    name => {
      trackEvent({ category: 'Map filters', action: name });
    },
    [trackEvent]
  );

  /**
   * Update the filters of the actual map
   */
  const updateFilters = useCallback(
    (
      updatedSpotTypeFilter,
      updatedSpotStatusTypeFilter,
      updatedBlackspotYearFilter,
      updatedDeliveredYearFilter,
      updatedQuickscanYearFilter,
      updatedStadsdeelFilter
    ) => {
      if (!updatedSpotTypeFilter) return;

      // For every filter, if it has an actual filter object, pass it along to
      // the setFilter function received from the map, else, pass a resetted
      // filter.
      const newFilter = {
        show: filter.show,
        spotTypeFilter: updatedSpotTypeFilter,
        spotStatusTypeFilter: updatedSpotStatusTypeFilter,
        blackspotYearFilter: updatedBlackspotYearFilter,
        deliveredYearFilter: updatedDeliveredYearFilter,
        quickscanYearFilter: updatedQuickscanYearFilter,
        stadsdeelFilter: updatedStadsdeelFilter,
      };

      dispatch(actions.setFilter(newFilter));
    },
    [filter, dispatch, actions.setFilter]
  );

  useEffect(() => {
    updateFilters();
  }, []);

  function processOptionChange(value) {
    // Set the option value
    setOptionValue(value);

    // Changing options should reset the filters
    dispatch(
      actions.setFilter({
        ...initialState.filter,
        show: value,
      })
    );
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
   * Render the checkboxes for the delivered year filter
   */
  function renderDeliveredYearCheckboxes() {
    return (
      <div className={styles.YearFilter}>
        {Object.keys(filter?.deliveredYearFilter)
          .reverse()
          .map(year => {
            const value = filter?.deliveredYearFilter[year];
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
                      ...filter?.deliveredYearFilter,
                      [year]: !value,
                    };
                    updateFilters(
                      filter?.spotTypeFilter,
                      filter?.spotStatusTypeFilter,
                      filter?.deliveredYearFilter,
                      updatedFilter,
                      filter?.quickscanYearFilter,
                      filter?.stadsdeelFilter
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
        {Object.keys(filter?.quickscanYearFilter)
          .reverse()
          .map(year => {
            const value = filter?.quickscanYearFilter[year];
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
                      ...filter?.quickscanYearFilter,
                      [year]: !value,
                    };
                    updateFilters(
                      filter?.spotTypeFilter,
                      filter?.spotStatusTypeFilter,
                      filter?.blackspotYearFilter,
                      filter?.deliveredYearFilter,
                      updatedFilter,
                      filter?.stadsdeelFilter
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

  const togglePanel = () => setShowPanel(!showPanel);
  const handleKeyPress = event => {
    if (event.key === 'Enter') togglePanel();
  };

  return (
    <div
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
          {optionValue === ContextMenuOptions.BLACKSPOTS && (
            <BlackspotYearFilter
              updateFilters={updateFilters}
              trackFilter={trackFilter}
            />
          )}
          {optionValue === ContextMenuOptions.DELIVERED &&
            renderDeliveredYearCheckboxes()}
          {optionValue === ContextMenuOptions.QUICKSCANS &&
            renderQuickscanYearCheckboxes()}
          {(optionValue === ContextMenuOptions.ALL ||
            optionValue === ContextMenuOptions.DELIVERED) && (
            <TypeFilter
              updateFilters={updateFilters}
              trackFilter={trackFilter}
            />
          )}
          {optionValue !== ContextMenuOptions.DELIVERED && (
            <StatusFilter
              updateFilters={updateFilters}
              trackFilter={trackFilter}
            />
          )}
          <StadsdeelFilter
            updateFilters={updateFilters}
            trackFilter={trackFilter}
          />
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

export default FilterPanel;
