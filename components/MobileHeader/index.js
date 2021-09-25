import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.scss'
import Link from "next/link";
import {useRouter} from "next/router";

const MobileHeader = () => {
  const ref = useRef(null)
  const router = useRouter()

  useEffect(() => {
    ref.current.checked = false
  }, [router.pathname])

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <h2>Uku.kg</h2>
      </Link>
      <img src="/icons/search.svg" alt=""/>
      <div className={styles.menuToggle}>
        <input ref={ref} type="checkbox"/>
        <span/>
        <span/>
        <span/>
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
      </div>
    </nav>
  )
}

export default MobileHeader;