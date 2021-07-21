import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import classNames from 'classnames'
import Cookies from "js-cookie";
import {actions as profileAction} from "../../store/profile/slice";
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
  const {pathname} = useRouter();
  const dispatch = useDispatch();
  const [region, setRegion] = useState(Cookies.get("region"));
  const [is_profile_completed, setIs_profile_completed] = useState(Cookies.get("is_profile_completed"));
  const avatarRequest = () => dispatch(profileAction.avatarGetRequestStart());
  useEffect(() => {
      avatarRequest()
  }, [])
  console.log(region)
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
            {region}
          </NavLink>
        </li>}
        <li className={classNames(styles.nav_right_list, {[styles.nav_right_list_active]:pathname==='/search'})}>
          <NavLink url="/search">
            <SearchIcon/>
            Поиск
          </NavLink>
        </li>
        <li className={classNames(styles.nav_right_list, styles.nav_right_list_favorite, {[styles.nav_right_list_active]:pathname==='/favorites'})}>
          <NavLink url="/favorites">
            <HeartIcon/>
            Избранное
          </NavLink>
        </li>
        <li  className={classNames(styles.nav_right_list, styles.nav_right_listNoBorder, {[styles.nav_right_list_active]:pathname==='/profile'})}>
          {is_profile_completed ?
            <NavLink url="/profile">
              {userAvatar.avatar ? <img src={userAvatar?.avatar} className={styles.nav_right_list__profileImg} alt="avatar"/> : <AvatarIcon/> }
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