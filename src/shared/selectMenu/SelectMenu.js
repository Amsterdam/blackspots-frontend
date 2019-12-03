import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SelectMenu.module.scss';
import classNames from 'classnames';
import { ReactComponent as Chevron } from 'assets/icons/chevron-top.svg';

const SelectMenu = ({ items, selectionChanged }) => {
  const [selected, setSelected] = useState(items[0].label);
  const [showMenu, setShowMenu] = useState(false);

  const onClick = item => () => {
    setShowMenu(false);
    setSelected(item.label);
    selectionChanged && selectionChanged(item.value);
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

SelectMenu.defaultValues = {
  selectionChanged: undefined
}

SelectMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  selectionChanged: PropTypes.func
};

export default SelectMenu;
