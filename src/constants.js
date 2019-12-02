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
  ADD: '/add',
  EDIT: '/edit/:id',
};

export const SpotTypes = {
  BLACKSPOT: 'blackspot',
  WEGVAK: 'wegvak',
  PROTOCOL_DODELIJK: 'protocol dodelijk',
  PROTOCOL_ERNSTIG: 'protocol ernstig',
  RISICO: 'risico',
};

export const Stadsdeel = {
  CENTRUM: { name: 'Centrum', value: 'A' },
  NIEUW_WEST: { name: 'Nieuw West', value: 'F' },
  NOORD: { name: 'Noord', value: 'N' },
  OOST: { name: 'Oost', value: 'M' },
  WEST: { name: 'West', value: 'E' },
  WESTPOORT: { name: 'Westpoort', value: 'B' },
  ZUID: { name: 'Zuid', value: 'K' },
  ZUIDOOST: { name: 'Zuidoost', value: 'T' },
};

export const SpotTypeDisplayNames = {
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

export const endpoints = {
  blackspots: `${process.env.REACT_APP_API_ROOT}blackspots/spots/?format=geojson`,
};
