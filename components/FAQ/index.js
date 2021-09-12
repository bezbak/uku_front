import styles from './styles.module.scss'
import classNames from "classnames";
import Spoiler from "./Spoiler/Spoiler";
import useSWR from "swr";
import uku from '/util/HTTP_Agent'
import {endpoints} from "../../api/endpoints";
import {toast} from "react-toastify";

const fetchFaq = url => fetch(url).then(res => res.json().then(data => data))

const FAQ = () => {

    const {data, error} = useSWR(uku + endpoints.faq, fetchFaq)

    toast.error(error)

    return (
        <div className={classNames("container", styles.faqBody)}>
            <h2>F.A.Q.</h2>
            <div className={styles.box}>
                {
                    data && data.map((item, index) => {
                        return (
                            <div key={index}>
                                <Spoiler
                                    info={item}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FAQ;