import styles from './styles.module.scss'
import {useState} from "react";
import uku from '../../../util/HTTP_Agent'
import {endpoints} from "../../../api/endpoints";
import {useRouter} from "next/router";

const SearchBar = () => {
    const router = useRouter()
    const [text, setText] = useState("")
    const [data, setData] = useState([])

    const onChangeInput = value => {
        setText(value)
        fetch(uku + endpoints.searchUser + `?q=${text}`)
            .then(res => res.json().then(data => {
                setData(data)
                console.log(data)
            }))
    }

    return (
        <div className={styles.searchBar}>
            <div className={styles.searchBarContent}>
                <input
                    onChange={({target: {value}}) => onChangeInput(value)}
                    type="text"
                    width={200}/>
                <div className={text && data.length !== 0 ? styles.dropDown : styles.hide}>
                    {data.map((item) => {
                        return <div
                            onClick={() => router.push(`/profile/${item.id}`)}
                            key={item.id}
                            className={styles.profile}>
                            <div>
                                <img src={item.avatar || "/images/noAvatar.png"} alt=""/>
                            </div>
                            <div className={styles.fio}>
                                <p>{item.last_name}</p>
                                <span>{item.first_name}</span>
                            </div>
                        </div>
                    })}

                </div>
            </div>

        </div>
    )
}

export default SearchBar;