import {getUserToken} from "../../../util/getUserToken";
import uku from "../../../util/HTTP_Agent";
import {endpoints} from "../../../api/endpoints";

export const changePhoneNumber = async (setLoading, phone) => {
  const token = getUserToken()
  const headers = {
    "Authorization": `Token ${token}`,
    "Content-Type": "application/json",
  }

  setLoading(true)
  const res = await fetch(uku + endpoints.changeOldPhone, {
    headers,
    body: JSON.stringify({
      phone: `+${phone}`
    }),
    method: "POST"
  })
  return await res.json()
}