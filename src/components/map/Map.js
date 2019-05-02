import React from 'react';
import L from 'leaflet';
import { renderToString } from 'react-dom/server';

// Imports needed for amaps
import 'leaflet/dist/leaflet.css';
import 'amsterdam-amaps/dist/nlmaps/dist/assets/css/nlmaps.css';
import 'amsterdam-stijl/dist/css/ams-map.css';
import amaps from 'amsterdam-amaps/dist/amaps';

import { MapContainer, LoadingDiv, Spinner } from './Map.styled';
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
      // Year filters will be set with default data once the blackspot data is
      // received and the relevant years are known
      blackspotYearFilter: {},
      deliveredYearFilter: {},
      quickscanYearFilter: {},
      // Type and status type filters start with all values as false, meaning
      // the filter is off effectively showing everything
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
    this.setFilters = this.setFilters.bind(this);
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
        const [
          blackspotYearFilter,
          deliveredYearFilter,
          quickscanYearFilter,
        ] = this.getYearFiltersFromMarkers(geoData);
        this.setState({
          geoData,
          loading: false,
          blackspotYearFilter,
          quickscanYearFilter,
          deliveredYearFilter,
        });
        this.renderMarkers();
      })
      .catch(err => {
        this.setState({ error: true, loading: false });
        this.props.setShowError(true);
        console.error('An error occured fetching/processing data.', err);
      });
  }

  /**
   * Elvaluate data and store relevant years in the year filters
   */
  getYearFiltersFromMarkers(geoData) {
    // Init all year filters
    const blackspotYearFilter = {};
    const quickscanYearFilter = {};
    const deliveredYearFilter = {};

    // Get all the relevant year values for the filters
    const blackspotYears = [];
    const deliveredYears = [];
    const quickscanYears = [];
    geoData.features.forEach(f => {
      // Get the year values
      const {
        jaar_blackspotlijst,
        jaar_oplevering,
        jaar_ongeval_quickscan,
      } = f.properties;

      // Add the values to the year arrays if they are not in yet
      if (
        jaar_blackspotlijst &&
        blackspotYears.indexOf(jaar_blackspotlijst) < 0
      ) {
        blackspotYears.push(jaar_blackspotlijst);
      }
      if (jaar_oplevering && deliveredYears.indexOf(jaar_oplevering) < 0) {
        deliveredYears.push(jaar_oplevering);
      }
      if (
        jaar_ongeval_quickscan &&
        quickscanYears.indexOf(jaar_ongeval_quickscan) < 0
      ) {
        quickscanYears.push(jaar_ongeval_quickscan);
      }
    });

    // Add the year values to the filter as false (default filter value)
    blackspotYears.forEach(y => {
      blackspotYearFilter[y] = false;
    });
    deliveredYears.forEach(y => {
      deliveredYearFilter[y] = false;
    });
    quickscanYears.forEach(y => {
      quickscanYearFilter[y] = false;
    });

    return [blackspotYearFilter, deliveredYearFilter, quickscanYearFilter];
  }

  /**
   * Update the filters. NOTE: For now all filters must be provided on every
   * update. This is not ideal achitectural wise, but a working solution we had
   * time for now. It provides a flexible way handling filters, but lacks
   * scalability.
   */
  setFilters(
    spotTypeFilter,
    spotStatusTypeFilter,
    blackspotYearFilter,
    deliveredYearFilter,
    quickscanYearFilter
  ) {
    this.setState(
      () => ({
        spotTypeFilter,
        spotStatusTypeFilter,
        blackspotYearFilter,
        deliveredYearFilter,
        quickscanYearFilter,
      }),
      this.triggerVisibiltyEvaluation
    );
  }

  /**
   * Trigger the evaluation of which spots should be visible on the map. This
   * should be done after every filter update.
   */
  triggerVisibiltyEvaluation() {
    const {
      spotTypeFilter,
      spotStatusTypeFilter,
      blackspotYearFilter,
      deliveredYearFilter,
      quickscanYearFilter,
    } = this.state;
    evaluateMarkerVisibility(
      this.geoLayer.getLayers(),
      spotTypeFilter,
      spotStatusTypeFilter,
      blackspotYearFilter,
      deliveredYearFilter,
      quickscanYearFilter
    );
  }

  /**
   * Render markers on the map for every spot
   */
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

  /**
   * OnClick function for rendered markers
   */
  onMarkerClick(feature, latlng) {
    this.map.flyTo(latlng, 14);
    this.setState({ feature, showDetailPanel: true });
  }

  /**
   * Toggle the detail panel visibility
   */
  toggleDetailPanel() {
    this.setState(prevState => ({
      showDetailPanel: !prevState.showDetailPanel,
    }));
  }

  render() {
    const {
      error,
      loading,
      showDetailPanel,
      feature,
      spotTypeFilter,
      spotStatusTypeFilter,
      blackspotYearFilter,
      quickscanYearFilter,
      deliveredYearFilter,
    } = this.state;

    return (
      <MapContainer>
        <div id="mapdiv" style={{ height: '100%' }}>
          {loading && (
            <LoadingDiv>
              <Spinner />
            </LoadingDiv>
          )}
          {!error && !loading && (
            <FilterPanel
              spotTypeFilter={spotTypeFilter}
              // setSpotTypeFilter={this.setSpotTypeFilter}
              spotStatusTypeFilter={spotStatusTypeFilter}
              // setSpotStatusTypeFilter={this.setSpotStatusTypeFilter}
              blackspotYearFilter={blackspotYearFilter}
              deliveredYearFilter={deliveredYearFilter}
              quickscanYearFilter={quickscanYearFilter}
              setFilters={this.setFilters}
            />
          )}
          <DetailPanel
            feature={feature}
            isOpen={showDetailPanel}
            togglePanel={this.toggleDetailPanel}
          />
        </div>
      </MapContainer>
    );
  }
}

export default Map;
