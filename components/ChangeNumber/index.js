import React from 'react';
import {useRecoilState} from "recoil";
import {changeNumberAtom, modalSuccessAtom, newPhoneAtom} from "./state";
import {useRouter} from "next/router";
import styles from './styles.module.scss'
import ConfirmReset from "./ConfirmReset";
import NewNumber from "./NewNumber/NewNumber";
import ConfirmNewPhone from "./ConfirmNewPhone";
import ModalPhoneChanged from "../ModalPhoneChanged";

const ResetPassword = () => {
  const [changeNumberState] = useRecoilState(changeNumberAtom)
  const [modalSuccess] = useRecoilState(modalSuccessAtom)
  const [phone] = useRecoilState(newPhoneAtom)
  const router = useRouter()
  const {number} = router.query

  return (
    <div className={styles.reset}>
      <img src="/images/loginImage.jpg" alt=""/>
      {
        {
          confirm: <ConfirmReset number={number} isOld={true}/>,
          newNumber: <NewNumber/>,
          confirmNewPhone: <ConfirmReset number={phone} isOld={false}/>
        }[changeNumberState]
      }
      {modalSuccess ? <ModalPhoneChanged/> : null}

    </div>
  )
}

export default ResetPassword;