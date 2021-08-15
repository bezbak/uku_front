import styles from './styles.module.scss'
import uku from '/adapters/HTTP_Agent'
import {endpoints} from "../../../api/endpoints";
import Link from "next/link";
import {toast} from "react-toastify";
import {useRecoilState} from "recoil";
import {cards, page} from "../state";
import {useEffect, useState} from "react";


const fetchFollow = id => fetch(uku + endpoints.followID + id, {
    method: 'GET',
    headers: {
        Authorization: `Token ${JSON.parse(window.localStorage.getItem("token"))}`,
        "Content-Type": "application/json"
    }
})

const CardHead = ({user}) => {

    const onClickFollow = id => {
        fetchFollow(id).then(response => {
            if (response.status === 401) {
                toast.error("Требуется авторизация")
            }
            if (response.status === 200) {
                // TODO сделать логику подписки
            }
        })
    }
    return (
        <div className={styles.cardHead}>
            <div className={styles.cardName}>
                <img src={user.avatar} alt=""/>
                <div>
                    <p>{user.last_name.length > 10 ? user.last_name.slice(0, 10) + "..." : user.last_name} {user.first_name.length > 10 ? user.first_name.slice(0, 10) + "..." : user.first_name}</p>
                    <span>{user.location}</span>
                </div>
            </div>
            {user.following && <p
                className={styles.unSub}
                onClick={() => onClickFollow(user.id)}>Отписаться</p>}
            {!user.following && <p
                onClick={() => onClickFollow(user.id)}>Подписаться</p>}

        </div>
    )

}

export default CardHead;