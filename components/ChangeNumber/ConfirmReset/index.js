import React from 'react';
import styles from "./styles.module.scss";
import Spinner from "../../Spinner/Spinner";
import {useRecoilState} from "recoil";
import {changeNumberAtom} from "../state";
import {onConfirmCodeReset, onResendConfirmCode} from "./functions";
import {toast} from "react-toastify";

const ConfirmReset = ({number}) => {
  const [resetPasswordState, setResetPasswordState] = useRecoilState(changeNumberAtom)
  const [code, setCode] = React.useState('')
  const [time, setTime] = React.useState(60)
  const [loading, setLoading] = React.useState(false)

  const resendCode = () => {
    onResendConfirmCode(setLoading, setTime)
  }

  const confirmCode = code => {
    setLoading(true)

    onConfirmCodeReset(code).then(res => {
      res.json().then(data => {
        if (data.success) {
          toast.success(data.message)
          setResetPasswordState("newNumber")
        }
        if (res.status == 403) {
          toast.error(data.message)
        }
      })
    }).catch(e => {
    }).finally(() => {
      setLoading(false)
    })
  }

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(time - 1)
    }, 1000)
    if (time === 0) clearInterval(timer)

    return () => clearInterval(timer)
  }, [time])


  return (
    <div className={styles.confirm}>
      <h3>Подтверждение кода</h3>
      <p>Код был отправлен на номер</p>
      <span className={styles.phone}>
        {String(number).slice(0,4) + " " + String(number).slice(4)}
      </span>
      <input
        onChange={({target: {value}}) => setCode(value)}
        type="text"
        className={styles.confirmInp}
        placeholder={"Код"}
      />
      <button
        disabled={!code || loading}
        onClick={() => confirmCode(code)}
        className={styles.confirmBtn}>
        {loading ? <Spinner/> : "Подтвердить"}
      </button>
      <div className={styles.resend}>
        <p>Не пришло SMS сообщение?</p>
        <button
          onClick={resendCode}
          disabled={time || loading}
        >
          {time ?
            <div>Переотправить через <span>{time}</span></div> : loading ? <Spinner/> : "Переотправить"}
        </button>
      </div>
    </div>
  )
}

export default ConfirmReset;