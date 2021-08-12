import styles from './styles.module.scss'
import RegionMenu from "../Login/Registration/Region/RegionMenu";
import useSWR from "swr";
import uku from "../../adapters/HTTP_Agent";
import {endpoints} from "../../api/endpoints";
import fetcher from "../../adapters/getFetcher";
import {toast} from "react-toastify";
import {login} from "../Login/state";
import {useRecoilState} from "recoil";
import {modalState} from "../UI/modalState";
import {useState} from "react";


const Modal = ({type}) => {

    const [modal, setModal] = useRecoilState(modalState)
    const {data, error} = useSWR(uku + endpoints.location, fetcher)


    switch (type) {
        case "region":
            return <div className={modal ? styles.modal : "hide"}>
                <div className={styles.modalContent}>
                    <span className={styles.close} onClick={() => setModal(!modal)}>&times;</span>
                    <h2>Выберите регион</h2>
                    <div className={styles.regions}>
                        <div className={styles.region}>
                            <RegionMenu
                                items={data}
                                setModal={setModal}
                                modal={modal}/>
                        </div>
                    </div>
                </div>
            </div>
        case "profilePicture":
            return <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => setModal(!modal)}>&times;</span>
                    <p>Some text in the Modal..</p>
                </div>
            </div>
        default:
            return <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => setModal(!modal)}>&times;</span>
                    <p>Some text in the Modal..</p>
                </div>
            </div>
    }
}

export default Modal;