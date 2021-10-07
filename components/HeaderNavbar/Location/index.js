import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss'

const Location = ({modal, setModal, locationAtom}) => {
  const [location, setLocation] = useState({})

  console.log(locationAtom)

  useEffect(() => {
    const locationData = JSON.parse(window.localStorage.getItem("authData"))
    setLocation(locationData)
  }, [])

  return (
    <div onClick={() => setModal(!modal)} className={styles.location}>
      <img
        src="/icons/locationIcon.png"
        alt=""/>
      <span>{locationAtom?.region?.name ?? location?.region_detail?.name ?? "Выбор"}</span>
    </div>
  )
}

export default Location;