import styles from './styles.module.scss'
import {useRecoilState, useRecoilValue} from "recoil";
import {categoryAtom, photosAtom} from "./state";
import {createPublication} from "./functions";
import {locationAtom} from "../HeaderNavbar/Location/state";
import {useState} from "react";

const CreatePublication = () => {
  const [photos, setPhotos] = useRecoilState(photosAtom)
  const category = useRecoilValue(categoryAtom)
  const [{locationID}, setLocation] = useRecoilState(locationAtom)
  const [description, setDescription] = useState("")

  const onInputFile = file => {
    setPhotos(old => ({...old, files: [...old.files, ...file]}))
  }

  const onClickCreatePublication = (categoryID, locationID, description, images) => {
    createPublication(categoryID, locationID, description, images).then(data => {
      console.log(data)
    })
  }

  return (
    <div>
      <div className={styles.createBox}>
        <div className={styles.topPanel}>
                    <span
                      className={styles.close}>&times;</span>
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
              onClick={() => setPhotos(old => ({...old, preview: index}))}
              className={styles.imagesList}
              key={index}
              src={URL.createObjectURL(image)}
              alt=""/>
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
            onClick={() => onClickCreatePublication(category.id, locationID, description, photos.files)}>
            Опубликовать
          </button>
        </div>
      </div>
    </div>

  )
}

export default CreatePublication;

