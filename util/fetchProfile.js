import uku from './HTTP_Agent'
import {endpoints} from "../api/endpoints";

export async function fetchProfile(id) {
  const res = await fetch(uku + endpoints.profileID + id)
  return await res.json()
}