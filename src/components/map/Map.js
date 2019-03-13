import React from "react";

import "leaflet/dist/leaflet";
import "leaflet/dist/leaflet.css";
import "amsterdam-amaps/dist/nlmaps/dist/assets/css/nlmaps.css";
import "amsterdam-stijl/dist/css/ams-stijl.css";
import amaps from "amsterdam-amaps/dist/amaps";
import { MapContainer } from "./Map.styled";

class Map extends React.Component {
  componentDidMount() {
    amaps.createMap({
      center: {
        latitude: 52.36988741057662,
        longitude: 4.8966407775878915
      },
      layer: "standaard",
      target: "mapdiv",
      marker: true,
      search: true,
      zoom: 14
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
