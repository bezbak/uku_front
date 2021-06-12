import React, {useState} from "react";
import {useDispatch} from 'react-redux';
import {Form, Field, useFormState} from 'react-final-form'
import {useRouter} from 'next/router';
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
  isPossiblePhoneNumber
} from 'react-phone-number-input'
import pathnames from "../../constants/pathnames";
import {actions} from '../../public/store/users/slice';


import AuthSubmitError from "./AuthSubmitError";
import styles from './styles.module.scss'
import useIsMobile from "../../public/hooks/useIsMobile";

const AuthForm = () => {
  const {push} = useRouter();
  const [value, setValue] = useState()
  const isMobile =useIsMobile();
  const dispatch = useDispatch();
  const phoneRequest = (payload) => dispatch(actions.phoneRequestStart(payload));
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
          Вход
        </span>
          <span className={styles.sectionAuth__formContent__headline_cancel}>
        Отмена
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
          render={({handleSubmit, values, submitting, form, pristine}) => (
            <form onSubmit={handleSubmit}>
              <AuthSubmitError/>
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
                    <span>{isValidPhoneNumber(`${values.phone}`)}</span>
                    {meta.error && meta.touched && <span className={styles.sectionAuth__formContent__error}>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <button type="submit" disabled={submitting || pristine}>Далее</button>
            </form>
          )}
        />
      </div>
    </div>
  )
}
export default AuthForm;