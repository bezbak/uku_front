import React from 'react';
import styles from "../../ModalDeletePublication/ModalDeletePublication.module.scss";
import uku from "../../../util/HTTP_Agent";
import {toast} from "react-toastify";
import Spinner from "../../Spinner/Spinner";

const ModalDeleteCard = ({state, id, setState}) => {

  const onClickCardDelete = (id) => {
    const token = JSON.parse(window.localStorage.getItem("token"))
    const deleteMethod = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
    setState(old => ({...old, loading: true}))
    fetch(uku + `/publication/delete/${id}/`, deleteMethod)
      .then(res => {
        if (res.ok === true) {
          setState(old => ({...old, modalDelete: !old.modalDelete}))
          toast.success('Успешно удалено')
        } else {
          toast.error('Что-то пошло не так...')
        }
      })
      .catch(err => toast.error('Что-то пошло не так...'))
      .finally(() => {
        setState({modalState: false, loading: false})
        window.location.reload()
      })
  }

  return (
    <div className={state.modalDelete ? styles.modal : "hide"}>
      <div className={styles.modalContent}>
        <span onClick={() => setState(old => ({...old, modalDelete: !old.modalDelete}))}
              className={styles.close}>&times;</span>
        <h2>Вы действительно хотите удалить обьявление?</h2>
        <div className={styles.btnBlock}>
          <button className={styles.delete} onClick={() => onClickCardDelete(id)}>{state.loading ?
            <Spinner/> : "Удалить"}</button>
          <button className={styles.cancel}
                  onClick={() => setState(old => ({...old, modalDelete: !old.modalDelete}))}>Отмена
          </button>
        </div>
      </div>
    </div>
  )
}
export default ModalDeleteCard;