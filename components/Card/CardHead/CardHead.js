import styles from './styles.module.scss'
import uku from '/adapters/HTTP_Agent'
import {endpoints} from "../../../api/endpoints";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {cards} from "../state";

const fetchFollow = id => fetch(uku + endpoints.followID + id, {
    method: 'GET',
    headers: {
        Authorization: `Token ${JSON.parse(window.localStorage.getItem("token"))}`,
        "Content-Type": "application/json"
    }
})

const CardHead = ({user}) => {
    const [recoilState, setRecoilState] = useRecoilState(cards)
    const [userState, setUserState] = useState({
        avatar: "",
        first_name: "",
        following: null,
        id: null,
        last_name: "",
        location: ""
    })

    useEffect(() => {
        setUserState(user)
    }, [user])


    const onClickFollow = (id) => {
        fetchFollow(id).then(response => {
            if (response.status === 401) {
                toast.error("Требуется авторизация")
                return
            }
            response.json().then(data => {
                setRecoilState(old => {
                    let newObj = {...old}
                    newObj.results = newObj.results.map(item => {
                        if (item.user.id === id) {
                            return {...item, user: {...item.user, following: !item.user.following}}
                        }
                        return item
                    })
                    return newObj
                })
            }).catch(e => {
                toast.error("Ошибка сервера")
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
                className={!userState?.following ? "" : styles.unSub}
                onClick={() => onClickFollow(user.id)}>{!userState?.following ? "Подписаться" : "Вы подписаны"}</p>

        </div>
    )

}

export default CardHead;