import React from 'react';
import styles from "./styles.module.scss";

const ProfileInfo = ({profile}) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default ProfileInfo;