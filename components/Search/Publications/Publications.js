import styles from './styles.module.scss'
import Card from "../../Card";
import Feed from "../../../containers/feed";

const Publications = () => {
    return (
        <div className={styles.publications}>
            <Feed title={"Объявления"}/>
        </div>
    )
}

export default Publications;