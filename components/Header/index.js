import React from "react";
import NavLink from "../NavLink";
import styles from './styles.module.scss'

const Header = () => {
  return (
    <div className={styles.header}>
      <ul className={styles.header__list}>
        <li className={styles.header__list__li}>
          <NavLink url={"/"} className={styles.header__list__link} children={"Главная"}/>
        </li>
        <li>
          <NavLink url={"/contact"} className={styles.header__list__link} children={"Контакты"}/>
        </li>
        <li>
          <NavLink url={"/faq"} className={styles.header__list__link} children={"F.A.Q."}/>
        </li>
      </ul>
    </div>
  )
}
export default Header;