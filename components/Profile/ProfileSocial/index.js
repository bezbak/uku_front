import React from 'react';
import styles from "../../MyProfile/styles.module.scss";

const ProfileSocial = ({profile}) => {
  return (
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
  )
}

export default ProfileSocial;