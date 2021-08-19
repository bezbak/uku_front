import styles from './styles.module.scss'
import uku from '/adapters/HTTP_Agent'
import {endpoints} from "../../../api/endpoints";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import {login} from "../../Login/state";


const fetchFollow = id => fetch(uku + endpoints.followID + id, {
    method: 'GET',
    headers: {
        Authorization: `Token ${JSON.parse(window.localStorage.getItem("token"))}`,
        "Content-Type": "application/json"
    }
})

const CardHead = ({user}) => {
    const [follow, setFollow] = useState(false)
    useEffect(() => {
        setFollow(user.following)
    }, [user.following])

    const onClickFollow = id => {
        fetchFollow(id).then(response => {
            if (response.status === 401) {
                toast.error("Требуется авторизация")
                return
            }
            response.json().then(data => {
                if (data.message === "Вы подписались") {
                    setFollow(true)
                }
                if (data.message === "Вы отписались") {
                    setFollow(false)
                }

            })
        })
    }
    return (
        <div className={styles.cardHead}>
            <div className={styles.cardName}>
                <img src={user?.avatar} alt=""/>
                <div>
                    <p>{user?.last_name?.length > 10 ?
                        user.last_name.slice(0, 10) + "..." : user?.last_name + " "}
                        {user?.first_name.length > 10 ? user?.first_name.slice(0, 10) + "..." : user?.first_name}</p>
                    <span>{user?.location}</span>
                </div>
            </div>
            <p
                className={follow ? "" : styles.unSub}
                onClick={() => onClickFollow(user.id)}>{follow ? "Подписаться" : "Отписаться"}</p>

        </div>
    )

}

export default CardHead;