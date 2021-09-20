import React, {useState} from 'react';
import styles from "./styles.module.scss";
import Spinner from "../../Spinner/Spinner";
import PhoneInput from "react-phone-input-2";
import {changePhoneNumber} from "./functions";
import {useRouter} from "next/router";
import PhoneChangeModal from "./PhoneChangeModal";
import {useRecoilState} from "recoil";
import {resetPasswordAtom} from "../state";
import {toast} from "react-toastify";

const NewNumber = () => {
  const [loading, setLoading] = React.useState(false)
  const [phone, setPhone] = React.useState("")
  const [resetPasswordState, setResetPasswordState] = useRecoilState(resetPasswordAtom)
  const router = useRouter()

  const onClickChangePhoneNumber = (setLoading, phone) => {
    changePhoneNumber(setLoading, phone).then(res => {
      console.log(res)
      if (res === "Сообщение отправлено") {
        toast.success(res)
        setResetPasswordState("confirmNewPhone")
      }
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <div className={styles.confirm}>
      <div className={styles.cancel}>
        <h3>Введите новый номер</h3>
        <span onClick={() => router.back()}>Отмена</span>
      </div>
      <PhoneInput
        country={'kg'}
        value={phone}
        inputClass={styles.phoneInput}
        inputProps={{
          required: true,
          name: "phone",
          autoFocus: true,
          maxLength: 16
        }}
        onChange={num => setPhone(num)}
      />
      <button
        disabled={loading || phone.length < 12}
        onClick={() => onClickChangePhoneNumber(setLoading, phone)}
        className={styles.confirmBtn}>
        {loading ? <Spinner/> : "Сменить номер"}
      </button>
    </div>
  )
}

export default NewNumber;