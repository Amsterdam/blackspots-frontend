import React from "react";

import L from "leaflet";
import "leaflet/dist/leaflet";
import "leaflet/dist/leaflet.css";
import "amsterdam-amaps/dist/nlmaps/dist/assets/css/nlmaps.css";
import "amsterdam-stijl/dist/css/ams-stijl.css";
import amaps from "amsterdam-amaps/dist/amaps";

import { MapContainer } from "./Map.styled";
import { getAllBlackspots } from "../../services/geo-api";
import { MarkerTypes } from "./customMarkers";

class Map extends React.Component {
  componentDidMount() {
    const map = amaps.createMap({
      center: {
        latitude: 52.36988741057662,
        longitude: 4.8966407775878915
      },
      layer: "standaard",
      target: "mapdiv",
      search: true,
      zoom: 14
    });

    getAllBlackspots().then(data => {
      L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
          return L.marker(latlng, {
            icon: MarkerTypes[feature.properties.spot_type]
          });
        }
      }).addTo(map);
    });
  }

  render() {
    return (
      <MapContainer>
        <div id="mapdiv" style={{ height: "100%" }} />
      </MapContainer>
    );
  }
}

export default Map;
