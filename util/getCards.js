import uku from "../adapters/HTTP_Agent";
import {endpoints} from "../api/endpoints";

export async function getCards(page) {
  const token = window.localStorage.getItem("token")
  const headers = {
    headers: {
      Authorization: `Token ${token}`
    }
  }
  const res = await fetch(uku + endpoints.feed + `?page=${page}`, token ? headers : null)
  return res.json()
}