import { FC } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const Header: FC = () => (
  <header className={styles.header}>
    <div className={styles.menu}>
      <NavLink className={({ isActive }) => cn(styles.menuItem, isActive && styles.menuItem_active)} to="/" end>Home</NavLink>
      <NavLink className={({ isActive }) => cn(styles.menuItem, isActive && styles.menuItem_active)} to="booking">Booking</NavLink>
      <NavLink className={({ isActive }) => cn(styles.menuItem, isActive && styles.menuItem_active)} to="map">Map</NavLink>
    </div>
  </header>
);

export default Header;
