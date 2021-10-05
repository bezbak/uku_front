import styles from './styles.module.scss'
import {useRecoilState, useRecoilValue} from "recoil";
import {categoryAtom, photosAtom} from "./state";
import {createPublication, uploadImages} from "./functions";
import {locationAtom} from "../HeaderNavbar/Location/state";
import {useState} from "react";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const CreatePublication = () => {
  const [photos, setPhotos] = useRecoilState(photosAtom)
  const category = useRecoilValue(categoryAtom)
  const [{locationID}] = useRecoilState(locationAtom)
  const [description, setDescription] = useState("")
  const router = useRouter()


  const onInputFile = file => {
    setPhotos(old => ({...old, files: [...old.files, ...file]}))
  }

  const onClickCreatePublication = (categoryID, locationID, description, images) => {

    if (images.length !== 1) {
      setPhotos(old => {
        let newObj = {...old}
        let b = newObj.files[0];
        newObj.files[0] = newObj.files[old.preview];
        newObj.files[old.preview] = b;
        newObj.preview = 0
        return newObj
      })
    }

    if (!description) {
      toast.error("Напишите описание публикации")
      return
    }
    if (!categoryID) {
      toast.error("Выберите категорию")
      return
    }

    uploadImages(images).then(images => {
      createPublication(categoryID, locationID, description, images).then(data => {
        if (data.is_created) {
          router.push(`/detail/${data.publication_id}`)
        } else {
          toast.error("Что-то пошло не так")
        }
      })
    })
  }

  const onClickImageForPreview = index => {
    setPhotos(old => ({...old, preview: index}))
  }

  return (
    <div>
      <div className={styles.createBox}>
        <div className={styles.topPanel}>
                    <span
                      onClick={() => router.back()}
                      className={styles.close}>&times;
                    </span>
          <span className={styles.title}>Просмотр</span>
        </div>
        <div className={styles.preview}>
          {!!photos.files.length ? <img src={URL.createObjectURL(photos.files[photos.preview])} alt=""/> : null}
        </div>
        <div className={styles.images}>
          {photos.files.length && photos.files.length < 10 ?
            <>
              <label
                className={styles.addMoreImage}
                htmlFor="upload-photo"/>
              <input
                onChange={({target: {files}}) => onInputFile(files)}
                type="file"
                name="photo"
                id="upload-photo"/>
            </>
            : null}
          {Array.from(photos.files).map((image, index) => {
            return <img
              style={photos.preview === index ? {border: "1px solid red"} : {}}
              onClick={() => onClickImageForPreview(index)}
              className={styles.imagesList}
              key={index}
              src={URL.createObjectURL(image)}
              alt=""
            />
          })}
        </div>
        <div className={styles.bottomPanel}>
          <textarea
            name="text"
            id="text"
            cols="80"
            rows="1"
            onChange={({target: {value}}) => setDescription(value)}
          />
          <button
            onClick={() => onClickCreatePublication(category && category.id, locationID, description, photos.files)}>
            Опубликовать
          </button>
        </div>
      </div>
    </div>

  )
}

export default CreatePublication;

