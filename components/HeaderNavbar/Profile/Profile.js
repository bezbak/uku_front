import Link from "next/link";
import uku from '/adapters/HTTP_Agent'
import {endpoints} from "../../../api/endpoints";
import styles from './styles.module.scss'
import {useEffect, useState} from "react";


const Profile = ({state}) => {

    const [avatar, setAvatar] = useState("")

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


    return {
        authorized:
            <Link href={"/myProfile"}>
                <div className={styles.profile}>
                    <img src={avatar ? avatar : "/icons/no_avatar.png"} alt=""/>
                    <span>Профиль</span>
                </div>
            </Link>,
        nonAuthorized:
            <Link href={"/login"}>
                <div>
                    <img src="/icons/no_avatar.png" alt=""/>
                    <p>Войти</p>
                </div>
            </Link>
    }[state]
}

export default Profile;