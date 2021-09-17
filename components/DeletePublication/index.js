import React from 'react';
import styles from "../ModalDelete/ModalDelete.module.scss";

const DeletaPublication = ({modal, setModal, id}) => {

  const deletePublcation = id => {
      // function to delete publication
  }

  return (
    <div className={modal ? styles.modal : "hide"}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={() => setModal(false)}>&times;</span>
        <h2>Вы действительно хотите удалить обьявление?</h2>
        <div className={styles.btnBlock}>
          <button className={styles.delete} onClick={() => deletePublcation(id)}>Удалить</button>
          <button className={styles.cancel} onClick={() => setModal(false)}>Отмена</button>
        </div>
      </div>
    </div>
  )
}

export default DeletaPublication;