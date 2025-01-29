import uku from '/util/HTTP_Agent'
import {endpoints} from "../../../api/endpoints";
import {getUserToken} from "../../../util/getUserToken";

export const postPublication = async (category, location, description) => {
  const token = getUserToken()
  const res = await fetch(uku + endpoints.postPublication, {
    body: JSON.stringify({
      category,
      location,
      description
    }),
    method: "POST",
    headers: {
      "Authorization": `Token ${token}`,
      "Content-Type": "application/json",
    }
  })
  return await res.json()
}