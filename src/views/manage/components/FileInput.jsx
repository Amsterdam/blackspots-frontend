import React from 'react';
import PropTypes from 'prop-types';
import { Button, styles, themeColor, themeSpacing } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';
import FormInput from './FormInput';
import { Close } from '@datapunt/asc-assets';

const DocumentTag = styled.span`
  background-color: ${themeColor('tint', 'level2')};
  cursor: auto;
  /* font-family: AvenirNext;
  font-size: 16px;
  font-stretch: 100%;
  */
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

const UploadButton = styled(Button)`
  position: relative;
  & > input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const FileInput = ({ label, name, defaultValue }) => {
  console.log(defaultValue, name);

  const handleChange = e => {
    if (e.target.files && e.target.files.length) {
      const { files } = e.target;
      console.log('calling upload service...', files);

      files.forEach((file, uploadBatchIndex) => {
        if (files[uploadBatchIndex].existing) {
          return;
        }

        console.log(file);
      });
    }
  };

  const fileUploadId = `fileUpload${label}`;
  return (
    <FileInputStyle>
      <FormInput
        label={label}
        name={name}
        Component={() =>
          defaultValue ? (
            <DocumentTag
            // onClick={() => alert(`remove '${defaultValue}'`)}
            // key={`{name}`}
            >
              {defaultValue}
              <Button
                className="classButton"
                size={34}
                variant="blank"
                iconSize={20}
                icon={<Close />}
                onClick={() => alert()}
              />
            </DocumentTag>
          ) : (
            <>
              <UploadButton variant="primary" for={fileUploadId}>
                Selecteer bestand
                <input type="file" id={fileUploadId} onChange={handleChange} />
              </UploadButton>
            </>
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
};

export default FileInput;
