import React, {useState} from "react";
import classNames from "classnames";
import {Field, Form} from "react-final-form";
import {shallowEqual, useSelector} from "react-redux";
import useIsMobile from "../../out/hooks/useIsMobile";
import style from "./styles.module.scss";


const RegistrationForm = () => {
  const isMobile = useIsMobile();
  const [isActive, setIsActive] = useState(false)
  const user = useSelector((store) => store.auth?.phone, shallowEqual);
  const onSubmit = async values => {
    window.alert(JSON.stringify(values, 0, 2))
  }
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
       render={({handleSubmit, submitting, form, pristine}) => (
         <form onSubmit={handleSubmit}>
           <div className={style.registrationForm__label}>Номер телефона</div>
           {/*<AuthSubmitError />*/}
           <Field
             name="phone"
             component="input"
             type="text"
             value={user?.phone}
             placeholder={user?.phone}
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
               <Field name="gender" component="select"
                      className={style.registrationForm__select}>
                 <option>Пол</option>
                 <option value="Мужской">Мужской</option>
                 <option value="Женский">Женский</option>
               </Field>
             </div>
             <div className={style.registrationForm__wrap_right}>
               <Field
                 name="birthday"
                 component="input"
                 type="text"
                 placeholder="Дата рождения"
                 className={style.registrationForm__input}
               />
             </div>
           </div>
           <div>
             <Field name="region" component="select"
                    className={style.registrationForm__select}>
               <option>Выбор региона</option>
               <option value="Бишкек">Бишкек</option>
               <option value="Ош">Ош</option>
               <option value="Жалал-Абад">Жалал-Абад</option>
               <option value="Ташкент">Ташкент</option>
               <option value="Москва">Москва</option>
             </Field>
           </div>
           <div className={style.registrationForm__wrap}>
             <Field name="employed" component="input" type="checkbox" className={style.registrationForm__checkBox}/>
             <label><span>Принимаю</span> <a className={style.registrationForm__checkBox_link}
                                             href="/system/terms-of-use">правила программы
               лояльности</a></label>
           </div>

           <button type="submit"
                   disabled={submitting || pristine}
                   className={classNames(style.registrationForm__button, {[style.registrationForm__button__active]: isActive})}>Сохранить
           </button>
         </form>
       )}
     />
   </div>
    </div>
  )
}
export default RegistrationForm;