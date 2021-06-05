import React, {useState} from "react";
import { useDispatch } from 'react-redux';
import {Form, Field, useFormState} from 'react-final-form'
import { useRouter } from 'next/router';
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
  isPossiblePhoneNumber
} from 'react-phone-number-input'
import pathnames from "../../constants/pathnames";
import { actions } from '../../public/store/users/slice';


import AuthSubmitError from "./AuthSubmitError";
import style from './styles.module.scss'

const AuthForm = () => {
  const { push } = useRouter();
  const [value, setValue] = useState()
  const dispatch = useDispatch();
  const phoneRequest = (payload) => dispatch(actions.phoneRequestStart(payload));
  // }
  const onSubmit = (value) => (
    new Promise((resolve) => {
      phoneRequest({
        value,
        callback: (response) => {
          if (!response) {
            push(pathnames.codeConfirmation);
          }
          resolve(response);
        },
      });
    })
    );



  return (
    <div className={style.sectionAuth}>
      <h4>Вход</h4>
      <span className={style.sectionAuth_cancel}>
        Отмена
      </span>
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
        render={({handleSubmit, values, submitting, form, pristine}) => (
          <form onSubmit={handleSubmit}>
            <AuthSubmitError />
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
                    error={!value ? (isValidPhoneNumber(`${value}`) ? undefined : 'Invalid phone number') :
                      'Phone number required'}
                  />
                  <span >{isValidPhoneNumber(`${values.phone}`)}</span>
                  {meta.error && meta.touched && <span  className={style.sectionAuth__error}>{meta.error}</span>}
                </div>
              )}
            </Field>
            <button type="submit" disabled={submitting || pristine}>Далее</button>
          </form>
        )}
      />
    </div>
  )
}
export default AuthForm;