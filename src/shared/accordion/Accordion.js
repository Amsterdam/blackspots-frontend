import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Accordion.module.scss';

const Accordion = ({ title, text }) => {
  const [open, setOpen] = useState(false);

  function toggle() {
    setOpen(!open);
  }

  return (
    <div className={styles.Container}>
      <button type="button" className={styles.Header} onClick={toggle}>
        <div className={styles.Title}>{title}</div>
        <div
          className={classNames(styles.Expander, {
            [styles.ExpanderOpen]: open,
          })}
        />
      </button>
      <div className={classNames(styles.Text, { [styles.TextOpen]: open })}>
        <div className={styles.TextInner}>{text}</div>
      </div>
    </div>
  );
};

Accordion.propTyped = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Accordion;
