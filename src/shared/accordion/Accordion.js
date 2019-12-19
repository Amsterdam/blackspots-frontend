import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Accordion.module.scss';

const Accordion = ({ title, text }) => {
  const [open, setOpen] = useState(false);

  function toggle() {
    setOpen(!open);
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') toggle();
  };

  return (
    <div className={styles.Container}>
      <div
        className={styles.Header}
        onClick={toggle}
        role="button"
        tabIndex="0"
        onKeyPress={handleKeyPress}
      >
        <div className={styles.Title}>{title}</div>
        <div
          className={classNames(styles.Expander, {
            [styles.ExpanderOpen]: open,
          })}
        />
      </div>
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
