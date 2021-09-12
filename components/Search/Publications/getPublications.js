import uku from "../../../util/HTTP_Agent";
import {endpoints} from "../../../api/endpoints";
import {getUserToken} from "../../../util/getUserToken";

export async function getPublications(categoryID, page = 1) {
  if (categoryID) {
    const token = getUserToken()
    const headers = {Authorization: `Token ${token}`,}

    const res = await fetch(uku + endpoints.fetchCategoryID + `${categoryID}?page=${page}`, token ? {headers} : null)
    return res.json()
  } else {
    const token = getUserToken()
    const headers = {Authorization: `Token ${token}`,}

    const res = await fetch(uku + endpoints.publicationSearch + `?page=${page}`, token ? {headers} : null)
    return res.json()
  }


}