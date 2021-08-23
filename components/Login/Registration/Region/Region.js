import Modal from "../../../Modal/Modal";
import styles from './styles.module.scss'
import {modalState} from "../../../UI/modalState";
import {useRecoilState} from "recoil";
import {registrationForm} from "../../state";


const Region = ({form, modal, setModal}) => {


    return <div className={styles.region}>
        <input
            placeholder={"Выбор региона"}
            onClick={() => setModal(!modal)}
            type="text"
            value={form.region.name}
            readOnly={true}
        />
        <Modal
            type={"region"}/>
    </div>
}

export default Region;