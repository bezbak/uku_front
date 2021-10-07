import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss'

const Location = ({modal, setModal}) => {
  const [location, setLocation] = useState({})

  useEffect(() => {
    const locationData = JSON.parse(window.localStorage.getItem("authData"))
    setLocation(locationData)
  }, [])

  return (
    <div onClick={() => setModal(!modal)} className={styles.location}>
      <img
        src="/icons/locationIcon.png"
        alt=""/>
      <span>{location?.region_detail?.name ?? "Выбор"}</span>
    </div>
  )
}

export default Location;