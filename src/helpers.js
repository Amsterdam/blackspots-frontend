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

/**
 * Check if the acc or prod env should be used
 */
export function shouldUseAccEnv() {
  return (
    window.location.hostname.indexOf('acc') >= 0 ||
    window.location.hostname.indexOf('localhost') >= 0
  );
}

// =====
// PIWIK
// Temporarily simple setup, wating for hook library which is on the way
// =====

function pushToPiwik(payload) {
  const piwik = window._paq || [];
  piwik.push(payload);
}

export function trackPageView() {
  pushToPiwik(['setCustomUrl', document.location.href]);
  pushToPiwik(['trackPageView']);
}

export function trackFilter(name) {
  pushToPiwik(['trackEvent', 'Map filters', name]);
}

export function trackDownload() {
  pushToPiwik(['trackEvent', 'PDF download']);
}
