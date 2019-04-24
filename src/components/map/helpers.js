import { getSpotTypeFromMarker } from 'helpers';
import { getStatusTypeFromMarker } from '../../helpers';

// Loop through markers and set the visibilty based on type, status or year
export function evaluateMarkerVisibility(
  markers,
  spotTypeFilter,
  spotStatusTypeFilter
) {
  markers.forEach(marker => {
    if (
      isVisibleSpotType(spotTypeFilter, marker) &&
      isVisibleStatusType(spotStatusTypeFilter, marker)
    ) {
      marker._icon.style.display = 'initial';
    } else {
      marker._icon.style.display = 'none';
    }
  });
}

// Check if a marker should be visible based on the type filter
function isVisibleSpotType(spotTypeFilter, marker) {
  const spotType = getSpotTypeFromMarker(marker);
  return allValuesAreFalse(spotTypeFilter) ? true : spotTypeFilter[spotType];
}

// Check if a marker should be visible based on the status filter
function isVisibleStatusType(spotStatusTypeFilter, marker) {
  const statusType = getStatusTypeFromMarker(marker);
  return allValuesAreFalse(spotStatusTypeFilter)
    ? true
    : spotStatusTypeFilter[statusType];
}

// Check if all values of an object are falsy
function allValuesAreFalse(object) {
  return Object.values(object).every(v => !v);
}
