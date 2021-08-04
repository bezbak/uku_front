import styles from './styles.module.scss'
import classNames from "classnames";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={"container"}>
                <div>
                    <p>Контакты</p>
                    <p>F.A.Q.</p>
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