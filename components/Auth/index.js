import React, { useState} from "react";
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {Form, Field} from 'react-final-form'
import PhoneInput, {
  isValidPhoneNumber,
  isPossiblePhoneNumber
} from 'react-phone-number-input'
import pathnames from "../../constants/pathnames";
import {actions} from '../../public/store/users/slice';


import AuthSubmitError from "./AuthSubmitError";
import useIsMobile from "../../public/hooks/useIsMobile";
import ResponseMessage from "./ResponseMessage";
import NavLink from "../NavLink";
import CheckedIcon from '../../public/icons/checked.svg'
import CheckBoxIcon from '../../public/icons/checkBox.svg'
import styles from './styles.module.scss'
import {useRouter} from "next/router";

const AuthForm = () => {
  const {push} = useRouter();
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const [privacyChecked, setPrivacyChecked] = useState(true)
  const phoneRequest = (payload) => dispatch(actions.phoneRequestStart(payload));
  const changeOldPhoneRequest = (payload) => dispatch(actions.changeOldPhoneRequestStart(payload));


  const isChangeOldPhone = useSelector((store) => store.auth.isChangeOldPhone, shallowEqual);


  const onSubmit = (value) => {
    return new Promise((resolve) => {
      if (isChangeOldPhone === "phone") {
        phoneRequest({
          value,
          title: "phone",
          callback: (response) => {
            console.log(response);
            if (!response) {
              push(pathnames.codeConfirmation);
            } else {
              resolve(response);
            }
          }
        });
      } else {
        changeOldPhoneRequest({
          value,
          title: "newPhone",
          callback: (response) => {
            console.log(response);
            if (!response) {
              push(pathnames.codeConfirmation);
            } else {
              resolve(response);
            }
          }
        });
      }
    })
  }

  return (
    <div className={styles.sectionAuth}>
      {isMobile &&
      <div className={styles.sectionAuth__logo}>
        <span>
          Uku.kg
        </span>
      </div>}
      <div className={styles.sectionAuth__formContent}>
        <div className={styles.sectionAuth__formContent__headline}>
        <span className={styles.sectionAuth__formContent__headline__login}>
          {isChangeOldPhone === "phone" ? 'Вход' : 'Введите новый номер'}
        </span>
          <NavLink url={'/'}>
            <span className={styles.sectionAuth__formContent__headline_cancel}>
              Отмена
            </span>
          </NavLink>
        </div>
        <div className={styles.sectionAuth__checkbox}>
          <input type="checkbox" id="privacy-checkbox"
                 onChange={() => setPrivacyChecked(!privacyChecked)}/>
          <label htmlFor="privacy-checkbox">
            {privacyChecked ? <CheckBoxIcon/> : <CheckedIcon/>}
          </label>
          <span>
            Принимаю условия конфиденциальности и политику безопасности
          </span>
        </div>
        <Form
          onSubmit={onSubmit}
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
              <AuthSubmitError/>
              <ResponseMessage/>
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
                      disabled={(!isValidPhoneNumber(`${values.phone}`) || privacyChecked)}>Далее
              </button>
            </form>
          )}
        />
      </div>
    </div>
  )
}
export default AuthForm;