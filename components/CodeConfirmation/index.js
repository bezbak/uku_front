import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {Field, Form} from "react-final-form";
import useCountDown from 'react-countdown-hook';
import {useToasts} from 'react-toast-notifications'
import classNames from 'classnames'
import NavLink from "../NavLink";
import {actions} from '../../public/store/users/slice';
import pathnames from "../../constants/pathnames";
import useIsMobile from "../../public/hooks/useIsMobile";
import ResponseMessage from "../Auth/ResponseMessage";
import {actions as toastAction} from "../../public/store/toast/slice";
import styles from "./styles.module.scss";

const CodeConfirmation = () => {
  const {push} = useRouter();
  const {addToast} = useToasts();
  const isMobile = useIsMobile();
  const dispatch = useDispatch();

  const [codeLength, setCodeLength] = useState(true)
  const [initialTime, setInitialTime] = useState(60 * 1000)
  const interval = 1000;
  const [timeLeft, {start, pause, resume, reset}] = useCountDown(initialTime, interval);
  const removeToast = () => dispatch(toastAction.removeSnackbar());

  const toast = useSelector((store) => store.toast, shallowEqual);
  const isChangeOldPhone = useSelector((store) => store.auth?.isChangeOldPhone, shallowEqual);
  const userPhone = useSelector((store) => store.auth?.phone, shallowEqual);

  useEffect(() => {
    if (toast.open) {
      addToast(toast.message, {appearance: toast.variant, autoDismiss: true,});
      removeToast()
    }
  }, [toast])

  useEffect(() => {
    start(initialTime);
  }, [userPhone]);

  const conformCodeRequest = (payload) => dispatch(actions.conformCodeRequestStart(payload));
  const phoneRequest = (payload) => dispatch(actions.phoneRequestStart(payload));
  const oldPhoneConformCodeRequest = (payload) => dispatch(actions.oldPhoneConformCodeRequestStart(payload));
  const newPhoneConformCodeRequest = (payload) => dispatch(actions.newPhoneConformCodeRequestStart(payload));
  const changeOldPhoneRequest = (payload) => dispatch(actions.changeOldPhoneRequestStart(payload));

  const SendAgain = () => (
    new Promise((resolve) => {
      if (isChangeOldPhone === "phone") {
        phoneRequest({
          value: userPhone,
          title: "phone",
          callback: (response) => {
            console.log('kls' + response)
            resolve(response);
            start(60 * 1000)
          },
        })
      }
    })
  )
  console.log(timeLeft)
  console.log(isChangeOldPhone)

  const onSubmit = (value) =>
    new Promise((resolve) => {
      const values = Object.assign(value, userPhone)
      if (isChangeOldPhone === "phone") {
        conformCodeRequest({
          values,
          callback: (response) => {
            if (response.token) {
              console.log(response)
              if (response.is_profile_completed) {
                console.log(response.is_profile_completed)
                push(pathnames.main)
              } else {
                console.log(response.is_profile_completed)
                push(pathnames.registration)
              }
              reset()
            } else {
              resolve(response);
            }
          },
        });
      } else if (isChangeOldPhone === "oldPhone") {
        delete value.phone
        console.log(value)
        oldPhoneConformCodeRequest({
          value: value,
          callback: (response) => {
            if (!response) {
              push(pathnames.login)
            } else {
              resolve(response);
            }
          },
        });
      } else if (isChangeOldPhone === "newPhone") {
        newPhoneConformCodeRequest({
          value: value.confirmation_code,
          callback: (response) => {
            if (response.token) {
              if (response.is_profile_completed) {
                console.log(response.is_profile_completed)
                push(pathnames.main)
              } else {
                console.log(response.is_profile_completed)
                push(pathnames.registration)
              }
            } else {
              resolve(response);
            }
          },
        });
      }
    })

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
          {userPhone?.phone}
       </span>
          <NavLink className={styles.codeConfirmForm__description_link} url={"/login"}> Неверный номер?</NavLink>
        </div>
        <Form
          onSubmit={onSubmit}
          render={({handleSubmit, values, submitting, form, pristine}) => (
            <form onSubmit={handleSubmit}>
              {/*<AuthSubmitError/>*/}
              <ResponseMessage/>
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