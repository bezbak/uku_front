import styles from './styles.module.scss'
import Link from "next/link";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={"container"}>
                <div>
                    <Link href={"/contacts"}>
                        <p>Контакты</p>
                    </Link>
                    <Link href={"/faq"}>
                        <p>F.A.Q.</p>
                    </Link>
                </div>
                <div>
                    <img src="/images/iOS.png" alt=""/>
                    <img src="/images/android.png" alt=""/>
                </div>
            </div>
        </div>
    )
}

export default Footer;