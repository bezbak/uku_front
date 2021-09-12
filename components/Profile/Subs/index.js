import React from 'react';
import styles from "../../MyProfile/styles.module.scss";

const Subs = ({profile}) => {
  return (
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
  )
}

export default Subs;