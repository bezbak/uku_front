import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {shallowEqual, useSelector} from "react-redux";
import classNames from "classnames";
import NavLink from "../NavLink";
import useIsMobile from "../../public/hooks/useIsMobile";
import CloseIcon from '../../public/icons/CloseIcon.svg';
import Menu from '../../public/icons/menu 1.svg';
import SearchIcon from '../../public/icons/searchIcon.svg';
import HeartIcon from "../../public/icons/heartIcon.svg";
import LoginIcon from "../../public/icons/loginIcon.svg";
import AppStoreMobileIcon from '../../public/icons/appStoreMpbileIcon.svg';
import GooglePlayMobileIcon from '../../public/icons/googlePlayMobileIcon.svg';
import styles from './styles.module.scss';

function useOutsideAlerter(ref,setIsMobileMenuOpen) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
const Header = () => {
  const wrapperRef = useRef(null);
  const { pathname } = useRouter();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  useOutsideAlerter(wrapperRef, setIsMobileMenuOpen);
  const userProfile = useSelector((store) => store.profile?.userProfile, shallowEqual);
  const userImg = useSelector((store) => store.profile?.userAvatar, shallowEqual);
  return (
    <div className={styles.headerContainer} ref={wrapperRef}>
      <div className={styles.header}>
        {isMobile &&
        <div className={styles.header__mobileContent}>
          <button className={styles.header__menuButton} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <CloseIcon/> : <Menu/>}
          </button>

          <div className={styles.header__mobileLogo}>
            <span>Uku.kg</span>
          </div>
          <button className={styles.header__menuButton}>
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
        </ul>
        }
      </div>
      <div className={classNames(styles.mobileMenu, {[styles.mobileMenu_isOpen]: isMobileMenuOpen})}>
        <div className={styles.mobileMenu__headerMenu}>
          <li className={styles.mobileMenu__headerMenu__list}>
            <NavLink url={"/"}
                     className={styles.mobileMenu__headerMenu__list_link} children={"Главная"}
                     onClick={()=>setIsMobileMenuOpen(false)}
            />
          </li>
          <li className={styles.mobileMenu__headerMenu__list}>
            <NavLink url={"/system/contact"}
                     className={styles.mobileMenu__headerMenu__list_link} children={"Контакты"}
                     onClick={()=>setIsMobileMenuOpen(false)}
            />
          </li>
          <li className={styles.mobileMenu__headerMenu__list}>
            <NavLink url={"/system/faq"}
                     className={styles.mobileMenu__headerMenu__list_link} children={"F.A.Q."}
                     onClick={()=>setIsMobileMenuOpen(false)}
            />
          </li>
        </div>
        <div className={styles.mobileMenu__navMenu}>
          <li className={styles.mobileMenu__navMenu__list}>
            <NavLink url='/search'
                     className={classNames(styles.mobileMenu__navMenu__list_link,
              {[styles.mobileMenu__navMenu__list_link_active]:pathname==='search'})}
                     onClick={()=>setIsMobileMenuOpen(false)}>
              <SearchIcon/>
              Поиск
            </NavLink>
          </li>
          <li className={styles.mobileMenu__navMenu__list}>
            <NavLink url="/" className={classNames(styles.mobileMenu__navMenu__list_link,
              {[styles.mobileMenu__navMenu__list_link_active]:pathname==='/'})}
                     onClick={()=>setIsMobileMenuOpen(false)}
            >
              <HeartIcon/>
              Избранное
            </NavLink>
          </li>
          {userProfile === '' ? <li className={classNames(styles.mobileMenu__navMenu__list)}>
              <NavLink url="/profile"
                       className={classNames(styles.mobileMenu__navMenu__list_link,
                {[styles.mobileMenu__navMenu__list_link_active]: pathname === 'profile'})}
                       onClick={() => setIsMobileMenuOpen(false)}>
                <LoginIcon/>
                Profile
              </NavLink>
            </li> :
            <li className={classNames(styles.mobileMenu__navMenu__list)}>
              <NavLink url="/login" className={classNames(styles.mobileMenu__navMenu__list_link)}
                       onClick={() => setIsMobileMenuOpen(false)}>
                <LoginIcon/>
                Вход
              </NavLink>
            </li>
          }
        </div>
        <div className={styles.mobileMenu__footer}>
          <NavLink>
            <AppStoreMobileIcon/>
          </NavLink>
          <NavLink>
            <GooglePlayMobileIcon/>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
export default Header;