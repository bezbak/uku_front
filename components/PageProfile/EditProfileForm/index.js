import React, {useState} from "react";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {Field, Form} from "react-final-form";
import classNames from "classnames";
import useNavigationMenu from '../../../hooks/useNavigationMenu';
import Button from "../../Button";
import Modal from "../../UI/Modal";
import NavLink from "../../NavLink";
import pathnames from "../../../constants/pathnames";
import UserPhoneEdit from '../../../public/icons/Edit.svg'
import {actions as authAction} from "../../../store/users/slice";
import {actions as profileAction} from "../../../store/profile/slice";
import BackArrow from '../../../public/icons/backArrow.svg'
import ImgIcon from '../../../public/icons/img.svg'
import styles from './styles.module.scss';

const Avatar = ({input}) => {

  const {push} = useRouter();
  const dispatch = useDispatch();
  const [fileAddress, setFileAddress] = useState();

  const updateAvatarRequest = (payload) => dispatch(profileAction.updateAvatarRequestStart(payload));

  const onChangeImg = (e) => {
    input.onChange(e.target.value)
    const image = new Image();
    setFileAddress(URL.createObjectURL(e.target.files[0]))
    image.src = e.target.result;
    image.onload = function () {
      document.getElementById('avatar').src = image.src;
    }
    return new Promise((resolve) => {
      updateAvatarRequest({
        value:e.target.value,
        callback: (response) => {
          console.log(e.target.value)
          if (!response) {
            setTimeout(()=> push(pathnames.codeConfirmation),2000)
          }
          resolve(response);
        },
      });
    })
  }
  return (
    <div>
      <div className={styles.editProfileForm__avatarBox__avatar}>
        <img id="avatar" src={fileAddress}/>
      </div>
      <label className={styles.editProfileForm__avatarBox__avatarLabel}>
        <ImgIcon/>
        <span className={styles.editProfileForm__avatarBox__avatarLabel_text}>
          Изменить фото профиля
        </span>

        <input type="file" placeholder=" Изменить фото профиля"
               accept="image/*"
               style={{visibility: 'hidden'}}
               onChange={(e) => onChangeImg(e)}
               className={styles.editProfileForm__avatarBox__avatarLabel__input}
        />
      </label>
    </div>
  )
}

