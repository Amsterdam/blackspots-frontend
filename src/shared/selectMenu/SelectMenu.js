import React, { useState } from 'react';
import styles from './SelectMenu.module.scss';
import classNames from 'classnames';
import { ReactComponent as Chevron } from 'assets/icons/Chevron-Top.svg';

export default ({ items }) => {
  const [selected, setSelected] = useState(items[0].label);
  const [showMenu, setShowMenu] = useState(false);

  function getMenu() {
    return (
      <div
        className={classNames(styles.Menu, !showMenu ? styles.MenuHide : '')}
      >
        {items.map((i, index) => (
          <button
            key={index}
            className={styles.Option}
            onClick={() => {
              i.onClick();
              setShowMenu(false);
              setSelected(i.label);
            }}
          >
            {i.label}
          </button>
        ))}
      </div>
    );
  }

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
      {getMenu()}
    </div>
  );
};
