import React, {useRef, useState} from "react";
import { useDispatch} from 'react-redux';
import {useRouter} from "next/router";
import {Form, Field} from 'react-final-form'
import PhoneInput, {
  isValidPhoneNumber,
  isPossiblePhoneNumber
} from 'react-phone-number-input'
import pathnames from "../../constants/pathnames";


import {actions} from '../../store/users/slice';
import useIsMobile from "../../hooks/useIsMobile";
import NavLink from "../NavLink";
import Cookie from 'js-cookie'
import CheckedIcon from '../../public/icons/checked.svg'
import CheckBoxIcon from '../../public/icons/checkBox.svg'
import styles from './styles.module.scss'

const AuthForm = () => {
  const refLogin = useRef()
  const router = useRouter()
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const [privacyChecked, setPrivacyChecked] = useState(true)
  const is_profile_completed = Cookie.get("is_profile_completed")
  const phoneRequest = (payload) => dispatch(actions.phoneRequestStart(payload));
  const changeOldPhoneRequest = (payload) => dispatch(actions.changeOldPhoneRequestStart(payload));

  const phoneSend = (value) => new Promise((resolve) => {
    phoneRequest({
      value,
      callback: (response) => {
        if (!response) {
          setTimeout(() => router.push(pathnames.codeConfirmation), 1000)
        } else {
          resolve(response);
        }
      }
    });
  })

  const changePhone = (value) => new Promise((resolve) => {
    changeOldPhoneRequest({
      value,
      callback: (response) => {
        if (!response) {
          setTimeout(() => router.push(pathnames.codeConfirmation), 1000)
        } else {
          resolve(response);
        }
      }
    });
  })

  const phoneSubmit = (value) => {
    if (is_profile_completed) {
      return changePhone(value)
    }
    return phoneSend(value)
  }

  return (
    <div className={styles.sectionAuth} ref={refLogin}>
      {isMobile &&
      <div className={styles.sectionAuth__logo}>
        <span>
          Uku.kg
        </span>
      </div>}
      <div className={styles.sectionAuth__formContent}>
        <div className={styles.sectionAuth__formContent__headline}>
        <span className={styles.sectionAuth__formContent__headline__login}>
          {!is_profile_completed ? 'Вход' : 'Введите новый номер'}
        </span>
          <NavLink url={'/'}>
            <span className={styles.sectionAuth__formContent__headline_cancel}>
              Отмена
            </span>
          </NavLink>
        </div>
        {!is_profile_completed && <div className={styles.sectionAuth__checkbox}>
          <input type="checkbox" id="privacy-checkbox"
                 onChange={() => setPrivacyChecked(!privacyChecked)}/>
          <label htmlFor="privacy-checkbox">
            {privacyChecked ? <CheckBoxIcon/> : <CheckedIcon/>}
          </label>
          <span>
            Принимаю условия конфиденциальности и политику безопасности
          </span>
        </div>}
        <Form
          onSubmit={phoneSubmit}
          validate={values => {
            const errors = {}
            if (!values.phone) {
              errors.phone = 'Напишите номер телефона'
            } else if (!isPossiblePhoneNumber(`${values.phone}`)) {
              errors.phone = 'Невозможный номер телефона'
            } else if (!isValidPhoneNumber(`${values.phone}`)) {
              errors.phone = `Неправильный номер телефона`
            } else if (isNaN(values.phone)) {
              errors.phone = 'Должен быть числом'
            }
            return errors
          }}
          render={({
                     handleSubmit, values,
                     submitError, submitting, form, pristine
                   }) => (
            <form onSubmit={handleSubmit}>
              <Field name="phone">
                {({input, meta}) => (
                  <div>
                    <PhoneInput
                      initialValueFormat="national"
                      placeholder="Номер"
                      international
                      defaultCountry="KG"
                      value={input.value.value}
                      onChange={value => {
                        input.onChange(value)
                      }}
                    />
                    <span>{isValidPhoneNumber(`${values.phone}`)}</span>
                    {meta.error && meta.touched && meta.submitError &&
                    <span className={styles.sectionAuth__formContent__error}>{meta.error || meta.submitError}</span>}
                  </div>
                )}
              </Field>
              <button type="submit"
                      className={styles.sectionAuth__formContent__submitButton}
                      disabled={(!isValidPhoneNumber(`${values.phone}`) || (privacyChecked && !is_profile_completed))}> {!is_profile_completed ? 'Далее' : 'Далее Сменить номер'}
              </button>
            </form>
          )}
        />
      </div>
    </div>
  )
}
export default AuthForm;