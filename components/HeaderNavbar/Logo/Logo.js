import styles from './styles.module.scss'
import Link from "next/link";

const Logo = () => {


    return (
        <div className={styles.logo}>
            <Link href={"/"}>
                <img src="/images/logo.png" alt=""/>
            </Link>
        </div>
    )
}

export default Logo;