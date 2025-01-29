import styles from "./styles.module.scss"
import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import {categoryAtom, photosAtom, textAtom} from "../../CreatePublication/state";
import {postPublication} from "./functions";
import {locationAtom} from "../../HeaderNavbar/Location/state";
import {useState} from "react";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import Spinner from "../../Spinner/Spinner";
import ReactDOM from 'react-dom'


const CreatePublicationWithoutPhoto = () => {
  const [category, setCategory] = useRecoilState(categoryAtom)
  const [, setPhotos] = useRecoilState(photosAtom)
  const [description, setDescription] = useRecoilState(textAtom)
  const [loading, setLoading] = useState(false)
  const [location] = useRecoilState(locationAtom)

  const router = useRouter()

  const onClickSendPublication = (categoryID, locationID, description) => {
    if (!description) {
      toast.error("Напишите описание")
      return
    }
    setLoading(true)
    postPublication(categoryID, locationID, description).then(res => {
      if (res.is_created) {
        setDescription("")
        setCategory(null)
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
  if(typeof document === 'undefined'){
    return null
  }

  return ReactDOM.createPortal(
    <div className={category ? styles.bottomPanel : "hide"}>
      <label htmlFor="upload-photo"/>
      <input
        type="file"
        name="photo"
        onChange={onInputFile}
        id="upload-photo"
        accept=".png, .jpg, .jpeg"/>
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
    </div>,
    document.querySelector("#__next")
  )
}

export default CreatePublicationWithoutPhoto;