import React from "react";
import L from "leaflet";

import { ReactComponent as BlackSpotIcon } from "assets/markers/icon-blackspot.svg";
import { ReactComponent as ProtocolIcon } from "assets/markers/icon-protocol.svg";
import { ReactComponent as ProtocolErnstigIcon } from "assets/markers/icon-protocolErnstig.svg";
import { ReactComponent as RisicoIcon } from "assets/markers/icon-risico.svg";
import { ReactComponent as WegvakIcon } from "assets/markers/icon-wegvak.svg";

export const BlackspotMarker = L.icon({
  iconUrl: BlackSpotIcon,
  // iconSize: [20, 20],
  className: "red"
});

export const ProtocolMarker = L.icon({
  iconUrl: ProtocolIcon,
  iconSize: [20, 20]
});

export const ProtocolErnstigMarker = L.icon({
  iconUrl: ProtocolErnstigIcon,
  iconSize: [20, 20]
});

export const RisicoMarker = L.icon({
  iconUrl: RisicoIcon,
  iconSize: [20, 20]
});

export const WegvakMarker = L.icon({
  iconUrl: WegvakIcon,
  iconSize: [20, 20]
});

export const MarkerTypes = {
  Blackspot: BlackSpotIcon,
  Protocol_dodelijk: ProtocolIcon,
  Protocol_ernstig: ProtocolErnstigIcon,
  Risico: RisicoIcon,
  Wegvak: WegvakIcon
};

export const StatusColor = {
  "Onderzoek/ ontwerp": "#FF9100",
  Voorbereiding: "#FFE600",
  Gereed: "#00A03C",
  "Geen maatregel": "#009DE6",
  Uitvoering: "tomato",
  Onbekend: "rgba(236,0,0)"
};

export default ({ type, status }) => {
  const Marker = MarkerTypes[type];

  return <Marker strokeWidth="3px" stroke={StatusColor[status]} />;
};
