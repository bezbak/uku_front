import style from "./styles.module.scss";
import NavLink from "../NavLink";
import {Field, Form} from "react-final-form";
import classNames from "classnames";
import React, {useState} from "react";


const RegistrationForm = () => {
  const [isActive, setIsActive] = useState(false)
  const onSubmit = async values => {
    window.alert(JSON.stringify(values, 0, 2))
  }
  return (
    <div className={style.registrationForm}>
      <div className={style.registrationForm__registrationFormTitle}>
         <span>
           Регистрация
         </span>
      </div>

      <Form
        onSubmit={onSubmit}
        // validate={validate}
        render={({handleSubmit}) => (
          <form onSubmit={handleSubmit}>
            <div className={style.registrationForm__label}>Номер телефона </div>
            {/*<AuthSubmitError />*/}
            <Field
              name="phone"
              component="input"
              type="text"
              placeholder="+996 (555) 55-55-55"
              class={style.registrationForm__input}

            />
            <Field
              name="lastName"
              component="input"
              type="text"
              placeholder="Фамилия *"
              required
              class={style.registrationForm__input}

            />
            <Field
              name="firstName"
              component="input"
              type="text"
              placeholder="Имя *"
              class={style.registrationForm__input}
              required
            />
            <div className={style.registrationForm__wrap}>
            <div  className={style.registrationForm__wrap_left}>
              <Field name="gender" component="select"   class={style.registrationForm__select}>
                <option>Пол</option>
                <option value="Мужской">Мужской</option>
                <option value="Женский">Женский</option>
              </Field>
            </div>
              <div  className={style.registrationForm__wrap_right}>
                <Field
                  name="birthday"
                  component="input"
                  type="text"
                  placeholder="Дата рождения"
                  class={style.registrationForm__input}
                />
              </div>
            </div>
            <div>
              <Field name="region" component="select" class={style.registrationForm__select}>
                <option >Выбор региона</option>
                <option value="Бишкек">Бишкек</option>
                <option value="Ош">Ош</option>
                <option value="Жалал-Абад">Жалал-Абад</option>
                <option value="Ташкент">Ташкент</option>
                <option value="Москва">Москва</option>
              </Field>
            </div>
            <div className={style.registrationForm__wrap}>
              <Field name="employed" component="input" type="checkbox" class={style.registrationForm__checkBox} />
              <label><span>Принимаю</span> <a className={style.registrationForm__checkBox_link}>правила программы лояльности</a></label>
            </div>

            <button type="submit"
                    className={classNames(style.registrationForm__button,{[style.registrationForm__button__active]: isActive})}>Сохранить
            </button>
          </form>
        )}
      />
    </div>
  )
}
export default RegistrationForm;