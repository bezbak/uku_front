import {getUserToken} from "../../util/getUserToken";
import uku from '../../util/HTTP_Agent'
import {endpoints} from "../../api/endpoints";
import {toast} from "react-toastify";

export const saveProfile = async (data) => {
  const token = getUserToken()
  const headers = {
    "Authorization": `Token ${token}`,
    "Content-Type": "application/json"
  }

  const res = await fetch(uku + endpoints.updateProfile,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers
    }
  )
  return await res.json()
}

export const uploadAvatar = async avatar => {
  const token = getUserToken()
  const headers = {
    "Authorization": `Token ${token}`,
  }

  const res = await fetch(uku + endpoints.uploadAvatar,
    {
      method: "PATCH",
      body: avatar,
      headers
    }
  )
  return await res.json()
}

export const isAvatarExist = avatar => {
  if (typeof avatar === "object") {
    return URL.createObjectURL(avatar)
  } else {
    return avatar
  }
}

export const logout = (router) => {
  localStorage.setItem("token", "")
  setTimeout(() => {
    router.push("/")
  }, 100)
}

export const onClickSaveProfile = (e, data, setLoading) => {

  e.preventDefault()
  setLoading(true)

  saveProfile(data).then(data => {
    setLoading(false)
    toast.success("Данные успешно обновлены")
  }).catch(e => {
    toast.error("Ошибка, данные не обновлены")
    setLoading(false)
  })
}

export const onUploadAvatar = (files, setProfileImage, setProfile) => {

  setProfileImage(files[0])
  const formData = new FormData()
  formData.append("avatar", files[0])

  uploadAvatar(formData).then(data => {
    toast.success("Аватар успешно загружен")
    setProfile(old => ({...old, updated: !old.updated}))
  }).catch(e => {
    toast.error("Ошибка загрузки")
  })
}

export const changePhoneNumber = (number, setModalReset) => {
  console.log(number.length)

  if (number.length < 12) {
    toast.error("Введите корректный номер телефона, Например +996 700 200 300")
  } else {
    setModalReset(old => !old)
  }
}

export const onConfirmChangePhone = (number, router) => {
  const token = getUserToken()
  const headers = {
    "Authorization": `Token ${token}`,
  }

  fetch(uku + endpoints.changePhoneRequest, {
    headers,
  }).then(res => {
    if (res.status === 429) {
      toast.error("Слишком много запросов отправки сообщения, повторите позже")
    }

    if (res.status === 200) {
      toast.success("Сообщение отправлено")
      router.push({
        pathname: '/resetPassword',
        query: {number},
      })
    }
  }).catch(e => {
    console.log(e.status)
    if (e.status === 429) {
      toast.error("Слишком много запросов отправки сообщения, повторите позже")
    }
  })
}