import NavigationHeader from "../components/NavigationHeader";
import HeaderNavbar from "../components/HeaderNavbar";
import styles from './styles.module.scss'


export const Header = () => {
    return (
        <div className={styles.header}>
            <div>
                <NavigationHeader/>
                <HeaderNavbar/>
            </div>
        </div>

    )
}