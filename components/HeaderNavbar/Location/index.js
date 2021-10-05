import React from 'react';
import styles from './styles.module.scss'

const Location = ({modal, setModal}) => {
  return (
    <div onClick={() => setModal(!modal)} className={styles.location}>
      <img
        src="/icons/locationIcon.png"
        alt=""/>
      <span>Выбор</span>
    </div>
  )
}

export default Location;