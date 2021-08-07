import styles from './styles.module.scss'
import classNames from "classnames";
import Card from "../components/Card";

const Feed = ({title}) => {

    return (
        <div className={classNames("container", styles.title)}>
            <h1>{title}</h1>
            <div className={classNames(styles.feed, "container")}>
                <Card width={title === "Лента" ? "368px" : "300px"}/>
                <Card width={title === "Лента" ? "368px" : "300px"}/>
                <Card width={title === "Лента" ? "368px" : "300px"}/>
                <Card width={title === "Лента" ? "368px" : "300px"}/>
                <Card width={title === "Лента" ? "368px" : "300px"}/>
                <Card width={title === "Лента" ? "368px" : "300px"}/>
            </div>
        </div>

    )
}

export default Feed;