import styles from './styles.module.scss'
import {useEffect, useState} from "react";
import uku from '../../../util/HTTP_Agent'
import {endpoints} from "../../../api/endpoints";
import {useRouter} from "next/router";

const SearchBar = () => {
  const router = useRouter()
  const [text, setText] = useState("")
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(uku + endpoints.searchUser + `?q=${text}`)
      .then(res => res.json().then(data => {
        setData(data)
      }))
  }, [text])

  function onClickUser(id) {
    router.push(`/profile/${id}`)
    setTimeout(() => {
      setText("")
    }, 200)
  }

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBarContent}>
        <input
          onChange={({target: {value}}) => setText(value)}
          type="text"
          value={text}
          width={200}/>
        <div className={text && data.length !== 0 ? styles.dropDown : styles.hide}>
          {data.map((item) => {
            return <div
              onClick={() => onClickUser(item.id)}
              key={item.id}
              className={styles.profile}>
              <div>
                <img src={item.avatar || "/images/noAvatar.png"} alt=""/>
              </div>
              <div className={styles.fio}>
                <p>{item.last_name} {item.first_name}</p>
              </div>
            </div>
          })}
        </div>
        <div
          onClick={() => setText("")}
          className={text ? styles.clear : styles.hide}>&times;</div>
      </div>

    </div>
  )
}

export default SearchBar;