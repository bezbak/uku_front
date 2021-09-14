import styles from './styles.module.scss'
import {useRouter} from "next/router";

const PhoneChangeModal = ({modal}) => {
  const router = useRouter()

  return (
    <div className={modal ? styles.modal : "hide"}>
      <div className={styles.modalContent}>
        <img src='/icons/check.svg' alt=""/>
        <h2>Номер изменен</h2>
        <div className={styles.btnBlock}>
          <button onClick={() => router.push("/")}>На главную</button>
        </div>
      </div>
    </div>
  )
}

export default PhoneChangeModal;