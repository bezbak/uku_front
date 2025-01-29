import React, {useState} from 'react';
import PhoneChangeModal from "../NewNumber/PhoneChangeModal";
import styles from "../ConfirmReset/styles.module.scss";
import Spinner from "../../Spinner/Spinner";

const ConfirmNewPhone = () => {
  const [modalSuccess, setModalSuccess] = useState(false)

  return (
    <div>
      <div className={styles.confirm}>
        <h3>Подтверждение кода</h3>
        <p>Код был отправлен на номер</p>
        <span className={styles.phone}>
        {/*{"+" + String(number && number.match(/.{1,3}/g)).split(",").join(" ")}*/}
      </span>
        <input
          // onChange={({target: {value}}) => setCode(value)}
          type="text"
          className={styles.confirmInp}
          placeholder={"Код"}
        />
        <button
          // disabled={!code || loading}
          // onClick={() => confirmCode(code)}
          className={styles.confirmBtn}>
          {/*{loading ? <Spinner/> : "Подтвердить"}*/}
        </button>
        <div className={styles.resend}>
          <p>Не пришло SMS сообщение?</p>
          <button
            // onClick={resendCode}
            // disabled={time || loading}
          >
            {/*{time ?*/}
            {/*  <div>Переотправить через <span>{time}</span></div> : loading ? <Spinner/> : "Переотправить"}*/}
          </button>
        </div>
      </div>
      <PhoneChangeModal
        modal={modalSuccess}
        setModal={setModalSuccess}
      />
    </div>
  )
}

export default ConfirmNewPhone;