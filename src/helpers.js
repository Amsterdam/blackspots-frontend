/**
 * Capatilize a string
 */
export function capitalizeString(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Get the spot type of a marker
 */
export function getSpotTypeFromMarker(marker) {
  return marker.feature.properties.spot_type;
}

/**
 * Get the status type of a marker
 */
export function getStatusTypeFromMarker(marker) {
  return marker.feature.properties.status;
}

/**
 * Get the blackspot year of a marker
 */
export function getBlackspotYearFromMarker(marker) {
  return marker.feature.properties.jaar_blackspotlijst;
}

/**
 * Get the delivery year of a marker
 */
export function getDeliveredYearFromMarker(marker) {
  return marker.feature.properties.jaar_oplevering;
}

/**
 * Get the quickscan year of a marker
 */
export function getQuickscanYearFromMarker(marker) {
  return marker.feature.properties.jaar_ongeval_quickscan;
}
