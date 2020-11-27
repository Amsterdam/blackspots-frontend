import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Spinner } from '@amsterdam/asc-ui';
import { Close } from '@amsterdam/asc-assets';
import {
  FileNameStyle,
  FileInputStyle,
  StyledUploadButton,
} from './FileInputStyle';

const UploadButton = ({ id, onChange, children, ...otherProps }) => {
  return (
    <StyledUploadButton {...otherProps}>
      <input type="file" id={id} onChange={onChange} />
      <Button variant="primary" $as="label" htmlFor={id}>
        {children}
      </Button>
    </StyledUploadButton>
  );
};

const FileInput = ({ name, value, onChange, ...otherProps }) => {
  const [isUploading, setIsUploading] = useState(false);

  const fileUploadId = `fileUpload${name}`;

  // eslint-disable-next-line no-shadow
  const updateValue = (name, value = null) => {
    const event = {
      target: {
        name,
        type: 'input',
        value,
      },
    };
    onChange(event);
  };

  /**
   * When deleting a file, we pass an empty file to the server, the server will remove the existing file
   * The file would remain unchanged when no value will be passed with the form.
   */
  const handleDeleteFile = e => {
    e.preventDefault();
    const deletedFile = {
      ...value,
      filename: '',
      file: new File([''], '', { type: 'text/plain' }),
    };
    updateValue(name, deletedFile);
  };

  const handleChange = e => {
    if (e.target.files && e.target.files.length) {
      const { files } = e.target;
      setIsUploading(true);
      const val = {
        filename: files[0].name,
        type: name,
        file: files[0],
      };
      updateValue(name, val);
      setIsUploading(false);
    }
  };

  const fileName = value && value.filename !== '' && value.filename;

  return (
    <FileInputStyle {...otherProps}>
      {fileName ? (
        <FileNameStyle title={fileName} data-testid="file-name-style">
          {fileName}
          <Button
            className="closeButton"
            size={34}
            variant="blank"
            iconSize={20}
            icon={<Close />}
            onClick={handleDeleteFile}
          />
        </FileNameStyle>
      ) : (
        <UploadButton
          id={fileUploadId}
          onChange={handleChange}
          data-testid="upload-button"
        >
          {isUploading ? (
            <>
              <Spinner className="spinner" />
              Aan het uploaden...
            </>
          ) : (
            'Selecteer bestand'
          )}
        </UploadButton>
      )}
    </FileInputStyle>
  );
};

FileInput.defaultProps = {
  value: null,
};

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
};

export default FileInput;
