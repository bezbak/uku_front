import uku from '/util/HTTP_Agent'
import {endpoints} from "../../api/endpoints";
import {getUserToken} from "../../util/getUserToken";

export const uploadImages = async (arr) => {
  const token = getUserToken()
  const images = new FormData()
  console.log(arr)
  for (const file of arr) {
    images.append("images", file)
  }


  const uploadImagesResponse = await fetch(uku + endpoints.uploadImages, {
    method: "POST",
    body: images,
    headers: {
      "Authorization": `Token ${token}`
    }
  })
  return await uploadImagesResponse.json()
}

export const createPublication = async (category, location, description, images) => {
  const res = await fetch(uku + endpoints.postPublication, {
    headers: {
      "Authorization": `Token ${getUserToken()}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      category,
      location,
      description,
      images
    }),
  })
  return res.json();
}