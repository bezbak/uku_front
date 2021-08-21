import styles from './styles.module.scss'
import CardHead from "./CardHead/CardHead";
import CardSlider from "./CardSlider/CardSlider";
import CardBody from "./CardBody/CardBody";
import CardFooter from "./CardFooter/CardFooter";
import Link from "next/link";
import uku from '/adapters/HTTP_Agent'
import {endpoints} from "../../api/endpoints";
import {useRecoilState} from "recoil";
import {cards} from "./state";
import {toast} from "react-toastify";

const Card = ({width}) => {
    const [recoilState, setRecoilState] = useRecoilState(cards)


    const onClickFavourite = (id, index) => {
        if (!!!localStorage.getItem("token")) {
            toast.error("Требуется авторизация")
            return
        }
        setRecoilState(old => {
            const newObj = {...old}
            newObj.results[index].is_favorite = !newObj.results[index].is_favorite
            return newObj
        })
        fetch(uku + endpoints.favouriteID + id, {
            headers: {
                Authorization: `Token ${JSON.parse(window.localStorage.getItem("token"))}`
            }
        }).then(res => {
            res.json().then(data => {
                toast.info(data.message)
            })
        }).catch(e => {
            toast.error("Ошибка добавления в избранное")
        })
    }
    return (
        <>
            {
                recoilState && recoilState?.results?.map((item, index) => {
                    return <div
                        key={index}
                        className={styles.card}
                        style={{width: width}}>
                        <CardHead user={item.user}/>
                        <Link href={`/detail/${item.id}`}>
                            <div className={styles.content}>
                                <CardSlider images={item.images}/>
                                <CardBody categories={item.categories} description={item.description}/>
                                <CardFooter created_at={item.created_at} comment_count={item.comment_count}
                                            viewed={item.viewed}/>
                            </div>
                        </Link>
                        <img
                            onClick={() => onClickFavourite(item.id, index)}
                            className={styles.favorite}
                            src={item.is_favorite ? "/icons/isFavourite.png" : "/icons/heart.png"}
                            alt=""/>
                    </div>
                })
            }
        </>
    )
}

export default Card;