import React from 'react';
import styles from "../ModalDeletePublication/ModalDeletePublication.module.scss";
import {useRouter} from "next/router";
import Spinner from "../Spinner/Spinner";

const Alert = ({modal, setModal, onConfirmChangePhone, phoneNumber, loading, setLoading}) => {
  const router = useRouter()

  return (
    <div className={modal ? styles.modal : "hide"}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={() => setModal(false)}>&times;</span>
        <h2>Вы действительно хотите сменить номер?</h2>
        <div className={styles.btnBlock}>
          <button disabled={loading} className={styles.delete}
                  onClick={() => onConfirmChangePhone(phoneNumber, router, setLoading)}>{loading ?
            <Spinner/> : "Сменить"}
          </button>
          <button className={styles.cancel} onClick={() => setModal(false)}>Отмена</button>
        </div>
      </div>
    </div>
  )
}

export default Alert;