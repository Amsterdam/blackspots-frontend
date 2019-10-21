import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SelectMenu.module.scss';
import classNames from 'classnames';
import { ReactComponent as Chevron } from 'assets/icons/chevron-top.svg';

const SelectMenu = ({ items }) => {
  const [selected, setSelected] = useState(items[0].label);
  const [showMenu, setShowMenu] = useState(false);

  const onClick = item => () => {
    item.onClick();
    setShowMenu(false);
    setSelected(item.label);
  };

  return (
    <div className={styles.Container}>
      <button className={styles.Select} onClick={() => setShowMenu(!showMenu)}>
        {selected}
        <Chevron
          className={classNames(
            styles.MenuChevron,
            showMenu ? styles.MenuChevronRotated : ''
          )}
        />
      </button>
      <div
        className={classNames(styles.Menu, !showMenu ? styles.MenuHide : '')}
      >
        {items.map((i) => (
          <button
            key={i.id}
            className={styles.Option}
            onClick={onClick(i)}
          >
            {i.label}
          </button>
        ))}
      </div>
    </div>
  );
};

SelectMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ),
};

export default SelectMenu;
