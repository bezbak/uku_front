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

const CardHead = ({user, setRecoilState}) => {
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


  const onClickSub = id => {
    console.log(user)
    fetchFollow(id).then(res => {
      if (res.status === 401) {
        toast.error("Требуется авторизация")
        return
      }
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
    })
  }

  return (
    <div className={styles.cardHead}>
      <Link href={`/profile/${user && user.id}`}>
        <div className={styles.cardName}>
          <img src={user.avatar ? user?.avatar : null} alt=""/>
          <div>
            <p>{user && user?.last_name?.length > 10 ?
              user.last_name.slice(0, 10) + "..." : user?.last_name + " "}
              {user?.first_name.length > 10 ? user?.first_name.slice(0, 10) + "..." : user?.first_name}</p>
            <span>{user?.location}</span>
          </div>
        </div>
      </Link>
      <p
        onClick={() => onClickSub(user.id)}
        className={userState.following ? styles.unSub : ""}>
        {userState.following ? "Вы подписаны" : "Подписаться"}
      </p>

    </div>
  )

}

export default CardHead;