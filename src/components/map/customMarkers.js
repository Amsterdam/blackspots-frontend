import L from 'leaflet';

import BlackSpotIcon from 'assets/markers/icon-blackspot.svg';
import ProtocolIcon from 'assets/markers/icon-protocol.svg';
import ProtocolErnstigIcon from 'assets/markers/icon-protocolErnstig.svg';
import RisicoIcon from 'assets/markers/icon-risico.svg';
import WegvakIcon from 'assets/markers/icon-wegvak.svg';

export const BlackspotMarker = L.icon({
  iconUrl: BlackSpotIcon,
  iconSize: [20, 20],
});

export const ProtocolMarker = L.icon({
  iconUrl: ProtocolIcon,
  iconSize: [20, 20],
});

export const ProtocolErnstigMarker = L.icon({
  iconUrl: ProtocolErnstigIcon,
  iconSize: [20, 20],
});

export const RisicoMarker = L.icon({
  iconUrl: RisicoIcon,
  iconSize: [20, 20],
});

export const WegvakMarker = L.icon({
  iconUrl: WegvakIcon,
  iconSize: [20, 20],
});

export const MarkerTypes = {
  Blackspot: BlackspotMarker,
  Protocol_dodelijk: ProtocolMarker,
  Protocol_ernstig: ProtocolErnstigMarker,
  Risico: RisicoMarker,
  Wegvak: WegvakMarker,
};
