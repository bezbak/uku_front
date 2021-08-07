import styles from './styles.module.scss'
import classNames from "classnames";
import Spoiler from "./Spoiler/Spoiler";

const FAQ = () => {
    return (
        <div className={classNames("container", styles.faqBody)}>
            <h2>F.A.Q.</h2>
            <div className={styles.box}>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
                        return (
                            <div key={index}>
                                <Spoiler
                                    title={item}
                                    desc={item}
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