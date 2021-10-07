import styles from "./styles.module.scss"
import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import {categoryAtom, photosAtom, textAtom} from "../../CreatePublication/state";
import {postPublication} from "./functions";
import {locationAtom} from "../../HeaderNavbar/Location/state";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import Spinner from "../../Spinner/Spinner";


const CreatePublicationWithoutPhoto = () => {
  const category = useRecoilValue(categoryAtom)
  const resetCategory = useResetRecoilState(categoryAtom)
  const [, setPhotos] = useRecoilState(photosAtom)
  const [description, setDescription] = useRecoilState(textAtom)
  const [loading, setLoading] = useState(false)
  const [location] = useRecoilState(locationAtom)

  const router = useRouter()

  useEffect(() => {
    if (router.pathname !== "/search") {
      resetCategory()
    }
  }, [router.pathname])

  const onClickSendPublication = (categoryID, locationID, description) => {
    if (!description) {
      toast.error("Напишите описание")
      return
    }
    setLoading(true)
    postPublication(categoryID, locationID, description).then(res => {
      if (res.is_created) {
        router.push(`/detail/${res.publication_id}`)
      }
    }).finally(() => {
      setLoading(false)
    })
  }

  const onInputFile = ({target: {files}}) => {
    setPhotos(old => ({...old, files}))
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
        value={description}
        rows="1"/>
      <button
        disabled={!!!description}
        onClick={() => onClickSendPublication(category.id, location?.region?.id, description)}>
        {loading ? <Spinner/> : "Опубликовать"}
      </button>
    </div>
  )
}

export default CreatePublicationWithoutPhoto;