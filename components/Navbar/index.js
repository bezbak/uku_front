import React from "react";
import ArrowIcon from '../../public/icons/ArrowIcon.svg'
import styles from './styles.module.scss';

const Navbar = () => {
  return(
    <div className={styles.navbar}>
      <ul className={styles.navbar__category}>
        <li className={styles.navbar__category__list}>
          Категория
          <ul className={styles.navbar__subcategory}>
            <li className={styles.navbar__subcategory__list}>
             <div className={styles.navbar__subcategory__list_wrap}>
               Подкатегрия 1
               <ArrowIcon />
             </div>
              <ul className={styles.navbar__subsubcategory}>
                <li className={styles.navbar__subsubcategory__list}>
                  Подподкатегрия 1
                </li>
                <li className={styles.navbar__subsubcategory__list}>
                  Подподкатегрия 2
                </li>
                <li className={styles.navbar__subsubcategory__list}>
                  Подподкатегрия 3
                </li>
              </ul>
            </li>
            <li className={styles.navbar__subcategory__list}>
              <div className={styles.navbar__subcategory__list_wrap}>
                Подкатегрия 2
                <ArrowIcon />
              </div>
              <ul className={styles.navbar__subsubcategory}>
                <li className={styles.navbar__subsubcategory__list}>
                  Подподкатегрия 1
                </li>
              </ul>
            </li>
            <li className={styles.navbar__subcategory__list}>
              <div className={styles.navbar__subcategory__list_wrap}>
                Подкатегрия 2
                <ArrowIcon />
              </div>
            </li>
          </ul>
        </li>
        <li className={styles.navbar__category__list}>Категория</li>
        <li className={styles.navbar__category__list}>Категория</li>
        <li className={styles.navbar__category__list}>Новости и статьи</li>
      </ul>
    </div>
  )
}
export default Navbar;