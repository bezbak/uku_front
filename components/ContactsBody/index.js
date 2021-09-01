import styles from './styles.module.scss'
import classNames from "classnames";
import useSWR from "swr";
import uku from '/util/HTTP_Agent'
import {endpoints} from "../../api/endpoints";
import {toast} from "react-toastify";

const fetchContacts = url => fetch(url).then(res => res.json().then(data => data))

const ContactsBody = () => {

    const {data, error} = useSWR(uku + endpoints.contact, fetchContacts)

    toast.error(error)

    return (
        <div className={classNames("container", styles.contactBody)}>
            <h1 className={styles.title}>Наши контактные данные</h1>
            <div>

            </div>
            <div className={styles.aboutBody}>
                <div className={styles.image}>
                    <img src={data && data.image} alt=""/>
                </div>
                <div>
                    <p className={styles.about}>{data && data.title}</p>
                    <p className={styles.aboutDesc}>{data && data.description}</p>
                    <div className={styles.aboutContacts}>
                        <div className={styles.col}>
                            <h3>Наши телефоны</h3>
                            {data && data.phone_numbers.map((item) => {
                                return <span key={item.id}>
                                <img src="/icons/search.png" alt=""/>
                                <span>{item.phone}</span>
                            </span>
                            })}

                        </div>
                        <div className={styles.col}>
                            <h3>Мы в соц. сетях:</h3>
                            <span>
                                <img src="/icons/telegram.png" alt=""/>
                                <a
                                    target={"_blank"}
                                    href={data && data.telegram}>Телеграм</a>
                            </span>
                            <span>
                                <img src="/icons/whatsapp.png" alt=""/>
                                <a target={"_blank"} href={"/"}>WhatsApp</a>
                            </span>
                            <span>
                                <img src="/icons/instagram.png" alt=""/>
                                <a target={"_blank"} href={data && data.instagram}>Instagram</a>
                            </span>
                        </div>
                        <div className={styles.col}>
                            <h3>Наш адрес:</h3>
                            <div>
                                <img src="/icons/location.png" alt=""/>
                                <span>{data && data.address}</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactsBody;