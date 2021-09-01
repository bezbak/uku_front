import uku from "./HTTP_Agent";
import {endpoints} from "../api/endpoints";

export async function getFavoriteCards(page) {
  const token = window.localStorage.getItem("token")
  const headers = {
    headers: {
      Authorization: `Token ${token}`
    }
  }
  const res = await fetch(uku + endpoints.favorites + `?page=${page}`, headers)
  return res.json()
}