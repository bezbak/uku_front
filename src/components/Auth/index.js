import React from "react";
import {Form, Field} from 'react-final-form'

import style from './styles.module.scss'

const AuthForm = () => {
  const onSubmit = async values => {
    window.alert(JSON.stringify(values, 0, 2))
  }

  return (
    <div className={style.root}>
      <h4>Вход</h4>
      <span className={style.root_cancel}>
        Отмена
      </span>
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
              placeholder="+996 (xxx) xxx xxx"
            />
            <button type="submit">Далее</button>
          </form>
        )}
      />
    </div>
  )
}
export default AuthForm;