import uku from "../../../util/HTTP_Agent";
import {endpoints} from "../../../api/endpoints";

export async function getPublications(page) {
  const res = await fetch(uku + endpoints.feed + `?page=${page}`)
  return res.json()
}