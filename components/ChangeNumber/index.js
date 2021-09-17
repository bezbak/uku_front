import React from 'react';
import {useRecoilState} from "recoil";
import {changeNumberAtom, newPhoneAtom} from "./state";
import {useRouter} from "next/router";
import styles from './styles.module.scss'
import ConfirmReset from "./ConfirmReset";
import NewNumber from "./NewNumber/NewNumber";
import ConfirmNewPhone from "./ConfirmNewPhone";

const ResetPassword = () => {
  const [changeNumberState] = useRecoilState(changeNumberAtom)
  const router = useRouter()
  const [phone, setPhone] = useRecoilState(newPhoneAtom)
  const {number} = router.query

  return (
    <div className={styles.reset}>
      <img src="/images/loginImage.jpg" alt=""/>
      {
        {
          confirm: <ConfirmReset number={number}/>,
          newNumber: <NewNumber/>,
          confirmNewPhone: <ConfirmReset number={phone}/>
        }[changeNumberState]
      }

    </div>
  )
}

export default ResetPassword;