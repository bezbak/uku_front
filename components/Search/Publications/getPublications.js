import uku from "../../../util/HTTP_Agent";
import {endpoints} from "../../../api/endpoints";
import {getUserToken} from "../../../util/getUserToken";

export async function getPublications(category_id, page = 1, location_id = "", q = null) {
  const token = getUserToken()
  const headers = {Authorization: `Token ${token}`,}

  let url = new URL(uku + endpoints.fetchCategoryID)
  let params = {category_id, page, location_id, q}

  Object.keys(params).forEach(key => {
    if (params[key]) {
      url.searchParams.append(key, params[key])
    }
  })

  const res = await fetch(url.toString(), token ? {headers} : null)
  return res.json()

}