import Navigation from "./Navigation";
import DetailInfo from "./DetailInfo";
import styles from './styles.module.scss'
import classNames from "classnames";

const Detail = () => {
    return (
        <div className={classNames("container", styles.detail)}>
            <Navigation/>
            <DetailInfo/>
        </div>
    )
}

export default Detail;