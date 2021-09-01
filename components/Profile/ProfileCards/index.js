import React, {useEffect, useState} from 'react';
import {getProfileCards} from "./functions";
import Card from "../../Card";
import styles from './styles.module.scss'
import classNames from "classnames";

const ProfileCards = () => {

  const [profileCards, setProfileCards] = useState(null)

  useEffect(() => {
    const id = window.location.pathname.split("/").pop()
    getProfileCards(id, 1).then(data => setProfileCards(data))
  }, [window.location.pathname.split("/").pop()])

  if (!profileCards) return <div>...</div>

  return (
    <div className={'container'}>
      <div className={classNames(styles.profileFeedTitle)}>
        <h1>Публикации</h1>
        <button>Подписаться</button>
      </div>
      <div className={styles.profileFeed}>
        <Card
          cards={profileCards.results}
          width={"280px"}/>
      </div>
    </div>

  )
}

export default ProfileCards;