import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  styles,
  themeColor,
  themeSpacing,
  Spinner,
} from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';
import FormInput from './FormInput';
import { Close } from '@datapunt/asc-assets';

const DocumentName = styled.span`
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

const FileInput = ({ label, name, onChange, defaultValue }) => {
  const [value, setValue] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileUploadId = `fileUpload${label}`;

  useEffect(() => {
    defaultValue && setValue(defaultValue);
  }, [defaultValue]);

  const updateValue = (name, value = undefined) => {
    setValue(value);
    const event = {
      target: {
        name,
        type: 'input',
        value: value,
      },
    };
    onChange(event);
  };

  const handleChange = e => {
    if (e.target.files && e.target.files.length) {
      const { files } = e.target;
      setIsUploading(true);
      console.log('calling upload service...', files);
      setTimeout(() => {
        const val = { id: 1, filename: files[0].name, type: label };
        updateValue(name, val);
        setIsUploading(false);
      }, 500);
    }
  };

  return (
    <FileInputStyle>
      <FormInput
        label={label}
        name={name}
        Component={() =>
          value ? (
            <DocumentName title={value && value.filename}>
              {value && value.filename}
              <Button
                className="closeButton"
                size={34}
                variant="blank"
                iconSize={20}
                icon={<Close />}
                onClick={() => updateValue(name)}
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
          )
        }
      ></FormInput>
    </FileInputStyle>
  );
};

FileInput.defaultProps = {
  name: '',
};

FileInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.shape({}).isRequired,
};

export default FileInput;