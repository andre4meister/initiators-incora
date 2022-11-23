import cn from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { CalendarOutlined, UnorderedListOutlined } from '@ant-design/icons';
import styles from './NavMenu.module.scss';

interface NavMenuProps {
  classes: string
}

const NavMenu: FC<NavMenuProps> = ({ classes }) => (
  <nav className={cn(styles.menu, classes)}>
    <NavLink className={({ isActive }) => cn(styles.menuItem, styles.menuItemDashboard, isActive && styles.menuItem_active)} to="/" end>
      <UnorderedListOutlined />
    </NavLink>
    <NavLink className={({ isActive }) => cn(styles.menuItem, styles.menuItemCalendar, isActive && styles.menuItem_active)} to="calendar">
      <CalendarOutlined />
    </NavLink>
  </nav>
);

export default NavMenu;
