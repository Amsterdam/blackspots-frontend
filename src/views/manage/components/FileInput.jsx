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

const DocumentTag = styled.span`
  background-color: ${themeColor('tint', 'level2')};
  cursor: auto;
  font-weight: 500;
  height: 40px;
  letter-spacing: normal;
  line-height: 40px;
  margin: ${themeSpacing(2, 0)};
  padding-bottom: 0px;
  padding-left: 16px;
  padding-right: 44px;
  padding-top: 0px;
  text-size-adjust: 100%;
  width: 80%;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  /* & > ${styles.ButtonStyle} { */
  & > .classButton {
    position: absolute;
    right: 0;
    top: 0;
    background-color: ${themeColor('tint', 'level2')};
    margin: 3px;
   }
`;

const FileInputStyle = styled.div``;

const StyeldUploadButton = styled.div`
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
    outline-color: #fec813;
    outline-style: solid;
    outline-offset: 0px;
    outline-width: 3px;
  }

  /* ${styles.SpinnerStyle} { */
  .spinner {
    margin-right: ${themeSpacing(3)};
  }
`;

const SelectButton = ({ id, onChange, children }) => {
  return (
    <StyeldUploadButton>
      <input type="file" id={id} onChange={onChange} />
      <Button variant="primary" $as="label" htmlFor={id}>
        {children}
      </Button>
    </StyeldUploadButton>
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
      }, 2000);
    }
  };

  return (
    <FileInputStyle>
      <FormInput
        label={label}
        name={name}
        Component={() =>
          value ? (
            <DocumentTag>
              {value && value.filename}
              <Button
                className="classButton"
                size={34}
                variant="blank"
                iconSize={20}
                icon={<Close />}
                onClick={() => updateValue(name)}
              />
            </DocumentTag>
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
