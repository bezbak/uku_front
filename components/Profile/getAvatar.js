import uku from "../../adapters/HTTP_Agent";
import {endpoints} from "../../api/endpoints";
import {getUserToken} from "../../util/getUserToken";

export function getAvatar(setAvatar) {
  const token = getUserToken()
  console.log(token)
  fetch(uku + endpoints.userAvatar, {
    method: "GET",
    headers: {
      "Authorization": `Token ${token}`
    }
  }).then(res => res.json().then(data => {
    setAvatar(data && data.avatar)
  }))
}