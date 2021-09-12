import React from 'react';
import styles from './ModalDelete.module.scss'
import {useRecoilState} from "recoil";
import {modalDelete} from "../Detail/state";
import uku from "../../util/HTTP_Agent";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const ModalDelete = () => {
    const [modalState, setModalState] = useRecoilState(modalDelete)

    const modalHandler = (flag) => {
        setModalState(old=> ({...old, flag: flag}))
    }
    const router = useRouter()
    let id
    const deleteItemHandler = () => {
            id = window.location.href.split('/').pop()
            const token = JSON.parse(window.localStorage.getItem("token"))
            const deleteMethod = {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            }
            fetch(uku + `/publication/${id}/delete/`,deleteMethod)
                .then(res => {
                    console.log(res)
                    if(res.ok === true){
                        modalHandler(false)
                        toast.success('Успешно удалено')
                        router.push('/')
                    }else{
                        toast.error('Что-то пошло не так...')
                    }
                })
                .catch(err => toast.error('Что-то пошло не так...'))
    }
    return (
        <div className={modalState.flag ? styles.modal : "hide"}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={() => modalHandler(false)}>&times;</span>
                <h2>Вы действительно хотите удалить обьявление?</h2>
                <div className={styles.btnBlock}>
                    <button className={styles.delete}  onClick={() => deleteItemHandler()}>Удалить</button>
                    <button className={styles.cancel}  onClick={() => modalHandler(false)}>Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default ModalDelete;