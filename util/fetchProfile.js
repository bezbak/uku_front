import uku from './HTTP_Agent'
import {endpoints} from "../api/endpoints";
import {getUserToken} from "./getUserToken";

export async function fetchProfile(id) {
  const token = getUserToken()
  const headers = {
    "Authorization": `Token ${token}`
  }
  const res = await fetch(uku + endpoints.profileID + id, token ? {headers} : null)
  return await res.json()
}