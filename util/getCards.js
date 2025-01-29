import uku from "./HTTP_Agent";
import {endpoints} from "../api/endpoints";

export async function getCards(page) {
  const token = JSON.parse(window.localStorage.getItem("token"))
  const headers = {
    headers: {
      Authorization: `Token ${token}`
    }
  }
  const res = await fetch(uku + endpoints.feed + `?page=${page}`, token ? headers : null)
  return res.json()
}