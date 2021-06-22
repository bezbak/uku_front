import React from "react";
import NavLink from "../NavLink";
import TelegramIcon from '../../public/icons/telegram.svg'
import WhatsAppIcon from '../../public/icons/whatsApp.svg'
import InstagramIcon from '../../public/icons/instagram.svg'
import UserProfileEdit from '../../public/icons/userProfileEdit.svg'
import styles from './styles.module.scss';
import Button from "../Button";

const Profile = ({user=false}) => {
  return(
    <div className={styles.profile}>
      <div className={styles.profile__avatar}>
          <img src="icons/whatsApp.png"/>
        {!user && <Button className={styles.profile__userProfileEdit}>
          <UserProfileEdit/>
        </Button>}
      </div>
      <div className={styles.profile__info}>
        <div className={styles.profile__info_fio}>
          <span>Фывова Александра</span>
        </div>
        {user && <div className={styles.profile__info_age}>
          <span>Женщина</span>
          <span>23 года</span>
        </div>}
        {user &&  <div className={styles.profile__info_phone}>
          <span>Тел:</span>
          <span>+996 (700) 12 34 56</span>
        </div>}
      </div>
      <div className={styles.profile__appInfo}>
        <div  className={styles.profile__appInfo_wrap}>
          <span className={styles.profile__appInfo_wrap__list}>
            Подписчики
          </span>
          <span className={styles.profile__appInfo_wrap__list_cout}>
            40
          </span>
        </div>
        <div className={styles.profile__appInfo_wrap}>
          <span className={styles.profile__appInfo_wrap__list}>
            Подписки
          </span>
          <span  className={styles.profile__appInfo_wrap__list_cout}>
            59
          </span>
        </div>
        <div className={styles.profile__appInfo_wrap}>
          <span className={styles.profile__appInfo_wrap__list}>
            Публикации
          </span>
          <span className={styles.profile__appInfo_wrap__list_cout}>
            43
          </span>
        </div>

      </div>
      <div className={styles.profile__socialContact}>
        <NavLink>
          <TelegramIcon/>
        </NavLink>
        <NavLink>
          <WhatsAppIcon/>
        </NavLink>
        <NavLink>
          <InstagramIcon/>
      </NavLink>
        {!user && <Button className={styles.profile__editButton} textClassName={styles.profile__editButton__text}>
          Редактировать
        </Button>}
        {user && <Button className={styles.profile__editButton} textClassName={styles.profile__editButton__text}>
          Подписаться
        </Button>}
        {user && <Button className={styles.profile__editButton} textClassName={styles.profile__editButton__text}>
          Отписаться
        </Button>}
      </div>

    </div>
  )
}
export default Profile;