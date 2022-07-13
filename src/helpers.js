import { SpotTypes } from 'config';

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

export const isBlackspotType = (spotType) =>
  spotType === SpotTypes.BLACKSPOT || spotType === SpotTypes.WEGVAK;

export const isProtocolType = (spotType) =>
  spotType === SpotTypes.PROTOCOL_DODELIJK ||
  spotType === SpotTypes.PROTOCOL_ERNSTIG;

export const isIvmType = (spotType) =>
  spotType === SpotTypes.GEBIEDSLOCATIE_IVM || spotType === SpotTypes.RISICO;

export const isPolygoonType = (spotType) =>
  spotType === SpotTypes.WEGVAK ||
  isIvmType(spotType) ||
  spotType === SpotTypes.VSO ||
  spotType === SpotTypes.SCHOOLSTRAAT;

export const isCoordinaatType = (spotType) =>
  spotType === SpotTypes.BLACKSPOT ||
  isIvmType(spotType) ||
  isProtocolType(spotType) ||
  spotType === SpotTypes.VSO ||
  spotType === SpotTypes.SCHOOLSTRAAT;
