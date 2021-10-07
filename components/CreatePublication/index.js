import styles from './styles.module.scss'
import {useRecoilState} from "recoil";
import {categoryAtom, photosAtom, textAtom} from "./state";
import {createPublication, uploadImages} from "./functions";
import {locationAtom} from "../HeaderNavbar/Location/state";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import Spinner from "../Spinner/Spinner";

const CreatePublication = () => {
  const [photos, setPhotos] = useRecoilState(photosAtom)
  const [category, setCategory] = useRecoilState(categoryAtom)
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useRecoilState(textAtom)
  const [location] = useRecoilState(locationAtom)
  const router = useRouter()

  useEffect(() => {
    setCategory(null)
  }, [])


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
    setLoading(true)
    uploadImages(images).then(images => {
      createPublication(categoryID, locationID, description, images).then(data => {
        if (data.is_created) {
          router.push(`/detail/${data.publication_id}`)
        } else {
          toast.error("Что-то пошло не так")
        }
      }).finally(() => {
        setLoading(false)
      })
    })
  }

  const onClickImageForPreview = index => {
    setPhotos(old => ({...old, preview: index}))
  }

  const onClickDeletePhoto = (e, photo, index) => {
    e.stopPropagation()
    if (photos.files.length === 1) {
      toast.error("Нельзя опубликовать без фото")
      return
    }
    setPhotos(old => ({...old, files: old.files.splice(index, 1)}))
  }

  console.log(description.length / 2 > 150)

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
            return <div key={index} className={styles.imageItem}>
              <img
                style={photos.preview === index ? {border: "1px solid red"} : {}}
                onClick={() => onClickImageForPreview(index)}
                className={styles.imagesList}
                src={URL.createObjectURL(image)}
                alt=""
              />
              <span onClick={e => onClickDeletePhoto(e, image, index)}>&times;</span>
            </div>

          })}
        </div>
        <div className={styles.bottomPanel}>
          <textarea
            style={{height: (description.length / 2) > 90 ? "90px" : `${description.length / 2}px`}}
            name="text"
            id="text"
            cols="80"
            rows="3"
            value={description}
            onChange={({target: {value}}) => setDescription(value)}
          />
          <button
            disabled={!!!description || !!!category}
            onClick={() => onClickCreatePublication(category && category.id, location?.region?.id, description, photos.files)}>
            {loading ? <Spinner/> : "Опубликовать"}
          </button>
        </div>
      </div>
    </div>

  )
}

export default CreatePublication;

