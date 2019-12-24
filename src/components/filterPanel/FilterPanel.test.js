import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import FilterPanel, { getExportFilter } from './FilterPanel';

describe('getExportFilter', () => {
  it('should create the export filter', () => {
    expect(getExportFilter({ Centrum: true })).toEqual('stadsdeel=A');
    expect(getExportFilter({ Centrum: false })).toEqual('');
    expect(getExportFilter({ Centrum: false, Noord: true })).toEqual(
      'stadsdeel=N'
    );
    expect(getExportFilter({ Centrum: true, Noord: true })).toEqual(
      'stadsdeel=A'
    );
    expect(getExportFilter({ Noord: true, Centrum: true })).toEqual(
      'stadsdeel=N'
    );
  });
});

describe('Filter Panel', () => {
  const props = {
    spotTypeFilter: {},
    spotStatusTypeFilter: {},
    blackspotYearFilter: { '2015': false },
    deliveredYearFilter: { '2016': false },
    quickscanYearFilter: { '2017': true },
    stadsdeelFilter: { Centrum: false },
    setFilters: () => {},
    setBlackspotListFilter: () => {},
    setQuickscanListFilter: () => {},
    setDeliveredListFilter: () => {},
    setStadsdeelFilter: () => {},
  };

  it('should render correctly', () => {
    const { queryByTestId, queryByText } = render(<FilterPanel {...props} />);

    // Select menu is visible
    expect(queryByTestId('select-menu')).toBeInTheDocument();

    // Spot type filter is visible
    expect(queryByTestId('spot-type-checkbox')).toBeInTheDocument();

    // Status filter is visible
    expect(queryByTestId('status-checkbox')).toBeInTheDocument();

    // Stadsdeel filter is visible
    expect(queryByTestId('stadsdeel-checkbox')).toBeInTheDocument();

    expect(queryByTestId('blackspots-year-checkbox')).not.toBeInTheDocument();
    expect(queryByTestId('delivery-year-checkbox')).not.toBeInTheDocument();
    expect(queryByTestId('quickscan-year-checkbox')).not.toBeInTheDocument();

    // The export button is visible and enabled
    expect(queryByText('Exporteer')).toBeInTheDocument();
    expect(queryByText('Exporteer').tagName).toEqual('BUTTON');
    expect(queryByText('Exporteer').getAttribute('disabled')).toBeNull();
  });

  it('should show the delivery year filter when the menu option is selected', () => {
    const { queryByTestId, queryByText } = render(<FilterPanel {...props} />);
    expect(queryByTestId('delivery-year-checkbox')).not.toBeInTheDocument();
    fireEvent.click(queryByText('Opgeleverd in'));
    expect(queryByTestId('delivery-year-checkbox')).toBeInTheDocument();
  });

  it('should show the delivery year filter when the menu option is selected', () => {
    const { queryByTestId, queryByText } = render(<FilterPanel {...props} />);
    expect(queryByTestId('blackspot-year-checkbox')).not.toBeInTheDocument();
    fireEvent.click(queryByText('Opgenomen als blackspot in'));
    expect(queryByTestId('blackspot-year-checkbox')).toBeInTheDocument();
  });

  it('should show the delivery year filter when the menu option is selected', () => {
    const { queryByTestId, queryByText } = render(<FilterPanel {...props} />);
    expect(queryByTestId('quickscan-year-checkbox')).not.toBeInTheDocument();
    fireEvent.click(queryByText('Opgenomen als protocol in'));
    expect(queryByTestId('quickscan-year-checkbox')).toBeInTheDocument();
  });
});
