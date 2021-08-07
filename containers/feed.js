import styles from './styles.module.scss'
import classNames from "classnames";
import Card from "../components/Card";

const Feed = ({title}) => {

    return (
        <div className={classNames("container", styles.title)}>
            <h1>{title}</h1>
            <div className={classNames(styles.feed, "container")}>
                <Card width={{"Избранное": "368px", "Лента": "368px", "Объявления": "300px"}[title]}/>
                <Card width={{"Избранное": "368px", "Лента": "368px", "Объявления": "300px"}[title]}/>
                <Card width={{"Избранное": "368px", "Лента": "368px", "Объявления": "300px"}[title]}/>
                <Card width={{"Избранное": "368px", "Лента": "368px", "Объявления": "300px"}[title]}/>
                <Card width={{"Избранное": "368px", "Лента": "368px", "Объявления": "300px"}[title]}/>
                <Card width={{"Избранное": "368px", "Лента": "368px", "Объявления": "300px"}[title]}/>
            </div>
        </div>

    )
}

export default Feed;