import React from 'react';
import L from 'leaflet';
import { renderToString } from 'react-dom/server';

// Imports needed for amaps
import 'leaflet/dist/leaflet.css';
import 'amsterdam-amaps/dist/nlmaps/dist/assets/css/nlmaps.css';
import 'amsterdam-stijl/dist/css/ams-map.css';
import amaps from 'amsterdam-amaps/dist/amaps';

import { MapContainer, ErrorDiv, LoadingDiv, Spinner } from './Map.styled';
import { getAllBlackspots } from '../../services/geo-api';
import SVGIcon from '../SVGIcon/SVGIcon';
import DetailPanel from '../detailPanel/DetailPanel';
import FilterPanel from '../filterPanel/FilterPanel';
import { evaluateMarkerVisibility } from './helpers';
import { SpotTypes, SpotStatusTypes } from 'constants.js';
import './markerStyle.css';

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false,
      loading: true,
      showDetailPanel: false,
      feature: null,
      spotYearFilter: [],
      spotStatusTypeFilter: {
        [SpotStatusTypes.ONDERZOEK]: false,
        [SpotStatusTypes.VOORBEREIDING]: false,
        [SpotStatusTypes.GEREED]: false,
        [SpotStatusTypes.GEEN_MAATREGEL]: false,
        [SpotStatusTypes.UITVOERING]: false,
        [SpotStatusTypes.ONBEKEND]: false,
      },
      spotTypeFilter: {
        [SpotTypes.BLACKSPOT]: false,
        [SpotTypes.PROTOCOL_DODELIJK]: false,
        [SpotTypes.PROTOCOL_ERNSTIG]: false,
        [SpotTypes.RISICO]: false,
        [SpotTypes.WEGVAK]: false,
      },
      geoData: null,
    };

    this.map = null;
    this.geoLayer = null;

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.toggleDetailPanel = this.toggleDetailPanel.bind(this);
    this.triggerVisibiltyEvaluation = this.triggerVisibiltyEvaluation.bind(
      this
    );
    this.setSpotTypeFilter = this.setSpotTypeFilter.bind(this);
    this.setSpotStatusTypeFilter = this.setSpotStatusTypeFilter.bind(this);
    this.setSpotYearFilter = this.setSpotYearFilter.bind(this);
  }

  componentDidMount() {
    // Create map
    this.map = amaps.createMap({
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
      .addTo(this.map);

    // Set zoom config manually after adding WMS
    // For some reason this doesn't work when set during the creation of the map
    this.map.options.minZoom = 12;
    this.map.options.maxZoom = 21;

    // Get geo data
    getAllBlackspots()
      .then(geoData => {
        const spotYearFilter = this.getYearsFilterFromMarkers(geoData);
        this.setState({ geoData, loading: false, spotYearFilter });
        this.renderMarkers();
      })
      .catch(err => {
        this.setState({ error: true, loading: false });
        console.error(err);
      });
  }

  // Get all the years on which to enable filters
  getYearsFilterFromMarkers(geoData) {
    const years = [
      ...new Set(geoData.features.map(f => f.properties.jaar_blackspotlijst)),
    ].sort();
    const spotYearsFilter = {};
    years.forEach(y => {
      // Check if year is actual a truthy value, some spots have no year
      // Will be fixed in time I suppose
      if (y) {
        spotYearsFilter[y] = false;
      }
    });
    return spotYearsFilter;
  }

  setSpotTypeFilter(spotTypeFilter) {
    this.setState(() => ({ spotTypeFilter }), this.triggerVisibiltyEvaluation);
  }

  setSpotStatusTypeFilter(spotStatusTypeFilter) {
    this.setState(
      () => ({ spotStatusTypeFilter }),
      this.triggerVisibiltyEvaluation
    );
  }

  setSpotYearFilter(spotYearFilter) {
    this.setState(() => ({ spotYearFilter }), this.triggerVisibiltyEvaluation);
  }

  triggerVisibiltyEvaluation() {
    const { spotTypeFilter, spotStatusTypeFilter, spotYearFilter } = this.state;
    evaluateMarkerVisibility(
      this.geoLayer.getLayers(),
      spotTypeFilter,
      spotStatusTypeFilter,
      spotYearFilter
    );
  }

  renderMarkers() {
    // Declare funtions so they are locally available
    const onMarkerClick = this.onMarkerClick;

    this.geoLayer = L.geoJSON(this.state.geoData, {
      // Add custom markers
      onEachFeature: function(feature, layer) {
        layer.on('click', ({ latlng }) => {
          onMarkerClick(feature, latlng);
        });
      },
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
            html: renderToString(<SVGIcon type={spot_type} status={status} />),
          }),
        });
      },
    }).addTo(this.map);
  }

  onMarkerClick(feature, latlng) {
    this.map.flyTo(latlng, 14);
    this.setState({ feature, showPanel: true });
  }

  // Toggle the detail panel
  toggleDetailPanel() {
    this.setState(prevState => ({
      showDetailPanel: !prevState.showDetailPanel,
    }));
  }

  render() {
    const {
      loading,
      error,
      showDetailPanel,
      feature,
      spotTypeFilter,
      spotStatusTypeFilter,
      spotYearFilter,
    } = this.state;

    return (
      <MapContainer>
        {/* {this.state.spotTypeFilter[0]} */}
        {/* <button onClick={() => this.removeLayer()}>Clear</button> */}
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
          <FilterPanel
            spotTypeFilter={spotTypeFilter}
            setSpotTypeFilter={this.setSpotTypeFilter}
            spotStatusTypeFilter={spotStatusTypeFilter}
            setSpotStatusTypeFilter={this.setSpotStatusTypeFilter}
            spotYearFilter={spotYearFilter}
            setSpotYearFilter={this.setSpotYearFilter}
          />
          <DetailPanel
            feature={feature}
            isOpen={showDetailPanel}
            togglePanel={this.toggleDetailPanel.bind(this)}
          />
        </div>
      </MapContainer>
    );
  }
}

export default Map;
