import styles from './styles.module.scss'
import Card from "../../Card";
import Feed from "../../../containers/feed";
import CreatePublication from "../../CreatePublication";

const Publications = () => {
    return (
        <div className={styles.publications}>
            <CreatePublication/>
            <Feed title={"Объявления"}/>
        </div>
    )
}

export default Publications;