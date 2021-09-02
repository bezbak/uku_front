import uku from "../../util/HTTP_Agent";
import {endpoints} from "../../api/endpoints";

export function getMyProfileInfo() {
  return fetch(uku + endpoints.userProfile, {
    method: "GET",
    headers: {
      Authorization: `Token ${JSON.parse(localStorage.getItem("token"))}`
    }
  })
}