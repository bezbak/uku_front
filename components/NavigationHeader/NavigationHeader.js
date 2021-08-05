import Link from "next/link";
import styles from './styles.module.scss'
import classNames from "classnames";

const NavigationHeader = () => {
    return (
        <div className={styles.navigationHeader}>
            <ul className={classNames(styles.links, "container")}>
                <Link href={"/"}>
                    <li>Главная</li>
                </Link>
                <Link href={"/contacts"}>
                    <li>Контакты</li>
                </Link>
                <Link href={"/faq"}>
                    <li>F.A.Q.</li>
                </Link>
            </ul>
        </div>
    )
}

export default NavigationHeader;