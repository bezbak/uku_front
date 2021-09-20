import React from 'react';
import styles from "../../ModalDelete/ModalDelete.module.scss";
import uku from "../../../util/HTTP_Agent";
import {toast} from "react-toastify";

const ModalDeleteCard = ({modalState, id, setState}) => {

  const onClickCardDelete = (id) => {
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
          setState(old => ({...old, modalDelete: !old.modalDelete}))
          toast.success('Успешно удалено')
        } else {
          toast.error('Что-то пошло не так...')
        }
      })
      .catch(err => toast.error('Что-то пошло не так...'))
  }

  return (
    <div className={modalState ? styles.modal : "hide"}>
      <div className={styles.modalContent}>
        <span className={styles.close}>&times;</span>
        <h2>Вы действительно хотите удалить обьявление?</h2>
        <div className={styles.btnBlock}>
          <button className={styles.delete} onClick={() => onClickCardDelete(id)}>Удалить</button>
          <button className={styles.cancel}>Отмена</button>
        </div>
      </div>
    </div>
  )
}
export default ModalDeleteCard;