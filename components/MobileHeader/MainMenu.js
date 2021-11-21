import React from 'react';
import styles from "./styles.module.scss";
import Link from "next/link";

function MainMenu(props) {
  return (
    <ul className={styles.menu}>
      <hr/>

      <Link href="/">
        <li className={styles.afterLine}>Главная</li>
      </Link>
      <Link href="/contacts">
        <li>Контакты</li>
      </Link>
      <Link href="/faq">
        <li>F.A.Q.</li>
      </Link>
      <hr/>
      <Link href={"/search"}>
        <li className={styles.mobileCategories}>Категории</li>
      </Link>
      <Link href={"/search"}>
        <li>Новости</li>
      </Link>


      <hr/>
      <li className={styles.afterLine}>
        <img src="/icons/location.svg" alt=""/>
        Уфа
      </li>
      <Link href="/search">
        <li>
          <img src="/icons/search.svg" alt=""/>
          Поиск
        </li>
      </Link>

      <Link href="/favourite">
        <li>
          <img src="/icons/heartIcon.svg" alt=""/>
          Избранное
        </li>
      </Link>
      {typeof window !== "undefined" && !!window.localStorage.getItem("token") ? <div>
        <Link href="/myProfile">
          <li>
            Профиль
          </li>
        </Link>
      </div> : <div>
        <Link href="/login">
          <li>
            Войти
          </li>
        </Link>
      </div>}
    </ul>
  );
}

export default MainMenu;