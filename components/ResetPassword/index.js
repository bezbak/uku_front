import React from 'react';
import {useRecoilState} from "recoil";
import {resetPasswordAtom} from "./state";
import {useRouter} from "next/router";
import styles from './styles.module.scss'
import ConfirmReset from "./ConfirmReset";
import NewNumber from "./NewNumber/NewNumber";
import ConfirmNewPhone from "./ConfirmNewPhone";

const ResetPassword = () => {
  const [resetPasswordState] = useRecoilState(resetPasswordAtom)
  const router = useRouter()
  const {number} = router.query

  return (
    <div className={styles.reset}>
      <img src="/images/loginImage.jpg" alt=""/>
      {
        {
          confirm: <ConfirmReset number={number}/>,
          newNumber: <NewNumber/>,
          confirmNewPhone: <ConfirmNewPhone/>
        }[resetPasswordState]
      }

    </div>
  )
}

export default ResetPassword;