import {toast} from "react-toastify";
import uku from "../../util/HTTP_Agent";
import {endpoints} from "../../api/endpoints";
// **********************************************************************

export const fetchStatus = id => {
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
// **********************************************************************
export const onClickFavourite = (id, index, setRecoilState, e, page) => {

  e.stopPropagation()

  if (!!!localStorage.getItem("token")) {
    toast.error("Требуется авторизация")
    return
  }

  if (page === "favorite") {
    setRecoilState(old => {
      const newObj = {...old}
      newObj.results.splice(index, 1)
      return newObj
    })

    fetchStatus(id)

    return
  }

  setRecoilState(old => {
    const newObj = {...old}
    newObj.results[index].is_favorite = !newObj.results[index].is_favorite
    return newObj
  })

  fetchStatus(id)

}