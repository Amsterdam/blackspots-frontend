import React from "react";
import ReactDOM from "react-dom";
import L from "leaflet";
import "leaflet/dist/leaflet";
import "leaflet/dist/leaflet.css";
import "amsterdam-amaps/dist/nlmaps/dist/assets/css/nlmaps.css";
import "amsterdam-stijl/dist/css/ams-stijl.css";
import amaps from "amsterdam-amaps/dist/amaps";
import { renderToString } from "react-dom/server";
import { MapContainer, ErrorDiv, LoadingDiv, Spinner } from "./Map.styled";
import { getAllBlackspots } from "../../services/geo-api";
import Marker, { MarkerTypes } from "./customMarkers";
import "./markerStyle.css";
import DetailPanel from '../detailPanel/DetailPanel';

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false,
      loading: true,
      showPanel: false,
      feature: null,
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.togglePanel = this.togglePanel.bind(this);
  }

  componentDidMount() {
    // Create map
    const map = amaps.createMap({
      center: {
        latitude: 52.36988741057662,
        longitude: 4.8966407775878915,
      },
      style: 'zwartwit',
      layer: 'standaard',
      target: 'mapdiv',
      search: true,
      zoom: 13,
    });

    // Add the stadsdelen WMS
    L.tileLayer
      .wms('https://map.data.amsterdam.nl/maps/gebieden?', {
        layers: ['stadsdeel'],
        transparent: true,
        format: 'image/png',
      })
      .addTo(map);

    // Set zoom config manually after adding WMS
    // For some reason this doesn't work when set during the creation of the map
    map.options.minZoom = 12;
    map.options.maxZoom = 21;

    // Declare the onMarkerfunction so it is locally known and useable in the
    // then of the getAllBlackspots call
    const onMarkerClick = this.onMarkerClick;

    // Get geo data
    getAllBlackspots()
      .then(geoData => {
        // Add the geo data to the map as markers
        L.geoJSON(geoData, {
          // Add custom markers
          pointToLayer: function(feature, latlng) {
            const { status, spot_type } = feature.properties;
            console.log(status);
            return L.marker(latlng, {
              icon: L.divIcon({
                className: "divIconClass",
                html: renderToString(
                  <Marker type={spot_type} status={status} />
                )
              })
            });
          }
        }).addTo(map);
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ error: true, loading: false });
      });
  }

  onMarkerClick(feature, latlng, map) {
    map.flyTo([latlng.lat, latlng.lng], 14);
    this.setState({ feature, showPanel: true });
  }

  // Toggle the detail panel
  togglePanel() {
    this.setState(prevState => ({ showPanel: !prevState.showPanel }));
  }

  render() {
    const { loading, error, showPanel, feature } = this.state;
    console.log(feature && feature.properties.description);
    return (
      <MapContainer>
        <div id="mapdiv" style={{ height: '100%' }}>
          {loading && (
            <LoadingDiv>
              <Spinner />
            </LoadingDiv>
          )}
          {error && (
            <ErrorDiv>
              <h3>Oops</h3>
              <p>
                De server is momenteel niet bereikbaar. Probeer het later nog
                eens.
              </p>
            </ErrorDiv>
          )}
          <DetailPanel
            feature={feature}
            open={showPanel}
            togglePanel={this.togglePanel.bind(this)}
          />
        </div>
      </MapContainer>
    );
  }
}

export default Map;
