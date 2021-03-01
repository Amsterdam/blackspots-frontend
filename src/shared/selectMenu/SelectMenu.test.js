import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SelectMenu from './SelectMenu';

const menuItems = [
  { id: 1, label: 'first-label', value: 'first-value' },
  { id: 2, label: 'second-label', value: 'second-value' },
];
describe('SelectMenu', () => {
  const selectionChangedMock = jest.fn();
  const component = (
    <SelectMenu
      items={[...menuItems]}
      selectionChanged={selectionChangedMock}
    />
  );

  afterEach(() => {
    selectionChangedMock.mockReset();
  });

  it('should render correctly', () => {
    const { container } = render(component);

    // Renders the chevron in the selected item
    expect(container.querySelector('button.Select > svg').textContent).toEqual(
      'chevron-top.svg'
    );

    // The first menu item is selected bu default
    expect(container.querySelector('button.Select').textContent).toContain(
      'first-label'
    );

    // Renders two menu options
    expect(container.querySelectorAll('button.Option')).toHaveLength(2);

    // The menu options are hidden
    const optionnsContainer = container.querySelector('button.Option')
      .parentNode;
    expect(optionnsContainer.className.indexOf('MenuHide')).toBeTruthy();
  });

  it('should show the menu options on click', () => {
    const { container, queryByTestId } = render(component);
    expect(container.querySelector('.MenuHide')).toBeInTheDocument();
    expect(
      container.querySelector('.MenuChevronRotated')
    ).not.toBeInTheDocument();

    fireEvent.click(queryByTestId('selected-option'));

    expect(container.querySelector('.MenuHide')).not.toBeInTheDocument();
    expect(container.querySelector('.MenuChevronRotated')).toBeInTheDocument();
  });

  it('should dispatch selectionChange when the second option is clicked', () => {
    const { container, queryByText } = render(component);
    fireEvent.click(queryByText('second-label'));
    expect(container.querySelector('button.Select').textContent).toContain(
      'second-label'
    );
    expect(selectionChangedMock).toHaveBeenCalled();
  });
});
