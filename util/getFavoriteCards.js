import uku from "./HTTP_Agent";
import {endpoints} from "../api/endpoints";
import {getUserToken} from "./getUserToken";

export async function getFavoriteCards(page) {
  const token = getUserToken()
  const headers = {
    headers: {
      Authorization: `Token ${token}`
    }
  }
  const res = await fetch(uku + endpoints.favorites + `?page=${page}`, headers)
  return await res.json()
}
