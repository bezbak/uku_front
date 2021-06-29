import React from "react";
import NavLink from "../../NavLink";
import TelegramIcon from '../../../public/icons/telegram.svg'
import WhatsAppIcon from '../../../public/icons/whatsApp.svg'
import InstagramIcon from '../../../public/icons/instagram.svg'
import UserProfileEdit from '../../../public/icons/userProfileEdit.svg'
import styles from './styles.module.scss';
import Button from "../../Button";

const Profile = ({user}) => {
  return(
    <div className={styles.profile}>
      <div className={styles.profile__avatar}>
          <img src={user.avatar}/>
        {!user && <Button className={styles.profile__userProfileEdit}>
          <UserProfileEdit/>
        </Button>}
      </div>
      <div className={styles.profile__info}>
        <div className={styles.profile__info_fio}>
          <span>{user.first_name} {user.last_name}</span>
        </div>
        {user && <div className={styles.profile__info_age}>
          <span>Женщина</span>
          <span>23 года</span>
        </div>}
        {user &&  <div className={styles.profile__info_phone}>
          <span>Тел:</span>
          <span>{user.phone}</span>
        </div>}
      </div>
      <div className={styles.profile__appInfo}>
        <div  className={styles.profile__appInfo_wrap}>
          <span className={styles.profile__appInfo_wrap__list}>
            Подписчики
          </span>
          <span className={styles.profile__appInfo_wrap__list_cout}>
            {user.followers_count}
          </span>
        </div>
        <div className={styles.profile__appInfo_wrap}>
          <span className={styles.profile__appInfo_wrap__list}>
            Подписки
          </span>
          <span  className={styles.profile__appInfo_wrap__list_cout}>
           {user.following_count}
          </span>
        </div>
        <div className={styles.profile__appInfo_wrap}>
          <span className={styles.profile__appInfo_wrap__list}>
            Публикации
          </span>
          <span className={styles.profile__appInfo_wrap__list_cout}>
            {user.publications_count}
          </span>
        </div>

      </div>
      <div className={styles.profile__socialContact}>
        <a href={`https://telegram.me/${user?.telegram}`} target="_blank">
          <TelegramIcon/>
        </a>
        <a href={`https://wa.me/${user.whatsapp}`} target="_blank">
          <WhatsAppIcon/>
        </a>
        <a href={`https://www.instagram.com/${user.instagram}`} target="_blank">
          <InstagramIcon/>
      </a>
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