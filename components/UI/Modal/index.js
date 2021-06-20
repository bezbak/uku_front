import React, {useState} from "react";
import classNames from 'classnames'

import styles from  './styles.module.scss'

const Modal = ({modalOpen, className, children}) => {

  return (
    <div
      className={classNames(styles.modal, {[styles.modal_isOpen]:modalOpen})}
    >
      <div className={styles.modal__content}>
        {children}
      </div>
    </div>
  )
}

export default Modal;