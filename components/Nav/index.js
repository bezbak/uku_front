import React from "react";
import {useRouter} from "next/router";
import {shallowEqual, useSelector} from "react-redux";
import classNames from 'classnames'
import Logo from "../Logo";
import Search from "../Search";
import NavLink from "../NavLink";
import SearchIcon from '../../public/icons/searchIcon.svg';
import HeartIcon from '../../public/icons/heartIcon.svg';
import LoginIcon from '../../public/icons/loginIcon.svg';
import AvatarIcon from '../../public/icons/avatar.svg'
import AddressIcon from '../../public/icons/address.svg'
import styles from './styles.module.scss';

const Nav = () => {
  const {pathname} = useRouter()
  const userAvatar = useSelector((store) => store.profile?.userAvatar, shallowEqual);
  const user_region_detail = useSelector((store) => store.auth?.user_region_detail, shallowEqual);
  return (
    <div className={styles.nav}>
      <div className={styles.nav_left}>
        <Logo/>
        <Search/>
      </div>
      <div className={styles.nav_right}>
        {(pathname === '/search' && pathname !== '') && <li className={classNames(styles.nav_right_list)}>
          <NavLink url="/search">
            <AddressIcon/>
            {user_region_detail?.name}
          </NavLink>
        </li>}
        <li className={classNames(styles.nav_right_list, {[styles.nav_right_list_active]:pathname==='/search'})}>
          <NavLink url="/search">
            <SearchIcon/>
            Поиск
          </NavLink>
        </li>
        <li className={classNames(styles.nav_right_list, {[styles.nav_right_list_active]:pathname==='/favorites'})}>
          <NavLink url="/favorites">
            <HeartIcon/>
            Избранное
          </NavLink>
        </li>
        <li  className={classNames(styles.nav_right_list, styles.nav_right_listNoBorder, {[styles.nav_right_list_active]:pathname==='/profile'})}>
          {userAvatar!=='' ?
            <NavLink url="/profile">
              {userAvatar?.avatar ? <img src={userAvatar?.avatar} className={styles.nav_right_list__profileImg}/> : <AvatarIcon/> }
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