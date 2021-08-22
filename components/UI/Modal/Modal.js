import React from 'react';
import styles from './styles.module.scss'
import LocationPicker from "../LocationPicker/LocationPicker";


const Modal = ({title, modal, setModal}) => {
    return (
        <div className={modal ? styles.modal : "hide"}>
            <div className={styles.modalContent}>
                <span>{title}</span>
                <span className={styles.close} onClick={() => setModal(old => !old)}>&times;</span>
                <LocationPicker/>
            </div>
        </div>
    )
}

export default Modal;