import uku from '../../../util/HTTP_Agent'
import {endpoints} from "../../../api/endpoints";

export async function getProfileCards(id, page) {
  const res = await fetch(uku + endpoints.profileID + id + `/publications?page=${page}`)
  return await res.json()
}