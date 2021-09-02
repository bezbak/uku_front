import uku from "./HTTP_Agent";
import {endpoints} from "../api/endpoints";

export async function getFavoriteCards(page) {
  const token = JSON.parse(window.localStorage.getItem("token"))
  const headers = {
    headers: {
      Authorization: `Token ${token}`
    }
  }
  return await fetch(uku + endpoints.favorites + `?page=${page}`, headers)
}