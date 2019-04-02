import React from 'react';
import L from 'leaflet';
import { renderToString } from 'react-dom/server';

// Imports needed for amaps
import 'leaflet/dist/leaflet';
import 'leaflet/dist/leaflet.css';
import 'amsterdam-amaps/dist/nlmaps/dist/assets/css/nlmaps.css';
import 'amsterdam-stijl/dist/css/ams-stijl.css';
import amaps from 'amsterdam-amaps/dist/amaps';

import { MapContainer, ErrorDiv, LoadingDiv, Spinner } from './Map.styled';
import { getAllBlackspots } from '../../services/geo-api';
import SVGIcon from '../SVGIcon/SVGIcon';
import DetailPanel from '../detailPanel/DetailPanel';

// CSS needed for custom leaflet markers
import './markerStyle.css';

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
            // Create a marker with the correct icon and onClick method
            const { status, spot_type } = feature.properties;
            return L.marker(latlng, {
              icon: L.divIcon({
                // Add the correct classname based on type
                // Risico types have a bigger icon therefore need more margin
                className: `marker-div-icon ${
                  spot_type === 'risico' ? 'large' : ''
                }`,
                html: renderToString(
                  <SVGIcon type={spot_type} status={status} />
                ),
              }),
            }).on('click', () => onMarkerClick(feature, latlng, map));
          },
        }).addTo(map);
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ error: true, loading: false });
      });
  }

  onMarkerClick(feature, latlng, map) {
    map.flyTo(latlng, 14);
    this.setState({ feature, showPanel: true });
  }

  // Toggle the detail panel
  togglePanel() {
    this.setState(prevState => ({ showPanel: !prevState.showPanel }));
  }

  render() {
    const { loading, error, showPanel, feature } = this.state;

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
            isOpen={showPanel}
            togglePanel={this.togglePanel.bind(this)}
          />
        </div>
      </MapContainer>
    );
  }
}

export default Map;
