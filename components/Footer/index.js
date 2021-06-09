import React from "react";
import classNames from 'classnames'
import NavLink from "../NavLink";
import AppStoreIcon from '../../public/icons/appStore.svg'
import GooglePlay from '../../public/icons/googlePlay.svg'
import styles from './styles.module.scss'

const Footer = ({className}) => {
  return (
    <div className={classNames( className, styles.container)}>
      <div className={classNames(styles.footer)}>
        <div className={styles.footer_left}>
          <li className={styles.footer_left__list}>
            <NavLink url={"/system/contact"} children={"Контакты "} className={styles.footer_left__list__link}/>
          </li>
          <li className={styles.footer_left__list}>
            <NavLink url={"/system/privacy-policy"} children={"F.A.Q. "} className={styles.footer_left__list__link}/>
          </li>
        </div>
        <div className={styles.footer_right}>
          <NavLink url={"/system/contact"}>
            <AppStoreIcon/>
          </NavLink>
          <NavLink url={"/faq"}>
            <GooglePlay/>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
export default Footer;