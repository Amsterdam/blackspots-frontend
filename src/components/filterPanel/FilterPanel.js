import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import SVGIcon from 'components/SVGIcon/SVGIcon';
import { SpotStatusTypes, SpotTypes, Stadsdeel, endpoints } from 'config';
import { resetFilter } from 'components/map/helpers';
import classNames from 'classnames';
import { ReactComponent as FilterIcon } from 'assets/icons/icon-filter.svg';
import { ReactComponent as ChevronIcon } from 'assets/icons/chevron-top.svg';
import { Button, themeSpacing } from '@amsterdam/asc-ui';
import styled from 'styled-components';
import { FilterContext } from 'shared/reducers/FilterContext';
import { actions } from 'shared/reducers/filter';
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
        spotTypeFilter: updatedSpotTypeFilter,
        spotStatusTypeFilter: updatedSpotStatusTypeFilter,
        blackspotYearFilter: updatedBlackspotYearFilter,
        deliveredYearFilter: updatedDeliveredYearFilter,
        quickscanYearFilter: updatedQuickscanYearFilter,
        stadsdeelFilter: updatedStadsdeelFilter,
      };

      dispatch(actions.setFilter(newFilter));

      // setFilters(
      //   updatedSpotTypeFilter || resetFilter(spotTypeFilter),
      //   updatedSpotStatusTypeFilter || resetFilter(spotStatusTypeFilter),
      //   updatedBlackspotYearFilter || resetFilter(blackspotYearFilter),
      //   updatedDeliveredYearFilter || resetFilter(deliveredYearFilter),
      //   updatedQuickscanYearFilter || resetFilter(quickscanYearFilter),
      //   updatedStadsdeelFilter || resetFilter(stadsdeelFilter)
      // );
    },
    [filter, dispatch, actions.setFilter]
  );

  useEffect(() => {
    updateFilters();
  }, []);

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
            const value = filter?.blackspotYearFilter[year];
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
                      filter?.spotTypeFilter,
                      filter?.spotStatusTypeFilter,
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
          const value = filter?.spotStatusTypeFilter[type];
          return (
            <label key={key} htmlFor={key} className={styles.CheckboxWrapper}>
              <input
                id={key}
                type="checkbox"
                checked={value}
                onChange={() => {
                  const updatedFilter = {
                    ...filter?.spotStatusTypeFilter,
                    [type]: !value,
                  };
                  updateFilters(
                    filter?.spotTypeFilter,
                    updatedFilter,
                    filter?.blackspotYearFilter,
                    filter?.deliveredYearFilter,
                    filter?.quickscanYearFilter,
                    filter?.stadsdeelFilter
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
    // spotTypeFilter
    return (
      <>
        <h5>Type</h5>
        {Object.keys(SpotTypes).map(key => {
          const type = SpotTypes[key];
          const value = filter?.spotTypeFilter[type];
          return (
            <label key={key} htmlFor={key} className={styles.CheckboxWrapper}>
              <input
                id={key}
                type="checkbox"
                checked={value}
                onChange={() => {
                  const updatedFilter = {
                    ...filter?.spotTypeFilter,
                    [type]: !value,
                  };
                  if (!value) {
                    trackFilter(type);
                  }
                  updateFilters(
                    updatedFilter,
                    filter?.spotStatusTypeFilter,
                    filter?.blackspotYearFilter,
                    filter?.deliveredYearFilter,
                    filter?.quickscanYearFilter,
                    filter?.stadsdeelFilter
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
          const value = filter?.stadsdeelFilter[type];
          return (
            <label key={key} htmlFor={key} className={styles.CheckboxWrapper}>
              <input
                id={key}
                type="checkbox"
                checked={value}
                onChange={() => {
                  const updatedFilter = {
                    ...filter?.stadsdeelFilter,
                    [type]: !value,
                  };
                  if (!value) {
                    trackFilter(type);
                  }
                  updateFilters(
                    filter?.spotTypeFilter,
                    filter?.spotStatusTypeFilter,
                    filter?.blackspotYearFilter,
                    filter?.deliveredYearFilter,
                    filter?.quickscanYearFilter,
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
  }, [filter, Stadsdeel]);

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

export default FilterPanel;
