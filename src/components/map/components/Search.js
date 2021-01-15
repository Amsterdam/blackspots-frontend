import React, { useState, useRef } from 'react';
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
import { ChevronRight } from '@amsterdam/asc-assets';
import { useMapInstance } from '@amsterdam/react-maps';

const StyledInput = styled(Input)`
  width: 100%;
  margin-bottom: -17px;
`;

const StyledAutosuggest = styled.ul`
  width: 100%;
  background-color: ${themeColor('tint', 'level1')};
  list-style-type: none;
  padding: 6px 0 0 ${themeSpacing(3)};
  border: 1px solid ${themeColor('tint', 'level5')};
`;

const StyledListItem = styled(ListItem)`
  display: flex;
  align-items: flex-start;

  a {
    display: inline;
    color: ${themeColor('tint', 'level7')};
    position: relative;
    top: -4px;
  }
`;

const StyledIcon = styled(Icon)`
  display: inline;
  margin-right: 8px;
`;

const Search = () => {
  const autosuggestUrl =
    'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?fq=gemeentenaam:amsterdam&fq=type:adres&fl=id,weergavenaam,type,score,lat,lon&q=';
  const searchRef = useRef(null);
  const autosuggestRef = useRef(null);

  const mapInstance = useMapInstance();
  const [showAutosuggest, setShowAutosuggest] = useState(false);
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState('');
  const { /* errorMessage, */ loading, results, fetchData } = useDataFetching();

  return (
    <div>
      <StyledInput
        id="search"
        ref={searchRef}
        data-testid="input"
        onChange={e => {
          if (e.target.value.length < 3) return;
          const value = encodeURIComponent(e.target.value);
          setQuery(e.target.value);
          setUrl(`${autosuggestUrl}${value}`);
        }}
        onBlur={() => {
          setTimeout(() => {
            setShowAutosuggest(false);
          }, 150);
        }}
      />
      {showAutosuggest && query.length && results && results.length ? (
        <StyledAutosuggest data-testid="autosuggest" ref={autosuggestRef}>
          {results.map(item => (
            <StyledListItem key={item.id}>
              <StyledIcon size={14}>
                <ChevronRight />
              </StyledIcon>
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
