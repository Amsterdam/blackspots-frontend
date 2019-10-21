import { ReactComponent as BlackSpotIcon } from 'assets/markers/icon-blackspot.svg';
import { ReactComponent as ProtocolIcon } from 'assets/markers/icon-protocol.svg';
import { ReactComponent as ProtocolErnstigIcon } from 'assets/markers/icon-protocolErnstig.svg';
import { ReactComponent as RisicoIcon } from 'assets/markers/icon-risico.svg';
import { ReactComponent as WegvakIcon } from 'assets/markers/icon-wegvak.svg';
import StatusColors from 'styles/_colors.scss';

export const appRoutes = {
  HOME: '/',
  CONCEPTS: '/concepts',
  CONTACT: '/contact',
  ADD: '/new-location',
  MODIFY: '/modify-location',
};

export const SpotTypes = {
  BLACKSPOT: 'blackspot',
  WEGVAK: 'wegvak',
  PROTOCOL_DODELIJK: 'protocol dodelijk',
  PROTOCOL_ERNSTIG: 'protocol ernstig',
  RISICO: 'risico',
};

export const spotTypeDisplayNames = {
  [SpotTypes.BLACKSPOT]: 'Blackspot',
  [SpotTypes.WEGVAK]: 'Red route',
  [SpotTypes.PROTOCOL_DODELIJK]: 'Protocol dodelijk ongeval',
  [SpotTypes.PROTOCOL_ERNSTIG]: 'Protocol ernstig ongeval',
  [SpotTypes.RISICO]: 'Risico',
};

export const SpotStatusTypes = {
  ONDERZOEK: 'onderzoek ontwerp',
  VOORBEREIDING: 'voorbereiding',
  UITVOERING: 'uitvoering',
  GEREED: 'gereed',
  GEEN_MAATREGEL: 'geen maatregel',
};

export const StatusDisplayNames = {
  [SpotStatusTypes.ONDERZOEK]: 'In onderzoek',
  [SpotStatusTypes.VOORBEREIDING]: 'In voorbereiding',
  [SpotStatusTypes.UITVOERING]: 'In uitvoering',
  [SpotStatusTypes.GEREED]: 'Gereed',
  [SpotStatusTypes.GEEN_MAATREGEL]: 'Geen maatregel',
};

export const SpotIcons = {
  [SpotTypes.BLACKSPOT]: BlackSpotIcon,
  [SpotTypes.PROTOCOL_DODELIJK]: ProtocolIcon,
  [SpotTypes.PROTOCOL_ERNSTIG]: ProtocolErnstigIcon,
  [SpotTypes.RISICO]: RisicoIcon,
  [SpotTypes.WEGVAK]: WegvakIcon,
};

export const SpotStatusColor = {
  [SpotStatusTypes.ONDERZOEK]: StatusColors.ONDERZOEK,
  [SpotStatusTypes.VOORBEREIDING]: StatusColors.VOORBEREIDING,
  [SpotStatusTypes.UITVOERING]: StatusColors.UITVOERING,
  [SpotStatusTypes.GEREED]: StatusColors.GEREED,
  [SpotStatusTypes.GEEN_MAATREGEL]: StatusColors.GEEN_MAATREGEL,
};
