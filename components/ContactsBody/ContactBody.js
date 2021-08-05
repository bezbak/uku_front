import styles from './styles.module.scss'
import classNames from "classnames";

const ContactBody = () => {
    return (
        <div className={classNames("container", styles.contactBody)}>
            <h1 className={styles.title}>Наши контактные данные</h1>
            <div>

            </div>
            <div className={styles.aboutBody}>
                <div className={styles.image}>
                    <img src="/images/aboutImage.png" alt=""/>
                </div>
                <div>
                    <p className={styles.about}>О нас</p>
                    <p className={styles.aboutDesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac
                        scelerisque orci aliquam consectetur
                        tristique nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare
                        odio mauris, faucibus consequat tincidunt aliquam enim risus. Est viverraLorem ipsum dolor sit
                        amet, consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur tristique nec.
                        Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio mauris,
                        faucibus consequat tincidunt aliquam enim risus. Est viverra</p>
                    <div className={styles.aboutContacts}>
                        <div className={styles.col}>
                            <h3>Наши телефоны</h3>
                            <span>
                                <img src="/icons/search.png" alt=""/>
                                <span>+996 (555) 55 55 55</span>
                            </span>
                            <span>
                                <img src="/icons/search.png" alt=""/>
                                <span>+996 (555) 55 55 55</span>
                            </span>
                            <span>
                                <img src="/icons/search.png" alt=""/>
                                <span>+996 (555) 55 55 55</span>
                            </span>
                        </div>
                        <div className={styles.col}>
                            <h3>Мы в соц. сетях:</h3>
                            <span>
                                <img src="/icons/telegram.png" alt=""/>
                                <span>Телеграм</span>
                            </span>
                            <span>
                                <img src="/icons/whatsapp.png" alt=""/>
                                <span>WhatsApp</span>
                            </span>
                            <span>
                                <img src="/icons/instagram.png" alt=""/>
                                <span>Instagram</span>
                            </span>
                        </div>
                        <div className={styles.col}>
                            <h3>Наш адрес:</h3>
                            <div>
                                <img src="/icons/location.png" alt=""/>
                                <span>Бишкек, Ахунбаева 125/66</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactBody;