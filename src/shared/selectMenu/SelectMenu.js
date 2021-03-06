import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ReactComponent as Chevron } from 'assets/icons/chevron-top.svg';
import styles from './SelectMenu.module.scss';

const SelectMenu = ({ items, selectionChanged }) => {
  const [selected, setSelected] = useState(items[0].label);
  const [showMenu, setShowMenu] = useState(false);

  const onSelectMenuItem = (item) => () => {
    setShowMenu(false);
    setSelected(item.label);
    selectionChanged(item.value);
  };

  return (
    <div className={styles.Container} data-testid="select-menu">
      <button
        type="button"
        className={styles.Select}
        onClick={() => setShowMenu(!showMenu)}
        data-testid="selected-option"
      >
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
            type="button"
            key={i.id}
            className={styles.Option}
            onClick={onSelectMenuItem(i)}
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
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectionChanged: PropTypes.func.isRequired,
};

export default SelectMenu;
