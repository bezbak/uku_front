import uku from '../../../util/HTTP_Agent'
import {endpoints} from "../../../api/endpoints";
import {getUserToken} from "../../../util/getUserToken";

export const fetchCategory = async id => {
  const token = getUserToken()
  const headers = {
    "Authorization": `Token ${token}`
  }
  const res = await fetch(uku + endpoints.fetchCategoryID + id, token ? {headers} : null)
  return await res.json()
}