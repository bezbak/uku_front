import Modal from "../../../Modal/Modal";
import styles from './styles.module.scss'
import {modalState} from "../../../UI/modalState";
import {useRecoilState} from "recoil";

const Region = () => {

    const [modal, setModal] = useRecoilState(modalState)

    return <div className={styles.region}>
        <input
            placeholder={"Выбор региона"}
            onClick={() => setModal(!modal)}
            type="text"/>
        <Modal
            type={"region"}/>
    </div>
}

export default Region;