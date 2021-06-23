import React from "react";
import classNames from 'classnames'
import Logo from "../Logo";
import Search from "../Search";
import NavLink from "../NavLink";
import SearchIcon from '../../public/icons/searchIcon.svg';
import HeartIcon from '../../public/icons/heartIcon.svg';
import LoginIcon from '../../public/icons/loginIcon.svg';
import styles from './styles.module.scss';
import {shallowEqual, useSelector} from "react-redux";

const Nav = () => {
  const userProfile = useSelector((store) => store.profile?.userProfile, shallowEqual);
  const userImg = useSelector((store) => store.profile?.userAvatar, shallowEqual);

  return (
    <div className={styles.nav}>
      <div className={styles.nav_left}>
        <Logo/>
        <Search/>
      </div>
      <div className={styles.nav_right}>
        <li className={styles.nav_right_list}>
          <NavLink>
            <SearchIcon/>
            Поиск
          </NavLink>
        </li>
        <li className={styles.nav_right_list}>
          <NavLink>
            <HeartIcon/>
            Избранное
          </NavLink>
        </li>
        <li className={classNames(styles.nav_right_list, styles.nav_right_listNoBorder)}>
          {userProfile==='' ?
          <NavLink url="/profile">
            <img src={userImg} className={styles.nav_right_list__profileImg}/>
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