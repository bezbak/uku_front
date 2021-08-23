import Link from "next/link";
import uku from '/adapters/HTTP_Agent'
import {endpoints} from "../../../api/endpoints";
import styles from './styles.module.scss'
import {useEffect, useState} from "react";
import {getProfileInfo} from "../../Profile/getProfileInfo";


const Profile = ({state}) => {

    const [avatar, setAvatar] = useState("")
    const [id, setId] = useState(null)

    useEffect(() => {
        fetch(uku + endpoints.userAvatar, {
            method: "GET",
            headers: {
                "Authorization": `Token ${typeof window !== "undefined" && "undefined" && JSON.parse(window.localStorage.getItem("token"))}`
            }
        }).then(res => res.json().then(data => {
            setAvatar(data && data.avatar)
        }))
    }, [])

    useEffect(async () => {
        const data = await getProfileInfo()
        setId(data.id)
    }, [])


    return {
        authorized:
            <Link href={`/profile/${id}`}>
                <div className={styles.profile}>
                    <img width={"24px"} height={"24px"} style={{borderRadius: "50%"}}
                         src={avatar ? avatar : "/icons/no_avatar.png"} alt=""/>
                    <span>Профиль</span>
                </div>
            </Link>,
        nonAuthorized:
            <Link href={"/login"}>
                <div className={styles.profileAvatar}>
                    <img width={"24px"} height={"24px"}
                         style={{borderRadius: "50%"}}
                         src="/icons/no_avatar.png" alt=""/>
                    <p>Войти</p>
                </div>
            </Link>
    }[state]
}

export default Profile;