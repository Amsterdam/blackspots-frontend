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
  spotType === SpotTypes.SCHOOLSTRAAT ||
  spotType === SpotTypes.VSO ||
  isIvmType(spotType);

export const isCoordinaatType = (spotType) =>
  spotType === SpotTypes.BLACKSPOT ||
  spotType === SpotTypes.VSO ||
  spotType === SpotTypes.SCHOOLSTRAAT ||
  isIvmType(spotType) ||
  isProtocolType(spotType);

export const isStrictPolygoonType = (type) =>
  isPolygoonType(type) && !isCoordinaatType(type);

export const isStrictCoordinaatType = (type) =>
  isCoordinaatType(type) && !isPolygoonType(type);
