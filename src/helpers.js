/**
 * Get the spot type of a marker
 */
export function getSpotTypeFromMarker(marker) {
  return marker.properties.spot_type;
}

/**
 * Get the status type of a marker
 */
export function getStatusTypeFromMarker(marker) {
  return marker.properties.status;
}

/**
 * Get the blackspot year of a marker
 */
export function getBlackspotYearFromMarker(marker) {
  return marker.properties.jaar_blackspotlijst;
}

/**
 * Get the delivery year of a marker
 */
export function getDeliveredYearFromMarker(marker) {
  return marker.properties.jaar_oplevering;
}

/**
 * Get the quickscan year of a marker
 */
export function getQuickscanYearFromMarker(marker) {
  return marker.properties.jaar_ongeval_quickscan;
}
