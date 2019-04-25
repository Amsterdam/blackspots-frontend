// Capatilize a string
export function capitalizeString(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Get the spot type of a marker
export function getSpotTypeFromMarker(marker) {
  return marker.feature.properties.spot_type;
}

// Get the status type of a marker
export function getStatusTypeFromMarker(marker) {
  return marker.feature.properties.status;
}

// Get the year of a marker
export function getYearFromMarker(marker) {
  return marker.feature.properties.jaar_blackspotlijst;
}
