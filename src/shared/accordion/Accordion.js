import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Typography from '../typography/Typography';
import styles from './Accordion.module.scss';
import classNames from 'classnames';

const Accordion = ({ title, text }) => {
  const [open, setOpen] = useState(false);

  function toggle() {
    setOpen(!open);
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Header} onClick={toggle}>
        <div className={styles.Title}>{title}</div>
        <div
          className={classNames(styles.Expander, {
            [styles.ExpanderOpen]: open,
          })}
        />
      </div>
      <div className={classNames(styles.Text, { [styles.TextOpen]: open })}>
        <div className={styles.TextInner}>
          <Typography>{text}</Typography>
        </div>
      </div>
    </div>
  );
};

Accordion.propTyped = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Accordion;
