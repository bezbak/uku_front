import uku from '/util/HTTP_Agent'
import {endpoints} from "../../api/endpoints";
import {getUserToken} from "../../util/getUserToken";

export const createPublication = async (categoryID, locationID, description, images) => {
  const token = getUserToken()
  const formData = new FormData()

  for (const file of images) {
    formData.append(file.name, file)
  }

  const uploadImagesResponse = await fetch(uku + endpoints.uploadImages, {
    method: "POST",
    body: formData,
    headers: {
      // "Content-Type": "multipart/form-data; boundary=something;",
      "Authorization": `Token ${token}`
    }
  })
  return await uploadImagesResponse.json()
}