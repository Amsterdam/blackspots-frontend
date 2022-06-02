import BlackSpotIcon from 'assets/markers/IconBlackSpot';
import IconGebiedslocatieIVM from 'assets/markers/IconGebiedslocatieIVM';
import ProtocolIcon from 'assets/markers/IconProtocol';
import ProtocolErnstigIcon from 'assets/markers/IconProtocolErnstig';
import RisicoIcon from 'assets/markers/IconRisico';
import IconSchoolstraat from 'assets/markers/IconSchoolstraat';
import IconVSO from 'assets/markers/IconVSO';
import WegvakIcon from 'assets/markers/IconWegvak';

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
  GEBIEDSLOCATIE_IVM: 'gebiedslocatie IVM',
  SCHOOLSTRAAT: 'schoolstraat',
  VSO: 'vso',
};

export const Stadsdeel = {
  CENTRUM: { name: 'Centrum', value: 'A' },
  NIEUW_WEST: { name: 'Nieuw West', value: 'F' },
  NOORD: { name: 'Noord', value: 'N' },
  OOST: { name: 'Oost', value: 'M' },
  WEESP: { name: 'Weesp', value: 'S' },
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
  [SpotTypes.RISICO]: 'Risicolocatie IVM',
  [SpotTypes.SCHOOLSTRAAT]: 'Schoolstraat',
  [SpotTypes.VSO]: 'VSO',
  [SpotTypes.GEBIEDSLOCATIE_IVM]: 'Gebiedslocatie IVM',
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
  [SpotTypes.SCHOOLSTRAAT]: IconSchoolstraat,
  [SpotTypes.VSO]: IconVSO,
  [SpotTypes.GEBIEDSLOCATIE_IVM]: IconGebiedslocatieIVM,
};

export const SpotStatusColor = {
  [SpotStatusTypes.ONDERZOEK]: '#ec0000',
  [SpotStatusTypes.VOORBEREIDING]: '#ff9100',
  [SpotStatusTypes.UITVOERING]: '#ffe600',
  [SpotStatusTypes.GEREED]: '#00a03c',
  [SpotStatusTypes.GEEN_MAATREGEL]: '#b4b4b4',
};

export const endpoints = {
  blackspots: `${process.env.REACT_APP_API_ROOT}blackspots/`,
};
