import React, {useState} from "react";
import {Field, Form} from "react-final-form";
import classNames from "classnames";
import Button from "../../Button";
import UserPhoneEdit from '../../../public/icons/Edit.svg'
import styles from './styles.module.scss';
import {shallowEqual, useSelector} from "react-redux";
import pathnames from "../../../constants/pathnames";
import {actions} from "../../../public/store/users/slice";
import BackArrow from '../../../public/icons/backArrow.svg'
import ImgIcon from '../../../public/icons/img.svg'
import NavLink from "../../NavLink";

const Avatar = ({input})=>{
  const [fileAddress, setFileAddress] =useState();
  const onChangeImg = (e) => {

    input.onChange(e.target.value)
    const image = new Image();
    setFileAddress(URL.createObjectURL(e.target.files[0]))
    image.src = e.target.result;
    image.onload = function () {
      document.getElementById('avatar').src = image.src;
    }
  }
  return(
    <div>
     <div className={styles.editProfileForm__avatarBox__avatar}>
       <img id="avatar" src={fileAddress} />
     </div>
      <label className={styles.editProfileForm__avatarBox__avatarLabel}>
        <ImgIcon/>
        <span  className={styles.editProfileForm__avatarBox__avatarLabel_text}>
          Изменить фото профиля
        </span>

        <input type="file" placeholder=" Изменить фото профиля"
               accept="image/*"
               style={{visibility:'hidden'}}
               onChange={(e)=>onChangeImg(e)}
               className={styles.editProfileForm__avatarBox__avatarLabel__input}
        />
      </label>
    </div>
  )
}
const EditProfileForm = ({user=false}) => {
  const confCodeRequest = (payload) => dispatch(actions.conformCodeRequestStart(payload));
  const userPhone = useSelector((store) => store.auth?.phone, shallowEqual);
  const onSubmit = (value) =>
    new Promise((resolve) => {
      const values = Object.assign(value, userPhone)
      confCodeRequest({
        values,
        callback: (response) => {
          console.log(response)
          if (!response) {
            push(pathnames.registration);
          }
          resolve(response);
        },
      });
    })
  const onChangeAvatar= (value) => {
    console.log(value)
  }
  return(
    <div className={styles.editProfileForm}>
      <Button className={styles.editProfileForm__backButton}   textClassName={styles.editProfileForm__backButton__text}>
        <NavLink>
          <BackArrow/>
          Назад
        </NavLink>
      </Button>
      <Form
        onSubmit={onChangeAvatar}
        // validate={validate}
        render={({handleSubmit, values, submitting, form, pristine}) => (
          <form onSubmit={handleSubmit}>
            {console.log(values)}
            <Field
                name="avatar"
                component={Avatar}
              />
          </form>)
        }
        />
      <Form
        onSubmit={onSubmit}
        // validate={validate}
        render={({handleSubmit, values, submitting, form, pristine}) => (
          <form onSubmit={handleSubmit}>
            <div>
              {console.log(values)}
              <div className={styles.editProfileForm__form__cardTitle}>Номер</div>
              <Field
                name="phone"
                component="input"
                type="input"
                defaultValue={userPhone?.phone}
                value={userPhone?.phone}
                placeholder={userPhone?.phone}
                className={styles.editProfileForm__form__input}
              />
              <Button className={styles.editProfileForm__editUserPhoneButton}>
                <UserPhoneEdit/>
              </Button>
            </div>
            <div className={styles.editProfileForm__form__cardTitle}>Контактные данные</div>
            <div className={styles.editProfileForm__form__label}>Инстаграм</div>

            <Field
              name="instagram"
              component="input"
              type="text"
              placeholder="Инстаграм"
              className={styles.editProfileForm__form__input}

            />
            <div className={styles.editProfileForm__form__label}>Номер Whats App</div>
            <Field
              name="whatsapp"
              component="input"
              type="text"
              placeholder="Номер телефона"
              className={styles.editProfileForm__form__input}
              required
            />
            <div className={styles.editProfileForm__form__label}>Telegram</div>
            <Field
              name="telegram"
              component="input"
              type="text"
              placeholder="Ваш ник "
              className={styles.editProfileForm__form__input}
              required
            />
            <Button type="submit"
                    disabled={submitting || pristine}
                    className={classNames(styles.editProfileForm__form__submitButton)} textClassName={styles.editProfileForm__form__submitButton__text}>Сохранить
            </Button>
            <Button type="button"
                    disabled={submitting || pristine}
                    className={classNames(styles.editProfileForm__form__logOutButton)} textClassName={styles.editProfileForm__form__logOutButton__text}>Выйти из аккаунта
            </Button>
          </form>
        )}
      />
    </div>
  )
}
export default EditProfileForm;