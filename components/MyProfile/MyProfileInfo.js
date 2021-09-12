import React, {useEffect, useRef, useState} from 'react';
import styles from "./styles.module.scss";
import ProfileInfo from "./ProfileInfo";
import PhoneInput from "react-phone-input-2";
import {useRouter} from "next/router";
import {changePhoneNumber, isAvatarExist, logout, onClickSaveProfile, onUploadAvatar} from "./functions";
import Spinner from "../Spinner/Spinner";
import cs from 'classnames'
import classNames from "classnames";

const MyProfileInfo = ({profile}) => {
  const [profileImage, setProfileImage] = useState(null)
  const [showSidebar, setShowSidebar] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [form, setForm] = useState({
    instagram: "",
    whatsapp: "",
    telegram: "",
  })
  const [loading, setLoading] = useState(false)
  const ref = useRef(null)
  const router = useRouter()

  const onChangeSocialInputs = (name, value) => {
    setForm(old => ({...old, [name]: value}))
  }

  useEffect(() => {
    setProfileImage(profile.avatar)

    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowSidebar(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])


  const sidebarClass = cs({
    [styles.show]: showSidebar,
    [styles.hide]: !showSidebar,
  })

  if (!profile) return <div/>

  return (
    <div className={styles.profileInfo}>
      <div onClick={() => setShowSidebar(old => !old)} className={styles.editProfile}/>
      <ProfileInfo profile={profile}/>
      <div ref={ref} className={classNames(styles.leftSideBar, sidebarClass)}>
        <div className={styles.editAvatar}>
          <label
            htmlFor="avatar">
            <input onChange={({target: {files}}) => onUploadAvatar(files, setProfileImage)} type="file" name="avatar"
                   id="avatar" style={{display: "none"}}/>
          </label>
          <div className={styles.filter}/>
          <div className={styles.placeholderHover}>
            <img src="/images/avatarCamera.svg" alt=""/>
            <span>Изменить фото профиля</span>
          </div>
          <img src={profileImage ? isAvatarExist(profileImage) : "/images/avatarPlaceholder.png"} alt=""/>
        </div>
        <form onSubmit={e => onClickSaveProfile(e, form, setLoading)} name="editProfile" id="editProfile">
          <h2>Номер</h2>
          <div className={styles.phoneInput}>
            <PhoneInput
              containerClass="changePhoneNumber"
              country={'kg'}
              inputProps={{
                required: true,
                name: "phone",
                autoFocus: true,
                maxLength: 16
              }}
              onChange={number => setPhoneNumber(number)}
            />
            <div className={styles.changeNumber} onClick={() => changePhoneNumber(phoneNumber, router)}/>
          </div>

          <h3>Контактные данные</h3>
          <div className={styles.socialInp}>
            <span className={styles.insta}>
              <input name="instagram" onChange={({target: {name, value}}) => onChangeSocialInputs(name, value)}
                     placeholder="Инстаграм"
                     required={true}
                     type="text"/>
            </span>
            <span className={styles.whatsapp}>
              <input name="whatsapp" onChange={({target: {name, value}}) => onChangeSocialInputs(name, value)}
                     placeholder="Номер телефона"
                     required={true}
                     type="text"/>
            </span>
            <span className={styles.telegram}>
              <input name="telegram" onChange={({target: {name, value}}) => onChangeSocialInputs(name, value)}
                     placeholder="Ваш ник"
                     required={true}
                     type="text"/>
            </span>
          </div>
          <div className={styles.btns}>
            <button className={styles.save}
                    disabled={loading}
                    type="submit">{loading ? <Spinner/> : "Сохранить"}</button>
            <button onClick={() => logout(router)} className={styles.logout}>Выйти из аккаунта</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MyProfileInfo;