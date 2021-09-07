import styles from "../../CreatePublication/styles.module.scss";

const CreatePublicationWithoutPhoto = () => {
  return(
    <div className={styles.bottomPanel}>
      <label htmlFor="upload-photo"/>
      <input
        type="file"
        name="photo"
        id="upload-photo"/>
      <textarea
        name="text"
        id="text"
        cols="80"
        rows="1"/>
      <button>Опубликовать</button>
    </div>
  )
}

export default CreatePublicationWithoutPhoto;