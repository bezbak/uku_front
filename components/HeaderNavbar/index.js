import Logo from "./Logo/Logo";
import SearchBar from "./SearchBar/SearchBar";
import styles from './styles.module.scss'
import SearchPublication from "./SearchPublications/SearchPublication";
import Favourite from "./Favourite/Favourite";
import Profile from "./Profile/Profile";

const Index = () => {
    return (
        <div className={styles.navbar}>
            <div className={'container'}>
                <div>
                    <Logo/>
                    <SearchBar/>
                </div>
                <div className={styles.navbarRight}>
                    <SearchPublication/>
                    <Favourite state={"nonAuthorized"}/>
                    <Profile state={"nonAuthorized"}/>
                </div>
            </div>
        </div>

    )
}

export default Index;