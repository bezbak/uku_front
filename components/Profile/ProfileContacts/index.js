import React from 'react';
import styles from "../../MyProfile/styles.module.scss";

const ProfileContacts = ({profile}) => {
  return (
    <div>
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
    </div>
  )
}

export default ProfileContacts;