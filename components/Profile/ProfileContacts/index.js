import React, {useState} from 'react';
import styles from "../../MyProfile/styles.module.scss";
import cs from 'classnames'
import {toast} from "react-toastify";

const ProfileContacts = ({profile}) => {
  const [modal, setModal] = useState(false)

  const onClickAvatar = () => {
    if (!profile.avatar) {
      toast.info("Пользователь не загрузил фото профиля")
      return
    }
    setModal(!modal)
  }

  const modalClass = cs({
    [styles.modalAvatar]: modal,
    "hide": !modal
  })

  return (
    <div>
      <div>
        <img onClick={onClickAvatar} width={"140px"} height={"140px"} style={{borderRadius: "50%", objectFit: "coverD"}}
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
      <div className={modalClass}>
        <div onClick={onClickAvatar} className={styles.close}>&times;</div>
        <img src={profile.avatar ? profile.avatar : ""} alt=""/>
      </div>
    </div>
  )
}

export default ProfileContacts;