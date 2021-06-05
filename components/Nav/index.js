import React from "react";
import classNames from 'classnames'
import Logo from "../Logo";
import Search from "../Search";
import NavLink from "../NavLink";
// import SearchIcon from '../../public/icons/search.svg';
// import heartIcon from '../../public/icons/heart.png';
import styles from './styles.module.scss';

const Nav = () =>{
return(
  <div className={styles.nav}>
    <div className={styles.nav_left}>
      <Logo/>
      <Search/>
    </div>
    <div className={styles.nav_right}>
      <li className={styles.nav_right_list}>
        {/*<SearchIcon/>*/}
        <NavLink>
          <img src="/icons/search.svg"/>
          Поиск
        </NavLink>
      </li>
      <li className={styles.nav_right_list}>
        <NavLink>
          <img src="/icons/heart.png"/>
          Избранное
        </NavLink>
      </li>
      <li className={classNames(styles.nav_right_list,styles.nav_right_listNoBorder)}>
        <NavLink>
          <img src="/icons/heart.png"/>
          Вход
        </NavLink>
      </li>
    </div>


  </div>
)
}
export default Nav;