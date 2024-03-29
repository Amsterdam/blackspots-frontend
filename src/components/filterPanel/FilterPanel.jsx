import { useState, useEffect, useCallback } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { Stadsdeel, endpoints } from 'config';
import classNames from 'classnames';
import { ReactComponent as FilterIcon } from 'assets/icons/icon-filter.svg';
import { ReactComponent as ChevronIcon } from 'assets/icons/chevron-top.svg';
import { Button, themeSpacing } from '@amsterdam/asc-ui';
import styled from 'styled-components';
import {
  useDispatch,
  useFilterStateValue,
} from 'shared/reducers/FilterContext';
import { actions, initialState } from 'shared/reducers/filter';
import useDownload from 'shared/hooks/useDownload';
import SelectMenu from '../../shared/selectMenu/SelectMenu';
import StadsdeelFilter from './components/StadsdeelFilter';
import TypeFilter from './components/TypeFilter';
import StatusFilter from './components/StatusFilter';
import BlackspotYearFilter from './components/BlackspotYearFilter';
import DeliveredYearFilter from './components/DeliveredYearFilter';
import QuickscanYearFilter from './components/QuickscanYearFilter';
import { ContextMenuOptions, MenuOptions } from './FilterPanel.constants';
import styles from './FilterPanel.module.scss';
import IvmYearFilter from './components/IvmYearFilter';

const ExportButton = styled(Button)`
  margin: ${themeSpacing(2, 0)};
`;

const FilterWrapperStyle = styled.div`
  max-height: calc(550px - 33px);
  overflow-x: hidden;
  overflow-y: auto;
`;

const exportUrl = `${endpoints.blackspots}export/?`;

export const getExportFilter = (stadsdeelFilter) => {
  if (Object.values(stadsdeelFilter).filter(Boolean).length === 0) return '';
  const stadsdeelName = Object.keys(stadsdeelFilter).find(
    (key) => stadsdeelFilter[key] === true
  );
  const stadsdeel = Object.values(Stadsdeel).find(
    (item) => item.name === stadsdeelName
  );
  return `stadsdeel=${stadsdeel.value}`;
};

const FilterPanel = () => {
  const filter = useFilterStateValue();
  const dispatch = useDispatch();

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
      Object.values(filter?.stadsdeelFilter).filter((e) => e).length <= 1 &&
        Object.values(filter?.spotTypeFilter).filter((e) => e).length === 0 &&
        Object.values(filter?.spotStatusTypeFilter).filter((e) => e).length ===
          0 &&
        optionValue === ContextMenuOptions.ALL
    );
  }, [
    filter.stadsdeelFilter,
    filter.spotTypeFilter,
    filter.spotStatusTypeFilter,
    optionValue,
  ]);

  const trackFilter = useCallback(
    (name) => {
      trackEvent({ category: 'Map filters', action: name });
    },
    [trackEvent]
  );

  /**
   * Update the filters of the actual map
   */
  const updateFilters = useCallback(
    (newFilter) => {
      if (!newFilter) return;

      dispatch(actions.setFilter(newFilter));
    },
    [dispatch]
  );

  useEffect(() => {
    updateFilters();
  }, [updateFilters]);

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

  const togglePanel = () => setShowPanel(!showPanel);
  const handleKeyPress = (event) => {
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
          <h5>Toon</h5>
          <SelectMenu
            items={[...MenuOptions]}
            selectionChanged={processOptionChange}
            defaultValue={filter.show}
          />

          {filter.show !== ContextMenuOptions.ALL && <h5>Jaar</h5>}
          {filter.show === ContextMenuOptions.BLACKSPOTS && (
            <BlackspotYearFilter
              updateFilters={(blackspotYearFilter) => {
                updateFilters({
                  ...filter,
                  blackspotYearFilter,
                });
              }}
              trackFilter={trackFilter}
              filterValues={filter?.blackspotYearFilter}
            />
          )}
          {filter.show === ContextMenuOptions.DELIVERED && (
            <DeliveredYearFilter
              updateFilters={(deliveredYearFilter) => {
                updateFilters({ ...filter, deliveredYearFilter });
              }}
              trackFilter={trackFilter}
              filterValues={filter?.deliveredYearFilter}
            />
          )}
          {filter.show === ContextMenuOptions.QUICKSCANS && (
            <QuickscanYearFilter
              updateFilters={(quickscanYearFilter) => {
                updateFilters({ ...filter, quickscanYearFilter });
              }}
              trackFilter={trackFilter}
              filterValues={filter?.quickscanYearFilter}
            />
          )}
          {filter.show === ContextMenuOptions.IVM && (
            <IvmYearFilter
              updateFilters={(ivmYearFilter) => {
                updateFilters({ ...filter, ivmYearFilter });
              }}
              trackFilter={trackFilter}
              filterValues={filter?.ivmYearFilter}
            />
          )}
          {(filter.show === ContextMenuOptions.ALL ||
            filter.show === ContextMenuOptions.DELIVERED) && (
            <TypeFilter
              updateFilters={(spotTypeFilter) => {
                updateFilters({ ...filter, spotTypeFilter });
              }}
              trackFilter={trackFilter}
            />
          )}
          {filter.show !== ContextMenuOptions.DELIVERED && (
            <StatusFilter
              updateFilters={(spotStatusTypeFilter) => {
                updateFilters({ ...filter, spotStatusTypeFilter });
              }}
              trackFilter={trackFilter}
            />
          )}
          <StadsdeelFilter
            updateFilters={(stadsdeelFilter) => {
              updateFilters({ ...filter, stadsdeelFilter });
            }}
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
