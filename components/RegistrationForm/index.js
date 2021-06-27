import React, {useState} from "react";
import {useRouter} from "next/router";
import classNames from "classnames";
import DatePicker from "react-datepicker";
import {Field, Form} from "react-final-form";
import {useDispatch, useSelector} from "react-redux";
import {useToasts} from 'react-toast-notifications'
import {parseISO, format} from 'date-fns';
import Select from "../UI/Select";
import Location from "../Location";
import pathnames from "../../constants/pathnames";
import AuthSubmitError from "../Auth/AuthSubmitError";
import useIsMobile from "../../out/hooks/useIsMobile";
import {actions} from "../../public/store/users/slice";
import style from "./styles.module.scss";

const RegistrationForm = () => {
  const {push} = useRouter();
  const {addToast} = useToasts();
  const isMobile = useIsMobile();
  const [userInfo, setUserInfo] = useState(useSelector((store) => store.auth?.phone))
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [address, setAddress] = useState({})
  const [startDate, setStartDate] = useState();
  const dispatch = useDispatch();
  const registrationRequest = (payload) => dispatch(actions.registrationRequestStart(payload));
  const token = useSelector((store) => store.auth?.token)
  const onSubmit = (values) => {
    return new Promise((resolve) => {
      registrationRequest({
        values,
        token,
        callback: (response) => {
          console.log("response", response)
          if (!response) {
            addToast(response, {appearance: 'success', autoDismiss: true,});
            push(pathnames.main);
          } else {
            addToast(response.Error, {appearance: 'error', autoDismiss: true,});
            resolve(response);
          }
        },
      });
    })
  };


  const getAddress = ({input, className, ...res}) => {
    console.log(address);
    input.onChange(address.id)
    return (
      <input onFocus={() => setIsModalOpen(!isModalOpen)} onChange={() => setIsModalOpen(!isModalOpen)}
             className={className} {...res} defaultValue={address.name}/>
    )
  };
  const RenderDatePicker = ({name, input, input: {value, onChange}, className}) => {
    return (
      <DatePicker
        className={className}
        placeholderText="Дата рождения"
        minDate={parseISO('1990/12/12')}
        maxDate={new Date()}
        selected={startDate}
        disabledKeyboardNavigation
        name={name}
        onChange={value => {
          setStartDate((value));
          input.onChange(format(
            value,
            'yyyy-MM-dd'
          ));
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
          validate={values => {
            let errors = {}
            if (!values.last_name) {
              errors.last_name = 'Напишите свои фамилии'
            }
            if (!values.first_name) {
              errors.first_name = 'Напишите свое имя'
            }
            if (!values.gender) {
              errors.gender = 'Пол не выбран'
            }
            if (!values.birth_date) {
              errors.birth_date = 'Выберите дата рождение'
            }
            if (!values.region) {
              errors.region = 'Регион не выбран'
            }
            return errors
          }}
          render={({
                     handleSubmit,
                     values,
                     submitting,
                     form,
                     pristine,
                     reset,
                     errors
                   }) => (
            <form onSubmit={handleSubmit}>

              <AuthSubmitError/>

              <Field
                name="last_name"
              >
                {({input, meta}) => (
                  <div>
                    <input   {...input}
                             placeholder="Фамилия *"
                             type="text"
                             className={style.registrationForm__input}
                    />
                    {meta.error && meta.touched && <span className={style.registrationForm_error}>{meta.error}</span>}
                  </div>
                )}
              </Field>


              <Field
                name="first_name"
              >
                {({input, meta}) => (
                  <div>
                    <input   {...input}
                             placeholder="Имя *"
                             type="text"
                             className={style.registrationForm__input}
                    />
                    {meta.error && meta.touched && <span  className={style.registrationForm_error}>{meta.error}</span>}
                  </div>
                )}
              </Field>

              <div className={style.registrationForm__wrap}>
                <div className={style.registrationForm__wrap_left}>
                  <Field name="gender" required>
                    {({input, meta}) => (
                      <div>
                        <Select className={style.registrationForm__select}
                                input={input} options={["Мужской", "Женский"]}
                                title={'Пол'}/>
                        {meta.error && meta.touched && <span  className={style.registrationForm_error}>{meta.error}</span>}
                      </div>
                    )}
                  </Field>
                </div>
                <div className={style.registrationForm__wrap_right}>

                  <Field
                    name="birth_date"
                    type="date"
                    className={style.registrationForm__input}
                    required
                  >
                      {({input, meta}) => (
                        <div>
                          <RenderDatePicker name={'birth_date'} input={input}
                                            className={style.registrationForm__input}
                                            />
                          {meta.error && meta.touched && <span  className={style.registrationForm_error}>{meta.error}</span>}
                        </div>
                      )}
                  </Field>
                </div>
              </div>
              <div>
                <Field name="region" component={getAddress}
                       placeholder="Выбор региона"
                       className={style.registrationForm__input}
                       required
                />
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
