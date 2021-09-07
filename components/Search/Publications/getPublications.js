import uku from "../../../util/HTTP_Agent";
import {endpoints} from "../../../api/endpoints";
import {getUserToken} from "../../../util/getUserToken";

export async function getPublications(page) {
  const token = getUserToken()

  const res = await fetch(uku + endpoints.feed + `?page=${page}`, {
    headers: {
      Authorization: `Token ${token}`,
    }
  })
  return res.json()
}