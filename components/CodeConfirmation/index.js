import React, {useEffect, useState} from "react";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import classNames from 'classnames'
import {Field, Form} from "react-final-form";
import useCountDown from 'react-countdown-hook';
import NavLink from "../NavLink";
import { actions } from '../../public/store/users/slice';
import styles from "./styles.module.scss";
import pathnames from "../../constants/pathnames";
import AuthSubmitError from "../Auth/AuthSubmitError";
import {useRouter} from "next/router";
import useIsMobile from "../../public/hooks/useIsMobile";

const CodeConfirmation = () =>{
  const { push } = useRouter();
  const isMobile =useIsMobile();
  const dispatch = useDispatch();
  const initialTime = 60*1000 ; // initial time in milliseconds, defaults to 60000
  const interval = 1000; // interval to change remaining time amount, defaults to 1000
  const [timeLeft, { start, pause, resume, reset }] = useCountDown(initialTime, interval);
  useEffect(()=>{
    start();
  }, []);
  const userPhone = useSelector((store) => store.auth?.phone, shallowEqual);
  const confCodeRequest = (payload) => dispatch(actions.conformCodeRequestStart(payload));
  const phoneRequest = (payload) => dispatch(actions.phoneRequestStart(payload));
  const SendAgain = () => (
    new Promise((resolve) => {
      phoneRequest({
        value:userPhone,
        callback: (response) => {
          if (!response) {
          }
          resolve(response);
          const newTime = 60 * 1000;
          start(newTime);
        },
      })
    })
  )
    const onSubmit = (value) =>
    new Promise((resolve) => {
      const values = Object.assign(value, userPhone)
      confCodeRequest({
        values,
        callback: (response) => {
          console.log(response)
          if (!response) {
            push(pathnames.registration);
          }
          resolve(response);
        },
      });
    })

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
        <NavLink className={styles.codeConfirmForm__description_link} url={"login"} as={"login/"}> Неверный номер?</NavLink>
      </div>
      <Form
        onSubmit={onSubmit}
        // validate={validate}
        render={({handleSubmit,values, submitting, form, pristine}) => (
          <form onSubmit={handleSubmit}>
            <AuthSubmitError />
            <Field
              name="confirmation_code"
              component="input"
              type="text"
              placeholder="Код"
              className={styles.codeConfirmForm__input}

            />
            <button type="submit"
                    className={
                      classNames(styles.codeConfirmForm__button,
                        styles.codeConfirmForm__button_submitButton
                      )
                    }
                    disabled={submitting || pristine}
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