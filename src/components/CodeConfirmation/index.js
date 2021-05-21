import React, {useState} from "react";
import classNames from 'classnames'
import style from "./styles.module.scss";
import NavLink from "../NavLink";
import {Field, Form} from "react-final-form";

const CodeConfirmation = () =>{
  const [isActive, setIsActive] = useState(false)
  const onSubmit = async values => {
    window.alert(JSON.stringify(values, 0, 2))
  }
  return (
    <div className={style.codeConfirmForm}>
      <div className={style.codeConfirmForm__codeConfirmFormTitle}>
         <span>
            Подтверждение кода
         </span>
      </div>
      <div className={style.codeConfirmForm__description}>
        Код был отправлен на номер <br/>
        +996 (555) 555 555 <NavLink className={style.codeConfirmForm__description_link} url={"login"} as={"login/"}>Неверный номер?</NavLink>
      </div>
      <Form
        onSubmit={onSubmit}
        // validate={validate}
        render={({handleSubmit}) => (
          <form onSubmit={handleSubmit}>
            {/*<AuthSubmitError />*/}
            <Field
              name="firstName"
              component="input"
              type="text"
              placeholder="Код"
              class={style.codeConfirmForm__input}

            />
            <button type="submit"
                    className={classNames(style.codeConfirmForm__button, style.codeConfirmForm__button_confirm,{[style.codeConfirmForm__button_confirm__active]: isActive})}>Подтвердить
            </button>
            <div className={style.codeConfirmForm__label}>Не пришло SMS сообщение?</div>
            <button type="submit" className={classNames(style.codeConfirmForm__button, style.codeConfirmForm__button_submitAgain, {[style.codeConfirmForm__button_submitAgain__active]: isActive})}><span>Отправить снова</span> <span>0:59</span></button>
          </form>
        )}
      />
    </div>
  )
}
export default CodeConfirmation;