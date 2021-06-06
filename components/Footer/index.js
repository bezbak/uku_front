import React from "react";
import classNames from 'classnames'
import NavLink from "../NavLink";
// import appleIcon from '../../public/icons/apple.png'
import styles from './styles.module.scss'

const Footer = ({className}) => {
  return (
    <div className={classNames(styles.footer, className)}>
      <div className={styles.footer_left}>
        <li className={styles.footer_left__list}>
          <NavLink url={"/system/contact"} children={"Контакты "} className={styles.footer_left__list__link}/>
        </li>
        <li className={styles.footer_left__list}>
          <NavLink url={"/system/privacy-policy"} children={"F.A.Q. "} className={styles.footer_left__list__link}/>
        </li>
      </div>
      <div className={styles.footer_right}>
        <li className={styles.footer_right__list}>
          <NavLink url={"/system/contact"}>
            <div className={styles.footer_right__list__link}>
              <img src="icons/apple.png"/>
              <div className={styles.footer_right__list__text}>
                <span>
                  Доступно на
                </span>
                <span>

                </span>

              </div>
            </div>
          </NavLink>
        </li>
        <li className={styles.footer_right__list}>
          <NavLink url={"/faq"}>
            <div className={styles.footer_right__list__link}>
              <img src="icons/googlePlay.svg"/>
              <div className={styles.footer_right__list__text}>
                <span>
                  Доступно на
                </span>
                <span>

                </span>

              </div>
            </div>
          </NavLink>

        </li>
      </div>
    </div>
  )
}
export default Footer;