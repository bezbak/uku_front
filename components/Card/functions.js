import {toast} from "react-toastify";
import uku from "../../util/HTTP_Agent";
import {endpoints} from "../../api/endpoints";

export const onClickFavourite = (id, index, setRecoilState) => {
  if (!!!localStorage.getItem("token")) {
    toast.error("Требуется авторизация")
    return
  }
  setRecoilState(old => {
    const newObj = {...old}
    newObj.results[index].is_favorite = !newObj.results[index].is_favorite
    return newObj
  })
  fetch(uku + endpoints.favouriteID + id, {
    headers: {
      Authorization: `Token ${JSON.parse(window.localStorage.getItem("token"))}`
    }
  }).then(res => {
    res.json().then(data => {
      toast.info(data.message)
    })
  }).catch(e => {
    toast.error("Ошибка добавления в избранное")
  })
}