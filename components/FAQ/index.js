import styles from './styles.module.scss'
import classNames from "classnames";
import Spoiler from "./Spoiler/Spoiler";

const Index = () => {
    return (
        <div className={classNames("container", styles.faqBody)}>
            <h2>F.A.Q.</h2>
            <div className={styles.box}>
                {
                    [1, 2, 3, 4, 5].map((item, index) => {
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

export default Index;