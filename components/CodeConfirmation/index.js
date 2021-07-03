import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {Field, Form} from "react-final-form";
import useCountDown from 'react-countdown-hook';
import {useToasts} from 'react-toast-notifications'
import classNames from 'classnames'
import NavLink from "../NavLink";
import { actions } from '../../public/store/users/slice';
import pathnames from "../../constants/pathnames";
import AuthSubmitError from "../Auth/AuthSubmitError";
import useIsMobile from "../../public/hooks/useIsMobile";
import ResponseMessage from "../Auth/ResponseMessage";
import styles from "./styles.module.scss";
import {actions as toastAction} from "../../public/store/toast/slice";

const CodeConfirmation = () =>{
  const { push } = useRouter();
  const {addToast} = useToasts();
  const [codeLength, setCodeLength]= useState(true)
  const isMobile =useIsMobile();
  const dispatch = useDispatch();
  const initialTime = 60*1000 ;
  const interval = 1000;
  const [timeLeft, { start, pause, resume, reset }] = useCountDown(initialTime, interval);
  const removeToast = () => dispatch(toastAction.removeSnackbar());
  const toast = useSelector((store) => store.toast, shallowEqual);
  useEffect(() => {
    if (toast.open) {
      addToast(toast.message, {appearance: toast.variant, autoDismiss: true,});
      removeToast()
    }
  }, [toast])
  useEffect(()=>{
    start();
  }, []);
  const userPhone = useSelector((store) => store.auth?.phone, shallowEqual);
  const conformCodeRequest = (payload) => dispatch(actions.conformCodeRequestStart(payload));
  const phoneRequest = (payload) => dispatch(actions.phoneRequestStart(payload));
  const SendAgain = () => (
    new Promise((resolve) => {
      phoneRequest({
        value:userPhone,
        callback: (response) => {
          if (!response) {
            push(pathnames.codeConfirmation);
          } else {
            resolve(response);
            const newTime = 60 * 1000;
            start(newTime);
          }
        },
      })
    })
  )
    const onSubmit = (value) =>
    new Promise((resolve) => {
      const values = Object.assign(value, userPhone)
      conformCodeRequest({
        values,
        callback: (response) => {
          if (response.token) {
           if(response.is_profile_completed) {
             console.log(response.is_profile_completed)
             push(pathnames.main)
           }
           else {
             console.log(response.is_profile_completed)
             push(pathnames.registration)
           }
          } else {
            resolve(response);
          }
        },
      });
    })

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)

    }
    if(object.target.value.length>5){
      setCodeLength(false)
    }
    else   setCodeLength(true)
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
          {userPhone?.phone}
       </span>
        <NavLink className={styles.codeConfirmForm__description_link} url={"/login"} > Неверный номер?</NavLink>
      </div>
      <Form
        onSubmit={onSubmit}
        render={({handleSubmit,values, submitting, form, pristine}) => (
          <form onSubmit={handleSubmit}>
            <AuthSubmitError />
            <ResponseMessage/>
            <Field
              name="confirmation_code"
              component="input"
              type="number"
              placeholder="Код"
              maxLength = "6"
              onInput={maxLengthCheck}
              className={styles.codeConfirmForm__input}

            />
            <button type="submit"
                    className={
                      classNames(styles.codeConfirmForm__button,
                        styles.codeConfirmForm__button_submitButton
                      )
                    }
                    disabled={codeLength}
            >
              Подтвердить
            </button>
            <div className={styles.codeConfirmForm__label}>Не пришло SMS сообщение?</div>
            <button type="button"
                    className={classNames(styles.codeConfirmForm__button,
                      styles.codeConfirmForm__button_submitAgain,
                    )}
                    onClick={SendAgain}
                    disabled={timeLeft/1000 ? true:false}
            >
              <span>Отправить снова</span> <span className={classNames({[styles.codeConfirmForm__button_submitAgain_timer]:!timeLeft/1000})}>0:{timeLeft/1000} </span>
            </button>
          </form>
        )}
      />
      </div>
    </div>
  )
}
export default CodeConfirmation;