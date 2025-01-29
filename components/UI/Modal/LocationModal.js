import React, {useState, useEffect} from 'react';
import styles from './styles.module.scss'
import LocationPicker from "../LocationPicker/LocationPicker";
import {getLocations} from "../LocationPicker/getLocations";

const LocationModal = ({title, modal, setModal, setLocation}) => {
  const [items, setItem] = useState([])

  useEffect(() => {
    getLocations().then(data => {
      setItem(data)
    })
  }, [])

  return (
    <div className={modal ? styles.modal : styles.hide}>
      <div className={styles.modalContent}>
        <div className={styles.titleTimes}>
          <span>{title}</span>
          <span className={styles.close} onClick={() => setModal(old => !old)}>&times;</span>
        </div>
        <LocationPicker items={items} setLocation={setLocation} setModal={setModal}/>
      </div>
    </div>
  )
}

export default LocationModal;