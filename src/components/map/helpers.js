import { getSpotTypeFromMarker } from 'helpers';
import {
  getStatusTypeFromMarker,
  getBlackspotYearFromMarker,
  getDeliveredYearFromMarker,
  getQuickscanYearFromMarker,
} from '../../helpers';
import { SpotTypes, SpotStatusTypes } from '../../constants';

/**
 * Loop through markers and set its visibility based on the filters
 */
export function evaluateMarkerVisibility(
  markers,
  spotTypeFilter,
  spotStatusTypeFilter,
  blackspotYearFilter,
  deliveredYearFilter,
  quickscanYearFilter,
  blackspotListFilter,
  quickscanListFilter,
  deliveredListFilter
) {
  markers.forEach(marker => {
    if (
      isVisibleSpotType(
        spotTypeFilter,
        blackspotListFilter,
        quickscanListFilter,
        deliveredListFilter,
        marker
      ) &&
      isVisibleStatusType(spotStatusTypeFilter, marker) &&
      isVisibleBlackspotYear(blackspotYearFilter, marker) &&
      isVisibleDeliveredYear(deliveredYearFilter, marker) &&
      isVisibleQuickscanYear(quickscanYearFilter, marker)
    ) {
      marker._icon.style.display = 'initial';
    } else {
      marker._icon.style.display = 'none';
    }
  });
}

/**
 * Check if a marker should be visible based on the type filter
 * */
function isVisibleSpotType(
  spotTypeFilter,
  blackspotListFilter,
  quickscanListFilter,
  deliveredListFilter,
  marker
) {
  const spotType = getSpotTypeFromMarker(marker);
  const spotStatus = getStatusTypeFromMarker(marker);

  // Check if the spot should be visible based on the spotTypeFilter
  const showBasedOnTypeFilter = allValuesAreFalse(spotTypeFilter)
    ? true
    : spotTypeFilter[spotType];

  // Check if the spot should be visible based on the list filters
  const showBasedOnListFilter = (function() {
    if (blackspotListFilter) {
      return spotType === SpotTypes.BLACKSPOT || spotType === SpotTypes.WEGVAK;
    } else if (quickscanListFilter) {
      return (
        spotType === SpotTypes.PROTOCOL_DODELIJK ||
        spotType === SpotTypes.PROTOCOL_ERNSTIG
      );
    } else if (deliveredListFilter) {
      return spotStatus === SpotStatusTypes.GEREED;
    } else {
      return true;
    }
  })();

  return showBasedOnTypeFilter && showBasedOnListFilter;
}

/**
 * Check if a marker should be visible based on the status filter
 */
function isVisibleStatusType(spotStatusTypeFilter, marker) {
  const statusType = getStatusTypeFromMarker(marker);
  return allValuesAreFalse(spotStatusTypeFilter)
    ? true
    : spotStatusTypeFilter[statusType];
}

/**
 * Check if a marker should be visible based on the blackspot year filter
 */
function isVisibleBlackspotYear(blackspotYearFilter, marker) {
  const year = getBlackspotYearFromMarker(marker);
  return allValuesAreFalse(blackspotYearFilter)
    ? true
    : blackspotYearFilter[year];
}

/**
 * Check if a marker should be visible based on the delivery year filter
 */
function isVisibleDeliveredYear(deliveredYearFilter, marker) {
  const year = getDeliveredYearFromMarker(marker);
  return allValuesAreFalse(deliveredYearFilter)
    ? true
    : deliveredYearFilter[year];
}

/**
 * Check if a marker should be visible based on the quickscan year filter
 */
function isVisibleQuickscanYear(quickscanYearFilter, marker) {
  const year = getQuickscanYearFromMarker(marker);
  return allValuesAreFalse(quickscanYearFilter)
    ? true
    : quickscanYearFilter[year];
}

/**
 * Check if all values of an object are falsy
 */
function allValuesAreFalse(object) {
  return Object.values(object).every(v => !v);
}

/**
 * Set all values in an object to false, effectively resetting a filter
 */
export function resetFilter(filter) {
  const resetFilter = {};
  Object.keys(filter).forEach(k => (resetFilter[k] = false));
  return resetFilter;
}
