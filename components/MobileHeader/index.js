import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.scss'
import Link from "next/link";
import {useRouter} from "next/router";
import SearchBar from "../HeaderNavbar/SearchBar/SearchBar";
import cn from 'classnames';
import MainMenu from "./MainMenu";
import CategoryMenu from "./CategoryMenu";

const MobileHeader = () => {
  const ref = useRef(null)
  const router = useRouter()
  const [searchDropdown, setSearchDropdown] = useState(false)

  useEffect(() => {
    ref.current.checked = false
  }, [router.pathname])


  return (
    <nav className={styles.nav}>
      <Link href="/">
        <h2>Uku.kg</h2>
      </Link>
      <img onClick={()=>setSearchDropdown(!searchDropdown)} src="/icons/search.svg" alt=""/>
      <div className={styles.menuToggle}>
        <input ref={ref} type="checkbox"/>
        <span/>
        <span/>
        <span/>
        {!router.pathname.includes("search") && <MainMenu/>}
        {router.pathname.includes("search") && <CategoryMenu/> }
      </div>
      {searchDropdown && <SearchBar/>}
    </nav>
  )
}

export default MobileHeader;