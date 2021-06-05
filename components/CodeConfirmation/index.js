import React, {useState} from "react";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import classNames from 'classnames'
import {Field, Form} from "react-final-form";
import NavLink from "../NavLink";
import { actions } from '../../public/store/users/slice';
import style from "./styles.module.scss";
import pathnames from "../../constants/pathnames";
import AuthSubmitError from "../Auth/AuthSubmitError";
import {useRouter} from "next/router";

const CodeConfirmation = () =>{
  const { push } = useRouter();
  const [isActive, setIsActive] = useState(true)
  const dispatch = useDispatch();
  const userPhone = useSelector((store) => store.auth?.phone, shallowEqual);
  const confCodeRequest = (payload) => dispatch(actions.conformCodeRequestStart(payload));

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
    <div className={style.codeConfirmForm}>
      <div className={style.codeConfirmForm__codeConfirmFormTitle}>
         <span>
            Подтверждение кода
         </span>
      </div>
      <div className={style.codeConfirmForm__description}>
        Код был отправлен на номер <br/>
       <span>
          {userPhone?.phone}
       </span>
        <NavLink className={style.codeConfirmForm__description_link} url={"login"} as={"login/"}> Неверный номер?</NavLink>
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
              className={style.codeConfirmForm__input}

            />
            <button type="submit"
                    className={
                      classNames(style.codeConfirmForm__button,
                      // style.codeConfirmForm__button_confirm,
                      // {[style.codeConfirmForm__button_confirm__active]: isActive}
                      )
                    }
                    disabled={submitting || pristine}
            >
              Подтвердить
            </button>
            <div className={style.codeConfirmForm__label}>Не пришло SMS сообщение?</div>
            <button type="submit"
                    className={classNames(style.codeConfirmForm__button,
                      style.codeConfirmForm__button_submitAgain,
                      // {[style.codeConfirmForm__button_submitAgain__active]: isActive}
                    )}
                    disabled={submitting || pristine}
            >
              <span>Отправить снова</span> <span>0:59</span>
            </button>
          </form>
        )}
      />
    </div>
  )
}
export default CodeConfirmation;