const EditProfileForm = ({user = false}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isInitialized, setInitialized] = React.useState(false);
  const [isPhoneNumberModalOpen, setIsPhoneNumberModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, actions] = useNavigationMenu();
  const editProfileFormRef = React.useRef();

  React.useEffect(async () => {
    setInitialized(true);
  }, []);

  const closeNavigationMenu = () => {
    actions.update(!state);
  }

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (editProfileFormRef.current && !editProfileFormRef.current.contains(event.target)) {
        closeNavigationMenu()
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editProfileFormRef]);

  React.useEffect(() => {
    router.events.on('routeChangeStart', closeNavigationMenu);

    return () => {
      router.events.off('routeChangeStart', closeNavigationMenu);
    }
  }, []);

  const onClick = (selector) => {
    closeNavigationMenu();
  }
  const updateProfileRequest = (payload) => dispatch(profileAction.updateProfileRequestStart(payload));
  const sendSmsToOldPhone = (payload) => dispatch(authAction.sendSmsToOldPhoneRequestStart(payload));

  const logoutRequest = () => dispatch(authAction.logoutRequestStart());
  const userInfo = useSelector((store) => store.profile.userProfile);
  const onChangeAvatar = (value) => {
    console.log(value)
  }
  const changeProfile = (value) => {
    return new Promise((resolve) => {
      updateProfileRequest({
        value,
        callback: (response) => {
          if (!response) {
            setTimeout(()=> router.push(pathnames.profile),2000)
          }
          resolve(response);
        },
      });
    })
  }

  const changePhoneNumber = () =>
    new Promise((resolve) => {
      sendSmsToOldPhone({
        callback: (response) => {
          if (!response) {
            setTimeout(()=> router.push(pathnames.codeConfirmation),1000)
          }
          resolve(response);
        },
      });
    })

  const logOutAsk = () =>{
    setIsModalOpen(true)
  }

  const logOut = () => {
    logoutRequest();
    setIsModalOpen(false);
    router.push('/')
  }

  return (
    <>
      <div ref={editProfileFormRef} className={classNames('no-scrollbar', styles.editProfileForm, {
        [styles.editProfileForm_transition]: isInitialized,
        [styles.editProfileForm_opened]: state.isOpened
      })}>
        <div className={styles.editProfileForm_content}>
          <Button className={styles.editProfileForm__backButton}
                  textClassName={styles.editProfileForm__backButton__text}>
            <NavLink>
              <BackArrow/>
              Назад
            </NavLink>
          </Button>
          <Form
            onSubmit={onChangeAvatar}
            render={({handleSubmit, values, submitting, form, pristine}) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="avatar"
                  component={Avatar}
                />
              </form>)
            }
          />

          <div>
            <div className={styles.editProfileForm__form__cardTitle}>Номер</div>
            <input
              name="phone"
              type="input"
              defaultValue={userInfo?.phone}
              placeholder={userInfo?.phone}
              className={styles.editProfileForm__form__input}
            />
            <Button className={styles.editProfileForm__editUserPhoneButton}
                    onClick={() => setIsPhoneNumberModalOpen(true)}>
              <UserPhoneEdit/>
            </Button>
          </div>
          <Form
            onSubmit={changeProfile}
            render={({handleSubmit, values, submitting, form, pristine}) => (
              <form onSubmit={handleSubmit}>
                <div className={styles.editProfileForm__form__cardTitle}>Контактные данные</div>
                <div className={styles.editProfileForm__form__label}>Инстаграм</div>

                <Field
                  name="instagram"
                  component="input"
                  type="text"
                  placeholder="Инстаграм"
                  defaultValue={userInfo?.instagram}
                  className={styles.editProfileForm__form__input}

                />
                <div className={styles.editProfileForm__form__label}>Номер Whats App</div>
                <Field
                  name="whatsapp"
                  component="input"
                  type="text"
                  defaultValue={userInfo?.whatsapp}
                  placeholder="Номер телефона"
                  className={styles.editProfileForm__form__input}
                  required
                />
                <div className={styles.editProfileForm__form__label}>Telegram</div>
                <Field
                  name="telegram"
                  component="input"
                  defaultValue={userInfo?.telegram}
                  type="text"
                  placeholder="Ваш ник "
                  className={styles.editProfileForm__form__input}
                  required
                />
                <Button type="submit"
                        disabled={submitting || pristine}
                        className={classNames(styles.editProfileForm__form__submitButton)}
                        textClassName={styles.editProfileForm__form__submitButton__text}>Сохранить
                </Button>
                <Button type="button"
                        disabled={submitting || pristine}
                        className={classNames(styles.editProfileForm__form__logOutButton)}
                        textClassName={styles.editProfileForm__form__logOutButton__text}
                        onClick={(logOutAsk)}
                >Выйти из аккаунта
                </Button>
              </form>
            )}
          />

        </div>
      </div>
      <Modal modalOpen={isPhoneNumberModalOpen}>
        <div className={styles.editProfileForm__modal}>
          <div className={styles.editProfileForm__modal__title}>
            <span>
              Вы действительно хотите сменить номер?
            </span>
          </div>
          <div className={styles.editProfileForm__modal_buttons}>
            <Button className={styles.editProfileForm__modal__changeButton}
                    textClassName={styles.editProfileForm__modal__changeButton_text}
                    onClick={changePhoneNumber}
            >
              Сменить
            </Button>
            <Button className={styles.editProfileForm__modal__cancelButton}
                    textClassName={styles.editProfileForm__modal__cancelButton_text}
                    onClick={() => setIsPhoneNumberModalOpen(false)}
            >Отмена</Button>
          </div>
        </div>
      </Modal>

      <Modal modalOpen={isModalOpen}>
        <div className={styles.editProfileForm__modal}>
          <div className={styles.editProfileForm__modal__title}>
            <span>
              Вы действительно хотите выйти?
            </span>
          </div>
          <div className={styles.editProfileForm__modal_buttons}>
            <Button className={styles.editProfileForm__modal__changeButton}
                    textClassName={styles.editProfileForm__modal__changeButton_text}
                    onClick={logOut}
            >
              Выйти
            </Button>
            <Button className={styles.editProfileForm__modal__cancelButton}
                    textClassName={styles.editProfileForm__modal__cancelButton_text}
                    onClick={() => setIsModalOpen(false)}
            >Отмена</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
export default EditProfileForm;