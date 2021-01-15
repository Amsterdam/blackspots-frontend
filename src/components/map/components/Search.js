import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import {
  Link,
  ListItem,
  Input,
  Icon,
  themeColor,
  themeSpacing,
} from '@amsterdam/asc-ui';

import useDataFetching from 'shared/hooks/useDataFetching';
// import L from 'leaflet';
// import { ChevronRight } from '@amsterdam/asc-assets';
import { useMapInstance } from '@amsterdam/react-maps';
import { getByUri } from 'shared/api/api';

const StyledInput = styled(Input)`
  width: 300px;
  margin-bottom: -17px;
`;

const StyledAutosuggest = styled.ul`
  width: 300px;
  background-color: ${themeColor('tint', 'level1')};
  list-style-type: none;
  padding: 6px 0 0 ${themeSpacing(3)};
  border: 1px solid ${themeColor('tint', 'level5')};
  border: 2px solid black;
`;

const StyledListItem = styled(ListItem)`
  display: flex;
  align-items: flex-start;

  a {
    display: inline;
    color: ${themeColor('tint', 'level7')};
    position: relative;
    font-size: 16px;
    top: -4px;
  }
`;

const StyledIcon = styled(Icon)`
  display: inline;
  margin-right: 8px;
`;

const Search = () => {
  const lookupUrl =
    'https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?id=';
  const autosuggestUrl =
    'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?fq=gemeentenaam:amsterdam&fq=type:adres&fl=id,weergavenaam,type,score,lat,lon&q=';
  const searchRef = useRef(null);
  const autosuggestRef = useRef(null);

  const mapInstance = useMapInstance();
  const [showAutosuggest, setShowAutosuggest] = useState(false);
  const [url, setUrl] = useState('');
  const { /* errorMessage, */ loading, results, fetchData } = useDataFetching();

  const onAutosuggestClick = useCallback(
    async (e, autoSuggestLocation) => {
      if (e) {
        e.preventDefault();
      }

      if (autoSuggestLocation.weergavenaam) {
        autosuggestRef.current.value = autoSuggestLocation.weergavenaam;
        setShowAutosuggest(false);
      }

      const response = await getByUri(`${lookupUrl}${autoSuggestLocation.id}`);
      if (mapInstance && response.response.docs[0]) {
        const parsedCoordinates = response.response.docs[0].centroide_ll
          .replace(/POINT\(|\)/, '')
          .split(' ');
        const latLng = {
          lat: parseFloat(parsedCoordinates[1]),
          lng: parseFloat(parsedCoordinates[0]),
        };

        mapInstance.flyTo(latLng, 11);
      }
    },
    [mapInstance]
  );

  return (
    <div>
      <StyledInput
        id="search"
        ref={searchRef}
        data-testid="input"
        onChange={e => {
          if (e.target.value.length < 2) return;
          const value = encodeURIComponent(e.target.value);
          setShowAutosuggest(true);
          setUrl(`${autosuggestUrl}${value}`);
          fetchData(url);
        }}
        onBlur={() => {
          setTimeout(() => {
            setShowAutosuggest(false);
          }, 150);
        }}
      />
      {showAutosuggest &&
      results?.response?.docs &&
      results?.response?.docs.length ? (
        <StyledAutosuggest data-testid="autosuggest" ref={autosuggestRef}>
          {results?.response?.docs.map(item => (
            <StyledListItem key={item.id}>
              <Link
                href="#"
                variant="inline"
                onClick={e => onAutosuggestClick(e, item)}
              >
                {item.weergavenaam}
              </Link>
            </StyledListItem>
          ))}
        </StyledAutosuggest>
      ) : null}
    </div>
  );
};

export default Search;
