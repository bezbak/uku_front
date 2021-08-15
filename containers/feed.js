import styles from './styles.module.scss'
import classNames from "classnames";
import Card from "../components/Card";
import uku from '/adapters/HTTP_Agent'
import {endpoints} from "../api/endpoints";
import {cards, page} from "../components/Card/state";
import {useRecoilState} from "recoil";
import {useEffect, useRef} from "react";


const Feed = ({title}) => {
    const loader = useRef(null)
    const [currentPage, setCurrentPage] = useRecoilState(page)
    const [cardsData, setCardsData] = useRecoilState(cards)
    const handleObserver = entities => {
        const target = entities[0]
        if (target.isIntersecting) {
            setCurrentPage(old => old + 1)
        }
    }

    useEffect(() => {
        let options = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0
        }
        const observer = new IntersectionObserver(handleObserver, options)
        if (loader.current) {
            observer.observe(loader.current)
        }
    }, [])

    useEffect(() => {
        fetch(uku + endpoints.feed + `?page=${currentPage}`)
            .then(res => res.json()
                .then(data => {
                    if (data.next) {
                        setCardsData(old => ({...old, results: [...old.results, ...data.results]}))
                    }
                }))
    }, [currentPage])


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
                      data={cardsData}
                />
                <div className={"observer"} ref={loader}/>
            </div>
        </div>

    )
}

export default Feed;