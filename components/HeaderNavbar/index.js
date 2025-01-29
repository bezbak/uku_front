import Logo from "./Logo/Logo";
import SearchBar from "./SearchBar/SearchBar";
import styles from './styles.module.scss'
import SearchPublication from "./SearchPublications/SearchPublication";
import Favourite from "./Favourite/Favourite";
import Profile from "./Profile/Profile";
import Location from "./Location";
import {useRouter} from "next/router";
import LocationModal from "../UI/Modal/LocationModal";
import React, {useState} from "react";
import {useRecoilState} from "recoil";
import {locationAtom} from "../Search/state";

const HeaderNavbar = () => {
  const [locationModal, setLocationModal] = useState(false)
  const [location, setLocation] = useRecoilState(locationAtom)

  const router = useRouter()

  return (
    <div className={styles.navbar}>
      <div className={'container'}>
        <div>
          <Logo/>
          <SearchBar/>
        </div>
        <div className={styles.navbarRight}>
          {router.route === "/search" || router.route === "/createPublication" ?
            <Location modal={locationModal} setModal={setLocationModal} locationAtom={location}/> : null}
          <SearchPublication/>
          <Favourite
            state={typeof window !== "undefined" && !!window.localStorage.getItem("token") ? "authorized" : "nonAuthorized"}/>
          <Profile
            state={typeof window !== "undefined" && !!window.localStorage.getItem("token") ? "authorized" : "nonAuthorized"}/>
        </div>
      </div>
      <LocationModal title="Выберите город" modal={locationModal} setModal={setLocationModal}
                     setLocation={setLocation}/>
    </div>

  )
}

export default HeaderNavbar;