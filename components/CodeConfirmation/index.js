import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {useRouter} from "next/router";
import {Field, Form} from "react-final-form";
import useCountDown from 'react-countdown-hook';
import classNames from 'classnames'
import {actions} from '../../store/users/slice';
import pathnames from "../../constants/pathnames";
import NavLink from "../NavLink";
import useIsMobile from "../../public/hooks/useIsMobile";
import styles from "./styles.module.scss";

const CodeConfirmation =()=>{
  const {push} = useRouter();
  const isMobile = useIsMobile();
  const dispatch = useDispatch();

  const [codeLength, setCodeLength] = useState(true)
  const [initialTime, setInitialTime] = useState(60 * 1000)
  const interval = 1000;
  const [timeLeft, {start, pause, resume, reset}] = useCountDown(initialTime, interval);
  const user = useSelector((store) => store.auth)
  useEffect(()=> start(initialTime),[])

  const phoneRequest = (payload) => dispatch(actions.phoneRequestStart(payload));

  const conformCodeRequest = (payload) => dispatch(actions.conformCodeRequestStart(payload));
  const oldPhoneConformCodeRequest = (payload) => dispatch(actions.oldPhoneConformCodeRequestStart(payload));
  const newPhoneConformCode= (payload) => dispatch(actions.newPhoneConformCodeRequestStart(payload));
  // const changeOldPhoneRequest = (payload) => dispatch(actions.changeOldPhoneRequestStart(payload));
  const SendAgain = () => (
    new Promise((resolve) => {
        phoneRequest({
          value: user.phone,
          callback: (response) => {
            resolve(response);
            start(60 * 1000)
          },
        })
    })
  )

  const LoginConform = (value) => new Promise((resolve) => {
    conformCodeRequest({
      value,
      callback: (response) => {
        if (response.token) {
          if (response?.is_profile_completed) {
            console.log('---------conform')
            push(pathnames.main)
          } else {
            push(pathnames.registration)
          }
        } else {
          resolve(response);
        }
      },
    })
    // start(initialTime)
  });

  const OldLoginConform = (value) => new Promise((resolve) => {
    oldPhoneConformCodeRequest({
       value,
      callback: (response) => {
        if (!response) {
          console.log('---------OldLoginConform')
          push(pathnames.login)
          // start(initialTime);
        } else {
          resolve(response);
        }
      },
    })
  })

  const NewLoginConform = (value) => console.log('---------OldLoginConform')
  //   new Promise((resolve) => {
  //   newPhoneConformCode({
  //     value,
  //     callback: (response) => {
  //       if (!response) {
  //           push(pathnames.profile)
  //       } else {
  //         resolve(response);
  //       }
  //     },
  //   });
  // })

  // const isChangeOldPhone = useSelector((store) => store.auth.isChangeOldPhone);
  // const user_region_detail = useSelector((store) => store.auth.user_region_detail);
  // const token = useSelector((store) => store.auth.token);
  const senConfCode = (value) => {
    if (user.isChangeOldPhone==="phone") {
      return LoginConform(value)
    }
   else  if (user.isChangeOldPhone==="oldPhone") {
      return OldLoginConform(value)
    }
    else if(user.isChangeOldPhone === "newPhone") {
      return NewLoginConform(value)
    }

  }

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
    if (object.target.value.length > 5) {
      setCodeLength(false)
    } else setCodeLength(true)
  }

  return (
    <div className={styles.codeConfirmForm}>
      {isMobile &&
      <div className={styles.codeConfirmForm__logo}>
        <span>
          Uku.kg
        </span>
      </div>}
      <div className={styles.codeConfirmForm__formContent}>
        <div className={styles.codeConfirmForm__codeConfirmFormTitle}>
         <span>
            Подтверждение кода
         </span>
        </div>
        <div className={styles.codeConfirmForm__description}>
          Код был отправлен на номер <br/>
          <span>
          {user.phone?.phone}
       </span>
          <NavLink className={styles.codeConfirmForm__description_link} url={"/login"}> Неверный номер?</NavLink>
        </div>
        <Form
          onSubmit={senConfCode}
          render={({handleSubmit, values, submitting, form, pristine}) => (
            <form onSubmit={handleSubmit}>
              {/*<AuthSubmitError/>*/}
              {/*<ResponseMessage/>*/}
              <Field
                name="confirmation_code"
                component="input"
                type="number"
                placeholder="Код"
                maxLength="6"
                onInput={maxLengthCheck}
                className={styles.codeConfirmForm__input}
              />

              <button type="submit"
                      className={
                        classNames(styles.codeConfirmForm__button,
                          styles.codeConfirmForm__button_submitButton
                        )
                      }
                      disabled={codeLength}>
                Подтвердить
              </button>

              <div className={styles.codeConfirmForm__label}>Не пришло SMS сообщение?</div>
              <button type="button"
                      className={classNames(styles.codeConfirmForm__button,
                        styles.codeConfirmForm__button_submitAgain,
                      )}
                      onClick={SendAgain}
                      disabled={timeLeft / 1000 ? true : false}>
                <span>Отправить снова</span>
                <span className={classNames({[styles.codeConfirmForm__button_submitAgain_timer]: !timeLeft / 1000})}>
                  0:{timeLeft / 1000}
                </span>
              </button>
            </form>
          )}
        />
      </div>
    </div>
  )
}
export default CodeConfirmation;