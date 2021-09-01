import styles from './styles.module.scss'
import uku from '/util/HTTP_Agent'
import {endpoints} from "../../../api/endpoints";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {cards} from "../state";
import Link from "next/link";

const fetchFollow = id => fetch(uku + endpoints.followID + id, {
  method: 'GET',
  headers: {
    Authorization: `Token ${JSON.parse(window.localStorage.getItem("token"))}`,
    "Content-Type": "application/json"
  }
})

const CardHead = ({user}) => {
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


  return (
    <div className={styles.cardHead}>
      <Link href={`/profile/${user && user.id}`}>
        <div className={styles.cardName}>
          <img src={user?.avatar} alt=""/>
          <div>
            <p>{user && user?.last_name?.length > 10 ?
              user.last_name.slice(0, 10) + "..." : user?.last_name + " "}
              {user?.first_name.length > 10 ? user?.first_name.slice(0, 10) + "..." : user?.first_name}</p>
            <span>{user?.location}</span>
          </div>
        </div>
      </Link>
      <p
        className={false ? "" : styles.unSub}>
        {false ? "Подписаться" : "Вы подписаны"}
      </p>

    </div>
  )

}

export default CardHead;