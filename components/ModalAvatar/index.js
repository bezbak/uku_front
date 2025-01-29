import React from 'react';
import styles from './styles.module.scss'

const ModalAvatar = ({avatar, setModalAvatar}) => {
  return (
    <div className={styles.modal}>
      <img onClick={() => setModalAvatar(old => !old)} className={styles.closeAvatar} src="/icons/closeAvatar.svg"
           alt=""/>
      <div className={styles.modalContent}>
        <img src={avatar} alt=""/>
      </div>
    </div>
  )
}

export default ModalAvatar;