import styles from './styles.module.scss'
import classNames from "classnames";
import Card from "../components/Card/Card";

const Feed = () => {

    return (
        <div className={classNames("container", styles.title)}>
            <h1>Лента</h1>
            <div className={classNames(styles.feed, "container")}>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </div>

    )
}

export default Feed;