import React, {useState} from 'react';
import styles from "./styles.module.scss";
import Spinner from "../../Spinner/Spinner";
import PhoneInput from "react-phone-input-2";
import {changePhoneNumber} from "./functions";
import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import {changeNumberAtom, newPhoneAtom} from "../state";
import {toast} from "react-toastify";

const NewNumber = () => {
  const [loading, setLoading] = React.useState(false)
  const [phone, setPhone] = useRecoilState(newPhoneAtom)
  const [changeNumberState, setChangeNumberState] = useRecoilState(changeNumberAtom)
  const router = useRouter()

  const onClickChangePhoneNumber = (setLoading, phone) => {
    changePhoneNumber(setLoading, phone).then(res => {
      if (res.message === "Сообщение отправлено") {
        toast.success(res)
        setChangeNumberState("confirmNewPhone")
      }
      toast.info(res.message)
    }).catch(err => {
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