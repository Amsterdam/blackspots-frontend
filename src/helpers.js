import { SpotTypes } from 'config';

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
