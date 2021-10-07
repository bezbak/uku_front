import React from 'react';
import styles from './ModalDeletePublication.module.scss'
import {useRecoilState} from "recoil";
import {modalStateFlag} from "../Detail/state";
import uku from "../../util/HTTP_Agent";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const ModalDeletePublication = () => {
  const [modalState, setModalState] = useRecoilState(modalStateFlag)
  const modalHandler = (key, flag) => {
    setModalState(old => ({...old, [key]: flag}))
  }
  const router = useRouter()
  let id

  const deleteFunction = () => {
    id = window.location.href.split('/').pop()
    const token = JSON.parse(window.localStorage.getItem("token"))
    const deleteMethod = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
    fetch(uku + `/publication/${id}/delete/`, deleteMethod)
      .then(res => {
        console.log(res)
        if (res.ok === true) {
          modalHandler("deletePublicationModal", false)
          toast.success('Успешно удалено')
          router.back()
        } else {
          toast.error('Что-то пошло не так...')
        }
      })
      .catch(err => toast.error('Что-то пошло не так...'))
  }
  return (
    <div className={modalState.deletePublicationModal ? styles.modal : "hide"}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={() => modalHandler("deletePublicationModal", false)}>&times;</span>
        <h2>Вы действительно хотите удалить обьявление?</h2>
        <div className={styles.btnBlock}>
          <button className={styles.delete} onClick={() => deleteFunction()}>Удалить</button>
          <button className={styles.cancel} onClick={() => modalHandler('deletePublicationModal', false)}>Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeletePublication;