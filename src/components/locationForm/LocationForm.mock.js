export const featureMock = {
  id: 1,
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [4.9239022, 52.3875654],
  },
  properties: {
    stadsdeel: 'Noord',
    documents: [
      {
        _links: {
          self: {
            href: 'https://acc.api.data.amsterdam.nl/blackspots/documents/1/?format=geojson',
          },
        },
        id: 1,
        type: 'Ontwerp',
        filename: 'B87_14_ontwerp_Johan van Hasseltweg - Meeuwenlaan 2.pdf',
      },
    ],
    locatie_id: 'B87_14',
    spot_type: 'blackspot',
    description: 'Johan van Hasseltweg - Meeuwenlaan 2',
    wegvak: null,
    status: 'gereed',
    actiehouders: 'Uitgevoerd door het IB',
    start_uitvoering: '03/10/16',
    eind_uitvoering: '10/10/16',
    tasks: '',
    notes: '',
    jaar_blackspotlijst: 2014,
    jaar_ongeval_quickscan: 2015,
    jaar_oplevering: 2016,
  },
};

export const locationMock = {
  actiehouder: 'Uitgevoerd door het IB',
  coordinaten: '52.3875654, 4.9239022',
  coord_or_poly: 'Point',
  design_document: {
    _links: {
      self: {
        href: 'https://acc.api.data.amsterdam.nl/blackspots/documents/1/?format=geojson',
      },
    },
    filename: 'B87_14_ontwerp_Johan van Hasseltweg - Meeuwenlaan 2.pdf',
    id: 1,
    type: 'Ontwerp',
  },
  eind_uitvoering: '10/10/16',
  id: 1,
  jaar_blackspotlijst: 2014,
  jaar_ongeval_quickscan: 2015,
  jaar_oplevering: 2016,
  naam: 'Johan van Hasseltweg - Meeuwenlaan 2',
  locatie_id: 'B87_14',
  opmerking: '',
  rapport_document: undefined,
  spot_type: 'blackspot',
  stadsdeel: 'N',
  start_uitvoering: '03/10/16',
  status: 'gereed',
  taken: '',
  polygon: undefined,
};

export const formDataMock = {
  id: 1,
  description: 'Johan van Hasseltweg - Meeuwenlaan 2',
  locatie_id: 'B87_14',
  point: { type: 'Point', coordinates: [4.9239022, 52.3875654] },
  stadsdeel: 'N',
  spot_type: 'blackspot',
  jaar_blackspotlijst: 2014,
  jaar_ongeval_quickscan: 2015,
  status: 'gereed',
  actiehouders: 'Uitgevoerd door het IB',
  start_uitvoering: '03/10/16',
  eind_uitvoering: '10/10/16',
  jaar_oplevering: 2016,
};
