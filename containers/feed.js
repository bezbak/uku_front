import styles from './styles.module.scss'
import classNames from "classnames";
import Card from "../components/Card";
import useSWR from "swr";
import uku from '/adapters/HTTP_Agent'
import {endpoints} from "../api/endpoints";
import fetcher from "../adapters/getFetcher";
import {page} from "../components/Card/state";
import {useRecoilState} from "recoil";
import {cards} from "../components/Card/state";
import {useEffect} from "react";


const Feed = ({title}) => {

    const [currentPage, setCurrentPage] = useRecoilState(page)
    const [cardsData, setCardsData] = useRecoilState(cards)


    const {data, error} = useSWR(uku + endpoints.feed + `?page=${currentPage}`, fetcher)

    useEffect(() => {
        setCardsData(data)
    }, [])


    return (
        <div className={classNames("container", styles.title)}>
            <div className={title === "Публикации" ? styles.profilePage : null}>
                <h1>{title}</h1>
                {title === "Публикации" ? <button>Подписаться</button> : null}
            </div>
            <div className={classNames(styles.feed, "container")}>
                <Card width={
                    {
                        "Избранное": "368px",
                        "Лента": "368px",
                        "Объявления": "300px",
                        "Публикации": "300px"
                    }[title]}
                      data={data}
                />
            </div>
        </div>

    )
}

export default Feed;