import { render } from '@testing-library/react';
import { withTheme } from 'test/utils';

import FileInput from './FileInput';

const uplaodButtonTestId = 'upload-button';
const fileNameTestId = 'file-name-style';
describe('FileInput', () => {
  const props = {
    name: 'text-name',
    value: {},
    onChange: jest.fn(),
  };

  it('renders correctly when no file is selected', () => {
    const { container, queryByTestId } = render(
      withTheme(<FileInput className="fileInput" {...props} />)
    );

    expect(container.querySelector('.fileInput')).toBeTruthy();
    expect(queryByTestId(uplaodButtonTestId)).not.toBeNull();
    expect(queryByTestId(fileNameTestId)).toBeNull();
  });

  it('renders correctly when there is a file selected', () => {
    const { container, queryByTestId } = render(
      withTheme(
        <FileInput
          className="fileInput"
          {...{ ...props, value: { filename: 'file-name' } }}
        />
      )
    );

    expect(container.querySelector('.fileInput')).toBeTruthy();
    expect(queryByTestId(uplaodButtonTestId)).toBeNull();
    expect(queryByTestId(fileNameTestId)).not.toBeNull();
  });
});
