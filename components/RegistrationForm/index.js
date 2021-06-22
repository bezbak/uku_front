import React, {useEffect, useState} from "react";
import classNames from "classnames";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Field, Form} from "react-final-form";
import DatePicker from "react-datepicker";
import format from 'date-format'
import {actions} from "../../public/store/users/slice";
import useIsMobile from "../../out/hooks/useIsMobile";
import Location from "../Location";
import Select from "../UI/Select";
import AuthSubmitError from "../Auth/AuthSubmitError";
import style from "./styles.module.scss";

const RegistrationForm = () => {
  const isMobile = useIsMobile();
  const [userInfo, setUserInfo] = useState(useSelector((store) => store.auth?.phone, shallowEqual))
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [address, setAddress] = useState()
  const [startDate, setStartDate] = useState();
  const dispatch = useDispatch();
  const phoneRequest = (payload) => dispatch(actions.registrationRequestStart(payload));
  const onSubmit = (value) => (
    new Promise((resolve) => {
      phoneRequest({
        value,
        callback: (response) => {
          if (!response) {
            push('/');
          }
          resolve(response);
        },
      });
    })
  );


  const getAddress = ({input, className, ...res}) => {
    input.onChange(address)
    return (
      <input onFocus={() => setIsModalOpen(!isModalOpen)} onChange={() => setIsModalOpen(!isModalOpen)}
             className={className} {...res} defaultValue={address}/>
    )
  };
  const RenderDatePicker = ({name, input, input: {value, onChange}, className}) => {
    return (
      <DatePicker
        className={className}
        placeholderText="Дата рождения"
        minDate={'1990/12/12'}
        maxDate={new Date()}
        selected={startDate}
        disabledKeyboardNavigation
        name={name}
        onChange={value => {
          setStartDate((value));
          input.onChange(format("dd-MM-yyyy", value));
        }}
      />
    );
  };
  return (
    <div className={style.registrationForm}>
      {isMobile &&
      <div className={style.registrationForm__logo}>
        <span>
          Uku.kg
        </span>
      </div>}
      <div className={style.registrationForm__content}>
        <div className={style.registrationForm__registrationFormTitle}>
         <span>
           Регистрация
         </span>
        </div>

        <Form
          onSubmit={onSubmit}
          // validate={validate}
          render={({handleSubmit, values, submitting, form, pristine}) => (
            <form onSubmit={handleSubmit}>
              {console.log(values)}
              <div className={style.registrationForm__label}>Номер телефона</div>
              <AuthSubmitError />
              <Field
                name="phone"
                component="input"
                type="input"
                defaultValue={userInfo?.phone}
                value={userInfo?.phone}
                placeholder={userInfo?.phone}
                className={style.registrationForm__input}

              />
              <Field
                name="lastName"
                component="input"
                type="text"
                placeholder="Фамилия *"
                required
                className={style.registrationForm__input}

              />
              <Field
                name="firstName"
                component="input"
                type="text"
                placeholder="Имя *"
                className={style.registrationForm__input}
                required
              />
              <div className={style.registrationForm__wrap}>
                <div className={style.registrationForm__wrap_left}>
                  <Field name="gender"
                         component={Select}
                         className={style.registrationForm__select}
                         options={["Мужской","Женский"]}
                         title={'Пол'}
                         required
                 />
                </div>
                <div className={style.registrationForm__wrap_right}>
                  <Field
                    name="birthday"
                    component={RenderDatePicker}
                    type="date"
                    className={style.registrationForm__input}
                    required
                  />
                </div>
              </div>
              <div>
                <Field name="region" component={getAddress}
                       placeholder="Выбор региона"
                       className={style.registrationForm__input}
                       required
                />

              </div>
              <div className={style.registrationForm__wrap}>
                <Field name="employed" component="input"
                       type="checkbox"
                       className={style.registrationForm__checkBox}
                       required
                />
                <label>
                  <span className={style.registrationForm__checkBox__span}>Принимаю </span>
                  <a className={style.registrationForm__checkBox_link}
                     href="/system/terms-of-use">
                    правила программы
                    лояльности
                  </a>
                </label>
              </div>

              <button type="submit"
                      disabled={submitting || pristine}
                      className={classNames(style.registrationForm__button)}>Сохранить
              </button>
            </form>
          )}
        />
      </div>
      {isModalOpen && <Location modalOpen={isModalOpen} getAddress={setAddress}/>}
    </div>
  )
}
export default RegistrationForm;