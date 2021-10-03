import Link from "next/link";
import styles from './styles.module.scss'
import {useEffect, useState} from "react";
import {getProfileInfo} from "../../MyProfile/getProfileInfo";
import {getAvatar} from "../../MyProfile/getAvatar";


const Profile = ({state}) => {

  const [avatar, setAvatar] = useState("")
  const [id, setId] = useState(null)


  useEffect(() => {
    getAvatar(setAvatar)
    getProfileInfo().then(data => {
      setId(data.id)
    })
  }, [])

  return {
    authorized:
      <Link href={`/myProfile`}>
        <div className={styles.profile}>
          <img width={"24px"} height={"24px"} style={{borderRadius: "50%", objectFit: "cover"}}
               src={avatar ? avatar : "/icons/no_avatar.png"} alt=""/>
          <span className={styles.profileLink} >Профиль</span>
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