import Modal from "../../../Modal/Modal";
import styles from './styles.module.scss'
import {useState} from "react";

const Region = () => {

    const [modal, setModal] = useState(false)

    return <div className={styles.region}>
        <input
            placeholder={"Выбор региона"}
            onClick={() => setModal(!modal)}
            type="text"/>
        <Modal
            modal={modal}
            setModal={setModal}
            type={"region"}/>
    </div>
}

export default Region;