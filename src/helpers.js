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

// =====
// MATOMO
// Temporarily simple setup, wating for hook library which is on the way
// =====

function pushToMatomo(payload) {
  const matomo = window._paq || [];
  matomo.push(payload);
}

export function trackPageView() {
  pushToMatomo(['setCustomUrl', document.location.href]);
  pushToMatomo(['trackPageView']);
}

export function trackFilter(name) {
  pushToMatomo(['trackEvent', 'Map filters', name]);
}

export function trackDownload() {
  pushToMatomo(['trackEvent', 'PDF download']);
}
