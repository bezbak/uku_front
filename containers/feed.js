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

    console.log(cardsData)

    const handleObserver = entities => {
        const target = entities[0]
        if (target.isIntersecting) {
            setCurrentPage(old => old + 1)
        }
    }
    useEffect(() => {
        setCurrentPage(1)
        setCardsData(old => ({...old, results: []}))
        const token = JSON.parse(window.localStorage.getItem("token"))
        const header = {
            headers: {
                Authorization: `Token ${token}`
            }
        }
        fetch({
            "Публикации": uku + endpoints.profileFeed,
            "Лента": uku + endpoints.feed,
            "Избранное": uku + endpoints.favorites,
            "Объявления": uku + endpoints.publicationSearch
        }[title] + `?page=${currentPage}`, token ? header : null).then(res => res.json()
            .then(data => {
                setCardsData(old => ({...old, results: [...old.results, ...data.results], next: data.next}))
            }))
        setCurrentPage(1)
    }, [title])

    useEffect(() => {
        let options = {root: null, rootMargin: '20px', threshold: 1.0}
        const observer = new IntersectionObserver(handleObserver, options)
        loader.current && observer.observe(loader.current)
    }, [])


    useEffect(() => {
        const token = JSON.parse(window.localStorage.getItem("token"))
        const header = {
            headers: {
                Authorization: `Token ${token}`
            }
        }
        fetch({
            "Объявления": uku + endpoints.publicationSearch,
            "Лента": uku + endpoints.feed,
            "Избранное": uku + endpoints.favorites,
            "Публикации": uku + endpoints.profileFeed
        }[title] + `?page=${currentPage}`, token ? header : null).then(res => res.json()
            .then(data => {
                if (data.next) {
                    setCardsData(old => ({...old, results: [...old.results, ...data.results], next: data.next}))
                }
            }))
    }, [currentPage])

    return (
        <div className={classNames("container", styles.title)}>
            <div className={title === "Публикации" ? styles.profilePage : null}>
                <h1>{title}</h1>
                {/*{title === "Публикации" ? <button>Подписаться</button> : null}*/}
            </div>
            <div className={classNames(styles.feed, "container")}>
                {cardsData.results.length === 0 ? <div className={styles.placeholder}/> : null}
                <Card width={
                    {
                        "Избранное": "368px",
                        "Лента": "368px",
                        "Объявления": "300px",
                        "Публикации": "300px"
                    }[title]}
                      data={cardsData}
                />
            </div>
            <div className={"observer"} ref={loader}/>
        </div>

    )
}

export default Feed;