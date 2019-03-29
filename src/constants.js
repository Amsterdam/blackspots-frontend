import { ReactComponent as BlackSpotIcon } from 'assets/markers/icon-blackspot.svg';
import { ReactComponent as ProtocolIcon } from 'assets/markers/icon-protocol.svg';
import { ReactComponent as ProtocolErnstigIcon } from 'assets/markers/icon-protocolErnstig.svg';
import { ReactComponent as RisicoIcon } from 'assets/markers/icon-risico.svg';
import { ReactComponent as WegvakIcon } from 'assets/markers/icon-wegvak.svg';

export const appRoutes = {
  HOME: '/',
  CONCEPTS: '/concepts',
  CONTACT: '/contact',
};

export const MarkerIcons = {
  Blackspot: BlackSpotIcon,
  Protocol_dodelijk: ProtocolIcon,
  Protocol_ernstig: ProtocolErnstigIcon,
  Risico: RisicoIcon,
  Wegvak: WegvakIcon,
};

export const BlackspotStatusColor = {
  'Onderzoek/ ontwerp': '#FF9100',
  Voorbereiding: '#FFE600',
  Gereed: '#00A03C',
  'Geen maatregel': '#009DE6',
  Uitvoering: 'tomato',
  Onbekend: 'rgba(236,0,0)',
};
