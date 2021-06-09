import React from "react";
import NavLink from "../NavLink";
import useIsMobile from "../../public/hooks/useIsMobile";
import Menu from '../../public/icons/menu 1.svg'
import SearchIcon from '../../public/icons/searchIcon.svg'
import styles from './styles.module.scss'

const Header = () => {
  const isMobile = useIsMobile();
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        {isMobile &&
        <div className={styles.header__mobileContent}>
          <button className={styles.header__menuButton}>
            <Menu/>
          </button>
          <div className={styles.header__mobileLogo}>
            <span>Uku.kg</span>
          </div>
          <button  className={styles.header__menuButton}>
            <SearchIcon/>
          </button>
        </div>
        }
        {!isMobile &&
        <ul className={styles.header__list}>
          <li className={styles.header__list__li}>
            <NavLink url={"/"} className={styles.header__list__link} children={"Главная"}/>
          </li>
          <li>
            <NavLink url={"/system/contact"} className={styles.header__list__link} children={"Контакты"}/>
          </li>
          <li>
            <NavLink url={"/system/faq"} className={styles.header__list__link} children={"F.A.Q."}/>
          </li>
        </ul>}
      </div>
    </div>
  )
}
export default Header;