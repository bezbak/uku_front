import styles from "./styles.module.scss"
import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import {categoryAtom, photosAtom} from "../../CreatePublication/state";
import {postPublication} from "./functions";
import {locationAtom} from "../../HeaderNavbar/Location/state";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {toast} from "react-toastify";


const CreatePublicationWithoutPhoto = () => {
  const category = useRecoilValue(categoryAtom)
  const resetCategory = useResetRecoilState(categoryAtom)
  const [{locationID}] = useRecoilState(locationAtom)
  const [, setPhotos] = useRecoilState(photosAtom)
  const [description, setDescription] = useState("")

  const router = useRouter()

  // useEffect(() => {
  //   setLocation(old => ({...old, id: JSON.parse(localStorage.getItem("authData")).region_detail.id}))
  //   resetCategory()
  // }, [])

  const onClickSendPublication = (categoryID, locationID, description) => {
    if (!description) {
      toast.error("Напишите описание")
      return
    }
    postPublication(categoryID, locationID, description).then(res => {
      if (res.is_created) {
        router.push(`/detail/${res.publication_id}`)
      }
    })
  }

  const onInputFile = ({target: {files}}) => {
    setPhotos(old => ({...old, files}))
    resetCategory()
    router.push("/createPublication")
  }

  return (
    <div className={category?.category_type?.includes("d") ? styles.bottomPanel : "hide"}>
      <label htmlFor="upload-photo"/>
      <input
        type="file"
        name="photo"
        onChange={onInputFile}
        id="upload-photo"/>
      <textarea
        onChange={({target: {value}}) => setDescription(value)}
        name="text"
        id="text"
        cols="80"
        rows="1"/>
      <button
        onClick={() => onClickSendPublication(category.id, locationID, description)}>
        Опубликовать
      </button>
    </div>
  )
}

export default CreatePublicationWithoutPhoto;