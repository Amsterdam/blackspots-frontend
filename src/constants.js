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
  blackspot: BlackSpotIcon,
  'protocol dodelijk': ProtocolIcon,
  'protocol ernstig': ProtocolErnstigIcon,
  risico: RisicoIcon,
  wegvak: WegvakIcon,
};

export const BlackspotStatusColor = {
  'onderzoek ontwerp': '#FF9100',
  voorbereiding: '#FFE600',
  gereed: '#00A03C',
  'geen maatregel': '#009DE6',
  uitvoering: 'black',
  onbekend: 'rgba(236,0,0)',
};
