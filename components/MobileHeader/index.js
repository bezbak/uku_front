import React, {useEffect, useRef} from 'react';
import styles from './styles.module.scss'
import Link from "next/link";

const MobileHeader = () => {
  const ref = useRef(null)

  useEffect(()=>{
    ref.current.checked=false
  }, [window.location.pathname])

  return (
    <nav className={styles.nav}>
      <Link href="/profile">
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
          <Link href="/myProfile">
            <li>
              Профиль
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  )
}

export default MobileHeader;