import React from 'react';
import styles from './styles.module.scss'
import Link from "next/link";
import {useRecoilState} from "recoil";
import {modalSuccessAtom} from "../ChangeNumber/state";
import {useRouter} from "next/router";

const ModalPhoneChanged = () => {
  const router = useRouter()
  const [modalSuccess, setModalSuccess] = useRecoilState(modalSuccessAtom)

  const onClickBackToMain = () => {
    setModalSuccess(false)
    router.push("/")
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <img className={styles.checked} src="/icons/check.svg" alt=""/>
        <h2>Номер изменен</h2>
        <button onClick={onClickBackToMain}>На главную</button>
      </div>
    </div>
  )
}

export default ModalPhoneChanged;