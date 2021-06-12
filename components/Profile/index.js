import React from "react";
import NavLink from "../NavLink";
import TelegramIcon from '../../public/icons/telegram 1.svg'
// import WhatsAppIcon from '../../public/icons/whatsApp.svg'
import InstagramIcon from '../../public/icons/instagram 1.svg'
import styles from './styles.module.scss';

const Profile = () => {
  return(
    <div className={styles.profile}>
      <div className={styles.profile__avatar}>
          <img src="icons/whatsApp.png"/>

      </div>
      <div className={styles.profile__info}>
        <div className={styles.profile__info_fio}>
          <span>Фывова Александра</span>
        </div>
        <div className={styles.profile__info_age}>
          <span>Женщина</span>
          <span>23 года</span>
        </div>
        <div className={styles.profile__info_phone}>
          <span>Тел:</span>
          <span>+996 (700) 12 34 56</span>
        </div>
      </div>
      <div className={styles.profile__appInfo}>
        <div  className={styles.profile__appInfo_wrap}>
          <span>
            Подписчики
          </span>
          <span>
            40
          </span>
        </div>
        <div className={styles.profile__appInfo_wrap}>
          <span>
            Подписки
          </span>
          <span>
            59
          </span>
        </div>
        <div className={styles.profile__appInfo_wrap}>
          <span>
            Публикации
          </span>
          <span>
            43
          </span>
        </div>

      </div>
      <div className={styles.profile__socialContact}>
        <NavLink>
          <TelegramIcon/>
        </NavLink>
        <NavLink>
          {/*<WhatsAppIcon/>*/}
        </NavLink>
        <NavLink>
          <InstagramIcon/>
      </NavLink>
      </div>
    </div>
  )
}
export default Profile;