import { getSpotTypeFromMarker } from 'helpers';
import { SpotTypes, SpotStatusTypes } from 'config';
import {
  getStatusTypeFromMarker,
  getBlackspotYearFromMarker,
  getDeliveredYearFromMarker,
  getQuickscanYearFromMarker,
} from '../../helpers';

/**
 * Check if all values of an object are falsy
 */
export const allValuesAreFalse = object => {
  return Object.values(object).every(v => !v);
};

/**
 * Check if a marker should be visible based on the type filter
 * */
function isVisibleSpotType(
  spotTypeFilter,
  blackspotListFilter,
  quickscanListFilter,
  deliveredListFilter,
  stadsdeelFilter,
  marker
) {
  const spotType = getSpotTypeFromMarker(marker);
  const spotStatus = getStatusTypeFromMarker(marker);
  const { stadsdeel } = marker.feature.properties;

  // Check if the spot should be visible based on the spotTypeFilter
  const showBasedOnTypeFilter = allValuesAreFalse(spotTypeFilter)
    ? true
    : spotTypeFilter[spotType];

  // Check if the spot should be visible based on the list filters
  const showBasedOnListFilter = (() => {
    if (blackspotListFilter) {
      return spotType === SpotTypes.BLACKSPOT || spotType === SpotTypes.WEGVAK;
    }
    if (quickscanListFilter) {
      return (
        spotType === SpotTypes.PROTOCOL_DODELIJK ||
        spotType === SpotTypes.PROTOCOL_ERNSTIG
      );
    }
    if (deliveredListFilter) {
      return spotStatus === SpotStatusTypes.GEREED;
    }
    return true;
  })();

  const showBasedOnStadsdeelFilter = allValuesAreFalse(stadsdeelFilter)
    ? true
    : stadsdeelFilter[stadsdeel];

  return (
    showBasedOnTypeFilter && showBasedOnListFilter && showBasedOnStadsdeelFilter
  );
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
 * Set all values in an object to false, effectively resetting a filter
 */
export const resetFilter = filter => {
  const result = {};
  Object.keys(filter).forEach(k => {
    result[k] = false;
  });
  return result;
};

/**
 * Loop through markers and set its visibility based on the filters
 */
export const evaluateMarkerVisibility = (
  markers,
  spotTypeFilter,
  spotStatusTypeFilter,
  blackspotYearFilter,
  deliveredYearFilter,
  quickscanYearFilter,
  blackspotListFilter,
  quickscanListFilter,
  deliveredListFilter,
  stadsdeelFilter
) => {
  if (markers)
    markers.forEach(marker => {
      if (
        isVisibleSpotType(
          spotTypeFilter,
          blackspotListFilter,
          quickscanListFilter,
          deliveredListFilter,
          stadsdeelFilter,
          marker
        ) &&
        isVisibleStatusType(spotStatusTypeFilter, marker) &&
        isVisibleBlackspotYear(blackspotYearFilter, marker) &&
        isVisibleDeliveredYear(deliveredYearFilter, marker) &&
        isVisibleQuickscanYear(quickscanYearFilter, marker)
      ) {
        // eslint-disable-next-line no-param-reassign
        marker._icon.style.visibility = 'visible'; // eslint-disable-line no-underscore-dangle
      } else {
        // eslint-disable-next-line no-param-reassign
        marker._icon.style.visibility = 'hidden'; // eslint-disable-line no-underscore-dangle
      }
    });
};
