import styles from './styles.module.scss'
import classNames from "classnames";
import cs from 'classnames'
import {useState} from "react";

const Spoiler = ({info}) => {

    const [spoiler, setSpoiler] = useState(false)


    return (
        <div
            onClick={() => setSpoiler(!spoiler)}
            className={styles.spoiler}>
            <div className={styles.defaultSpoiler}>
                <h3>{info && info.question}</h3>
                <img style={spoiler ? {transform: "rotate(90deg)"} : {transform: "rotate(0deg)"}}
                     src="/icons/arrow.png"
                     alt=""/>
            </div>
            <div
                className={classNames(styles.spoilerContent, spoiler ? styles.expanded : styles.collapsed)}>
                <p>
                    {info && info.answer} </p>
            </div>
        </div>

    )
}

export default Spoiler;