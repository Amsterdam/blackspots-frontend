import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';

// Imports needed for amaps
import 'leaflet/dist/leaflet.css';
import 'amsterdam-amaps/dist/nlmaps/dist/assets/css/nlmaps.css';
import 'amsterdam-stijl/dist/css/ams-map.css';
import amaps from 'amsterdam-amaps/dist/amaps';

import styles from './Map.module.scss';
import Loader from 'shared/loader/Loader';
import SVGIcon from '../SVGIcon/SVGIcon';
import DetailPanel from '../detailPanel/DetailPanel';
import FilterPanel from '../filterPanel/FilterPanel';
import { evaluateMarkerVisibility } from './helpers';
import { SpotTypes, SpotStatusTypes } from 'constants.js';
import './markerStyle.css';
import useDataFetching from './useDataFeatching';

import { shouldUseAccEnv } from 'helpers.js';

const useYearFilters = results => {
  const [blackspotYearFilter, setBlackspotYearFilter] = useState(null);
  const [deliveredYearFilter, setDeliveredYearFilter] = useState(null);
  const [quickscanYearFilter, setQuickscanYearFilter] = useState(null);

  useEffect(() => {
    // Init all year filters
    const blackspotYearFilter = {};
    const quickscanYearFilter = {};
    const deliveredYearFilter = {};

    // Get all the relevant year values for the filters
    const blackspotYears = [];
    const deliveredYears = [];
    const quickscanYears = [];
    results &&
      results.features.forEach(f => {
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

    setBlackspotYearFilter(blackspotYearFilter);
    setDeliveredYearFilter(deliveredYearFilter);
    setQuickscanYearFilter(quickscanYearFilter);
  }, [results]);
  return [
    blackspotYearFilter,
    deliveredYearFilter,
    quickscanYearFilter,
    setBlackspotYearFilter,
    setDeliveredYearFilter,
    setQuickscanYearFilter,
  ];
};

const Map = () => {
  // const [loading, setLoading] = useState(true);
  const { errorMessage, loading, results, fetchData } = useDataFetching();
  const [feature, setFeature] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);

  React.useEffect(() => {
    (async () => {
      const blackspotsEndpoint = `https://${
        shouldUseAccEnv() ? 'acc.' : ''
      }api.data.amsterdam.nl/blackspots/spots/?format=geojson`;
      fetchData(blackspotsEndpoint);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [
    blackspotYearFilter,
    deliveredYearFilter,
    quickscanYearFilter,
    setBlackspotYearFilter,
    setDeliveredYearFilter,
    setQuickscanYearFilter,
  ] = useYearFilters(results);

  const mapRef = useRef(null);
  useEffect(() => {
    // Create map
    mapRef.current = amaps.createMap({
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
      .addTo(mapRef.current);

    // Set zoom config manually after adding WMS
    // For some reason this doesn't work when set during the creation of the map
    mapRef.current.options.minZoom = 12;
    mapRef.current.options.maxZoom = 21;
  }, []);

  const onMarkerClick = (feature, latlng) => {
    const currentZoom = mapRef.current.getZoom();
    mapRef.current.flyTo(latlng, currentZoom < 14 ? 14 : currentZoom);
    setFeature(feature);
    setShowDetailPanel(true);
  };

  const toggleDetailPanel = () => {
    setShowDetailPanel(!showDetailPanel);
  };

  const geoLayerRef = useRef(null);
  useEffect(() => {
    geoLayerRef.current = L.geoJSON(results, {
      // Add custom markers
      onEachFeature: function(feature, layer) {
        console.log('onEachFeature');
        layer.on('click', ({ latlng }) => {
          onMarkerClick(feature, latlng);
        });
      },
      pointToLayer: function(feature, latlng) {
        console.log('pointToLayer', latlng, feature.properties);
        // Leaflet only accepts HTML elements for custom markers so we need to
        // create one from the SVGIcon
        // const { status, spot_type } = feature.properties;
        // const iconDiv = document.createElement('div');
        // ReactDOM.render(<SVGIcon type={spot_type} status={status} />, iconDiv);
        // console.log(iconDiv);

        // // Create a marker with the correct icon and onClick method
        // return L.marker(latlng, {
        //   icon: L.divIcon({
        //     // Add the correct classname based on type
        //     // Risico types have a bigger icon therefore need more margin
        //     className: `marker-div-icon ${
        //       spot_type === SpotTypes.RISICO ? 'large' : ''
        //     } ${
        //       status === SpotStatusTypes.GEEN_MAATREGEL ? 'extra-opacity' : ''
        //     }`,
        //     html: iconDiv.innerHTML,
        //   }),
        // });
        // TODO draw the icons
        return L.circleMarker(latlng, {
          radius: 8,
          fillColor: '#ff7800',
          color: '#000',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        });
      },
    }).addTo(mapRef.current);
  }, [results]);

  const [spotStatusTypeFilter, setSpotStatusTypeFilter] = useState({
    [SpotStatusTypes.ONDERZOEK]: false,
    [SpotStatusTypes.VOORBEREIDING]: false,
    [SpotStatusTypes.GEREED]: false,
    [SpotStatusTypes.GEEN_MAATREGEL]: false,
    [SpotStatusTypes.UITVOERING]: false,
    [SpotStatusTypes.ONBEKEND]: false,
  });
  const [spotTypeFilter, setSpotTypeFilter] = useState({
    [SpotTypes.BLACKSPOT]: false,
    [SpotTypes.PROTOCOL_DODELIJK]: false,
    [SpotTypes.PROTOCOL_ERNSTIG]: false,
    [SpotTypes.RISICO]: false,
    [SpotTypes.WEGVAK]: false,
  });

  // A filter to only show items on the 'blackspot list', which are all
  // spots with type BLACKSPOT or WEGVAk
  const [blackspotListFilter, setBlackspotListFilter] = useState(false);

  // A filter to only show items on the 'protocol list', which are all spots
  // with type PROTOCOL_ERNSTIG or PROTOCOL_DODELIJK
  // Note: quickscan === protocol
  const [quickscanListFilter, setQuickscanListFilter] = useState(false);

  // A filter that only shows spots that have the status DELIVERED
  const [deliveredListFilter, setDeliveredListFilter] = useState(false);

  useEffect(() => {
    evaluateMarkerVisibility(
      geoLayerRef.current.getLayers(),
      spotTypeFilter,
      spotStatusTypeFilter,
      blackspotYearFilter,
      deliveredYearFilter,
      quickscanYearFilter,
      blackspotListFilter,
      quickscanListFilter,
      deliveredListFilter
    );
  }, [
    spotTypeFilter,
    spotStatusTypeFilter,
    blackspotYearFilter,
    deliveredYearFilter,
    quickscanYearFilter,
    blackspotListFilter,
    quickscanListFilter,
    deliveredListFilter,
  ]);

  const setFilters = (
    spotTypeFilter,
    spotStatusTypeFilter,
    blackspotYearFilter,
    deliveredYearFilter,
    quickscanYearFilter
  ) => {
    setSpotTypeFilter(spotTypeFilter);
    setSpotStatusTypeFilter(spotStatusTypeFilter);
    setBlackspotYearFilter(blackspotYearFilter);
    setDeliveredYearFilter(deliveredYearFilter);
    setQuickscanYearFilter(quickscanYearFilter);
  };

  return (
    <div className={styles.Map}>
      <div id="mapdiv" style={{ height: '100%' }}>
        {loading && <Loader />}
        {!errorMessage && !loading && (
          <FilterPanel
            spotTypeFilter={spotTypeFilter}
            spotStatusTypeFilter={spotStatusTypeFilter}
            blackspotYearFilter={blackspotYearFilter}
            deliveredYearFilter={deliveredYearFilter}
            quickscanYearFilter={quickscanYearFilter}
            setFilters={setFilters}
            setBlackspotListFilter={value => setBlackspotListFilter(value)}
            setQuickscanListFilter={setQuickscanListFilter}
            setDeliveredListFilter={setDeliveredListFilter}
          />
        )}

        <DetailPanel
          feature={feature}
          isOpen={showDetailPanel}
          togglePanel={toggleDetailPanel}
        />
      </div>
    </div>
  );
};

// class OldMap extends React.Component {
//   // TODO: Filters should be refactored a bit too make them more explicit and
//   // less complex

//   constructor() {
//     super();
//     this.state = {
//       error: false,
//       loading: true,
//       showDetailPanel: false,
//       feature: null,
//       // A filter to only show items on the 'blackspot list', which are all
//       // spots with type BLACKSPOT or WEGVAk
//       blackspotListFilter: false,
//       // A filter to only show items on the 'protocol list', which are all spots
//       // with type PROTOCOL_ERNSTIG or PROTOCOL_DODELIJK
//       // Note: quickscan === protocol
//       quickscanListFilter: false,
//       // A filter that only shows spots that have the status DELIVERED
//       deliveredListFilter: false,
//       // Year filters will be set with default data once the blackspot data is
//       // received and the relevant years are known
//       blackspotYearFilter: {},
//       deliveredYearFilter: {},
//       quickscanYearFilter: {},
//       // Type and status type filters start with all values as false, meaning
//       // the filter is off effectively showing everything
//       spotStatusTypeFilter: {
//         [SpotStatusTypes.ONDERZOEK]: false,
//         [SpotStatusTypes.VOORBEREIDING]: false,
//         [SpotStatusTypes.GEREED]: false,
//         [SpotStatusTypes.GEEN_MAATREGEL]: false,
//         [SpotStatusTypes.UITVOERING]: false,
//         [SpotStatusTypes.ONBEKEND]: false,
//       },
//       spotTypeFilter: {
//         [SpotTypes.BLACKSPOT]: false,
//         [SpotTypes.PROTOCOL_DODELIJK]: false,
//         [SpotTypes.PROTOCOL_ERNSTIG]: false,
//         [SpotTypes.RISICO]: false,
//         [SpotTypes.WEGVAK]: false,
//       },
//       geoData: null,
//     };

//     this.map = null;
//     this.geoLayer = null;

//     this.onMarkerClick = this.onMarkerClick.bind(this);
//     this.toggleDetailPanel = this.toggleDetailPanel.bind(this);
//     this.triggerVisibiltyEvaluation = this.triggerVisibiltyEvaluation.bind(
//       this
//     );
//     this.setFilters = this.setFilters.bind(this);
//   }

//   componentDidMount() {
//     // Create map
//     this.map = amaps.createMap({
//       center: {
//         latitude: 52.36988741057662,
//         longitude: 4.8966407775878915,
//       },
//       style: 'zwartwit',
//       layer: 'standaard',
//       target: 'mapdiv',
//       search: true,
//       zoom: 13,
//     });

//     // Add the stadsdelen WMS
//     L.tileLayer
//       .wms('https://map.data.amsterdam.nl/maps/gebieden?', {
//         layers: ['stadsdeel'],
//         transparent: true,
//         format: 'image/png',
//       })
//       .addTo(this.map);

//     // Set zoom config manually after adding WMS
//     // For some reason this doesn't work when set during the creation of the map
//     this.map.options.minZoom = 12;
//     this.map.options.maxZoom = 21;

//     // Get geo data
//     getAllBlackspots()
//       .then(geoData => {
//         const [
//           blackspotYearFilter,
//           deliveredYearFilter,
//           quickscanYearFilter,
//         ] = this.getYearFiltersFromMarkers(geoData);
//         this.setState({
//           geoData,
//           loading: false,
//           blackspotYearFilter,
//           quickscanYearFilter,
//           deliveredYearFilter,
//         });
//         this.renderMarkers();
//       })
//       .catch(err => {
//         this.setState({ error: true, loading: false });
//         this.props.setShowError(true);
//         console.error('An error occured fetching/processing data.', err);
//       });
//   }

//   /**
//    * Update the filters. NOTE: For now all filters must be provided on every
//    * update. This is not ideal achitectural wise, but a working solution we had
//    * time for now. It provides a flexible way handling filters, but lacks
//    * scalability.
//    */
//   setFilters(
//     spotTypeFilter,
//     spotStatusTypeFilter,
//     blackspotYearFilter,
//     deliveredYearFilter,
//     quickscanYearFilter
//   ) {
//     this.setState(
//       () => ({
//         spotTypeFilter,
//         spotStatusTypeFilter,
//         blackspotYearFilter,
//         deliveredYearFilter,
//         quickscanYearFilter,
//       }),
//       this.triggerVisibiltyEvaluation
//     );
//   }

//   /**
//    * Trigger the evaluation of which spots should be visible on the map. This
//    * should be done after every filter update.
//    */
//   triggerVisibiltyEvaluation() {
//     const {
//       spotTypeFilter,
//       spotStatusTypeFilter,
//       blackspotYearFilter,
//       deliveredYearFilter,
//       quickscanYearFilter,
//     } = this.state;
//     evaluateMarkerVisibility(
//       this.geoLayer.getLayers(),
//       spotTypeFilter,
//       spotStatusTypeFilter,
//       blackspotYearFilter,
//       deliveredYearFilter,
//       quickscanYearFilter,
//       this.state.blackspotListFilter,
//       this.state.quickscanListFilter,
//       this.state.deliveredListFilter
//     );
//   }

//   render() {
//     const {
//       error,
//       loading,
//       showDetailPanel,
//       feature,
//       spotTypeFilter,
//       spotStatusTypeFilter,
//       blackspotYearFilter,
//       quickscanYearFilter,
//       deliveredYearFilter,
//     } = this.state;

//     return (
//       <div className={styles.Map}>
//         <div id="mapdiv" style={{ height: '100%' }}>
//           {loading && <Loader />}
//           {!error && !loading && (
//             <FilterPanel
//               spotTypeFilter={spotTypeFilter}
//               spotStatusTypeFilter={spotStatusTypeFilter}
//               blackspotYearFilter={blackspotYearFilter}
//               deliveredYearFilter={deliveredYearFilter}
//               quickscanYearFilter={quickscanYearFilter}
//               setFilters={this.setFilters}
//               setBlackspotListFilter={value =>
//                 this.setState({ blackspotListFilter: value })
//               }
//               setQuickscanListFilter={value =>
//                 this.setState({ quickscanListFilter: value })
//               }
//               setDeliveredListFilter={value =>
//                 this.setState({ deliveredListFilter: value })
//               }
//             />
//           )}
//           <DetailPanel
//             feature={feature}
//             isOpen={showDetailPanel}
//             togglePanel={this.toggleDetailPanel}
//           />
//         </div>
//       </div>
//     );
//   }
// }

export default Map;
