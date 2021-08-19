import Feed from "../../containers/feed";
import styles from './styles.module.scss'
import uku from '/adapters/HTTP_Agent'
import {endpoints} from "../../api/endpoints";
import {useEffect, useState} from "react";
import classNames from "classnames";
import {useRouter} from "next/router";


const Profile = () => {
    const router = useRouter()
    console.log(router)

    const [profile, setProfile] = useState("")

    useEffect(() => {
        fetch(uku + endpoints.userProfile, {
            method: "GET",
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("token"))}`
            }
        }).then(res => res.json().then(data => setProfile(data)))
    }, [])


    return (
        <div className={classNames(styles.profilePage, "container")}>
            <div className={styles.profileInfo}>
                <div>
                    <img width={"140px"} height={"140px"} style={{borderRadius: "50%"}}
                         src={profile.avatar ? profile.avatar : "/images/noAvatar.png"} alt=""/>
                </div>
                <div className={styles.fio}>
                    <p>{profile?.first_name} {profile?.last_name}</p>
                </div>
                <div className={styles.age}>
                    <p>{profile?.gender} Возраст: {profile?.age}</p>
                </div>
                <div className={styles.phone}>
                    <p>Тел: {profile?.phone}</p>
                </div>
                <div className={styles.subs}>
                    <div>
                        <span className={styles.title}>Подписчики</span>
                        <span>{profile?.followers_count}</span>
                    </div>
                    <div>
                        <span className={styles.title}>Подписки</span>
                        <span>{profile?.following_count}</span>
                    </div>
                    <div>
                        <span className={styles.title}>Публикации</span>
                        <span>{profile?.publications_count}</span>
                    </div>
                </div>
                <div className={styles.social}>
                    <a href={profile?.telegram} target={"_blank"}>
                        <img src="/icons/profileTelegram.png" alt=""/>
                    </a>
                    <a href={profile?.whatsapp} target={"_blank"}>
                        <img src="/icons/profileWhatsapp.png" alt=""/>
                    </a>
                    <a href={profile?.instagram} target={"_blank"}>
                        <img src="/icons/profileInstagram.png" alt=""/>
                    </a>
                </div>
            </div>
            <div>
                <Feed title={"Публикации"}/>
            </div>
        </div>
    )
}

export default Profile;