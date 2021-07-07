import React from "react";
import {shallowEqual, useSelector} from "react-redux";
import classNames from 'classnames'
import Logo from "../Logo";
import Search from "../Search";
import NavLink from "../NavLink";
import SearchIcon from '../../public/icons/searchIcon.svg';
import HeartIcon from '../../public/icons/heartIcon.svg';
import LoginIcon from '../../public/icons/loginIcon.svg';
import styles from './styles.module.scss';

const Nav = () => {
  const userAvatar = useSelector((store) => store.profile?.userAvatar, shallowEqual);
  return (
    <div className={styles.nav}>
      <div className={styles.nav_left}>
        <Logo/>
        <Search/>
      </div>
      <div className={styles.nav_right}>
        <li className={styles.nav_right_list}>
          <NavLink url="/search">
            <SearchIcon/>
            Поиск
          </NavLink>
        </li>
        <li className={styles.nav_right_list}>
          <NavLink url="/ads">
            <HeartIcon/>
            Избранное
          </NavLink>
        </li>
        <li className={classNames(styles.nav_right_list, styles.nav_right_listNoBorder)}>
          {userAvatar!=='' ?
            <NavLink url="/profile">
              <img src={userAvatar?.avatar} className={styles.nav_right_list__profileImg}/>
              Профиль
            </NavLink> :
            <NavLink url="/login">
              <LoginIcon/>
              Вход
            </NavLink>
          }
        </li>
      </div>
    </div>
  )
}
export default Nav;