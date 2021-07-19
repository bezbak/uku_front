import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from "next/router";
import classNames from 'classnames'
import useCountDown from 'react-countdown-hook';
import {Field, Form} from "react-final-form";
import Cookie from "js-cookie";
import {actions} from '../../store/users/slice';
import pathnames from "../../constants/pathnames";
import Modal from "../UI/Modal";
import Button from "../Button";
import NavLink from "../NavLink";
import useIsMobile from "../../hooks/useIsMobile";
import FinishCheckedIcon from "../../public/icons/finishChecked.svg";
import styles from "./styles.module.scss";

const CodeConfirmation =()=>{
  const router = useRouter();
  const isMobile = useIsMobile();
  const dispatch = useDispatch();

  const [codeLength, setCodeLength] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialTime, setInitialTime] = useState(60 * 1000)
  const interval = 1000;
  const [timeLeft, {start, pause, resume, reset}] = useCountDown(initialTime, interval);
    const user = useSelector((store) => store.auth)
  const is_profile_completed =Cookie.get("is_profile_completed")
  useEffect(()=> start(initialTime),[])


  const conformCodeRequest = (payload) => dispatch(actions.conformCodeRequestStart(payload));
  const oldPhoneConformCodeRequest = (payload) => dispatch(actions.oldPhoneConformCodeRequestStart(payload));
  const newPhoneConformCode= (payload) => dispatch(actions.newPhoneConformCodeRequestStart(payload));
  const SendAgain = () => dispatch(actions.sendAgainPhoneRequestStart())

  const LoginConform = (value) => new Promise((resolve) => {
    conformCodeRequest({
      value,
      callback: (response) => {
        if (response.token) {
          if (response?.is_profile_completed) {
            router.push(pathnames.main)
          } else {
            router.push(pathnames.registration)
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
          router.push(pathnames.login)
          // start(initialTime);
        } else {
          resolve(response);
        }
      },
    })
  })

  const NewLoginConform = (value) =>
    new Promise((resolve) => {
    newPhoneConformCode({
      value,
      callback: (response) => {
        if (!response) {
          setIsModalOpen(true)
        }
          resolve(response);

      },
    });
  })

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
  const toMainPage = () => {
    router.push(pathnames.main)
    setIsModalOpen(false)
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
<>
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
        {!is_profile_completed && <NavLink className={styles.codeConfirmForm__description_link} url={"/login"}> Неверный номер?</NavLink>}
      </div>
      <Form
        onSubmit={senConfCode}
        render={({handleSubmit, values, submitting, form, pristine}) => (
          <form onSubmit={handleSubmit}>
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
                    disabled={!!(timeLeft / 1000)}>
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
  <Modal modalOpen={isModalOpen}>
    <div className={styles.codeConfirmForm__modal}>
      <FinishCheckedIcon/>
      <div className={styles.codeConfirmForm__modal__title}>
            <span>
             Номер изменен
            </span>
      </div>
      <Button className={styles.codeConfirmForm__modal__button}
              textClassName={styles.codeConfirmForm__modal__button_text}
              onClick={toMainPage}
      >
        На главную
      </Button>
    </div>
  </Modal>
</>
  )
}
export default CodeConfirmation;