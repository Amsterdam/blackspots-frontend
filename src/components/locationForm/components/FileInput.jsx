import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  styles,
  themeColor,
  themeSpacing,
  Spinner,
} from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';
import { Close } from '@datapunt/asc-assets';

const DocumentName = styled.span`
  display: inline-block;
  background-color: ${themeColor('tint', 'level2')};
  cursor: auto;
  font-weight: 500;
  max-width: 100%;
  height: ${themeSpacing(10)};
  letter-spacing: normal;
  line-height: ${themeSpacing(10)};
  margin-bottom: ${themeSpacing(1)};
  padding: ${themeSpacing(0, 11, 0, 4)};
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  /* TODO (WK-209) & > ${styles.ButtonStyle} { */
  & > .closeButton {
    position: absolute;
    right: 3px;
    top: 3px;
    background-color: ${themeColor('tint', 'level2')};
   }
`;

const FileInputStyle = styled.div`
  width: 100%;
`;

const StyledUploadButton = styled.div`
  position: relative;
  cursor: pointer;

  & > input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  & > input:focus + label {
    outline-color: ${themeColor('support', 'focus')};
    outline-style: solid;
    outline-offset: 0px;
    outline-width: 3px;
  }

  /* TODO (WK-209) ${styles.SpinnerStyle} { */
  .spinner {
    margin-right: ${themeSpacing(3)};
  }
`;

const SelectButton = ({ id, onChange, children }) => {
  return (
    <StyledUploadButton>
      <input type="file" id={id} onChange={onChange} />
      <Button variant="primary" $as="label" htmlFor={id}>
        {children}
      </Button>
    </StyledUploadButton>
  );
};

const FileInput = ({ name, value, onChange }) => {
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

  const handleChange = e => {
    if (e.target.files && e.target.files.length) {
      const { files } = e.target;
      setIsUploading(true);
      setTimeout(() => {
        const val = {
          filename: files[0].name,
          type: name,
          file: files[0],
        };
        updateValue(name, val);
        setIsUploading(false);
      }, 0);
    }
  };

  const fileName = value && value.filename !== '' && value.filename;

  return (
    <FileInputStyle>
      {fileName ? (
        <DocumentName title={fileName}>
          {fileName}
          <Button
            className="closeButton"
            size={34}
            variant="blank"
            iconSize={20}
            icon={<Close />}
            onClick={e => {
              e.preventDefault();
              updateValue(name, {
                ...value,
                filename: '',
                file: new File([''], '', { type: 'text/plain' }),
              });
            }}
          />
        </DocumentName>
      ) : (
        <SelectButton id={fileUploadId} onChange={handleChange}>
          {isUploading ? (
            <>
              <Spinner className="spinner" />
              Aan het uploaden...
            </>
          ) : (
            'Selecteer bestand'
          )}
        </SelectButton>
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
