import React from 'react';
import styles from './style.module.scss'
import {useRecoilState} from "recoil";
import {modalStateFlag} from "../Detail/state";
import uku from "../../util/HTTP_Agent";
import {toast} from "react-toastify";

const ModalDeleteImages = () => {
    const [modal, setModal] = useRecoilState(modalStateFlag)
    const modalHandler = (key, flag) => {
        setModal(old=> ({...old, [key]: flag}))
    }

    const deleteFunction = () => {
        const token = JSON.parse(window.localStorage.getItem("token"))
        const deleteMethod = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        }
        fetch(uku + `/publication/image/delete/${modal.imageId}`,deleteMethod)
            .then(res => {
                if(res.ok === true){
                    modalHandler("deleteImageModal", false)
                    toast.success('Успешно удалено')
                }else{
                    toast.error('Что-то пошло не так...')
                }
            })
            .catch(err => toast.error('Что-то пошло не так...'))
    }
    return (
        <div className={modal.deleteImageModal ? styles.modal : "hide"}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={() => modalHandler("deleteImageModal", false)}>&times;</span>
                <h2>Вы действительно хотите удалить фотографию?</h2>
                <div className={styles.btnBlock}>
                    <button className={styles.delete}  onClick={() => deleteFunction()}>Удалить</button>
                    <button className={styles.cancel}  onClick={() => modalHandler('deleteImageModal',false)}>Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default ModalDeleteImages;