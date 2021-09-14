import uku from '../../../util/HTTP_Agent'
import {endpoints} from "../../../api/endpoints";
import {getUserToken} from "../../../util/getUserToken";
import {toast} from "react-toastify";

export const onConfirmCodeReset = (confirmation_code) => {
  const token = getUserToken()
  const headers = {
    "Authorization": `Token ${token}`,
    "Content-Type": "application/json",
  }

  return fetch(uku + endpoints.oldPhoneConfirm, {
    method: "POST",
    headers,
    body: JSON.stringify({
      confirmation_code
    })
  })

}

export const onResendConfirmCode = (setLoading, setTime) => {
  setLoading(true)
  const token = getUserToken()
  const headers = {
    "Authorization": `Token ${token}`,
  }

  fetch(uku + endpoints.changePhoneRequest, {
    headers,
  }).then(res => {
    if (res.status === 429) {
      setTime(60)
      toast.error("Слишком много запросов отправки сообщения, повторите позже")
    }

    if (res.status === 200) {
      setTime(60)
      toast.success("Сообщение отправлено")
    }
  }).catch(e => {
    console.log(e.status)
    if (e.status === 429) {
      toast.error("Слишком много запросов отправки сообщения, повторите позже")
    }
  }).finally(() => {
    setLoading(false)
  })
}