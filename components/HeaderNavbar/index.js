import Logo from "./Logo/Logo";
import SearchBar from "./SearchBar/SearchBar";
import styles from './styles.module.scss'
import SearchPublication from "./SearchPublications/SearchPublication";
import Favourite from "./Favourite/Favourite";
import Profile from "./Profile/Profile";
import Location from "./Location";
import {useRouter} from "next/router";
import MobileHeader from "../MobileHeader";

const HeaderNavbar = () => {


  const router = useRouter()

  return (
    <div className={styles.navbar}>
      <div className={'container'}>
        <div>
          <Logo/>
          <SearchBar/>
        </div>
        <div className={styles.navbarRight}>
          {router.route === "/search" || router.route === "/createPublication" ? < Location/> : null}
          <SearchPublication/>
          <Favourite
            state={typeof window !== "undefined" && !!window.localStorage.getItem("token") ? "authorized" : "nonAuthorized"}/>
          <Profile
            state={typeof window !== "undefined" && !!window.localStorage.getItem("token") ? "authorized" : "nonAuthorized"}/>
        </div>
      </div>
    </div>

  )
}

export default HeaderNavbar;