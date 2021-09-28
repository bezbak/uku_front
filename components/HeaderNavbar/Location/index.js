import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss'
import {useRecoilState} from "recoil";
import {modalAtom} from "../../Search/state";
import {locationAtom} from "./state";

const Location = () => {
  const [modal, setModal] = useRecoilState(modalAtom)
  const [location] = useRecoilState(locationAtom)

  return (
    <div onClick={() => setModal(!modal)} className={styles.location}>
      <img
        src="/icons/locationIcon.png"
        alt=""/>
      <span>{location.name}</span>
    </div>
  )
}

export default Location;