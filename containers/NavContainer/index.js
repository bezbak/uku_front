import React from "react";
import styles from './styles.module.scss';

const NavContainer = ({children}) => {
  return (
    <div className={styles.navContainer}>
      {children}
    </div>
  )
}
export default NavContainer;