import {useRecoilState} from "recoil";
import createWindow from "./state";
import styles from './styles.module.scss'
import cs from 'classnames'
import {useEffect, useState} from "react";

const CreatePublication = () => {

  return (
    <div>
      <div className={styles.createBox}>
        <div className={styles.topPanel}>
                    <span
                      className={styles.close}>&times;</span>
          <span className={styles.title}>Просмотр</span>
        </div>

        <div className={styles.preview}>
          {/*<img src={URL.createObjectURL(images.files[images.previewImage])} alt=""/>}*/}
        </div>
        <div className={styles.images}>
          {/*{images.files.length && images.files.length < 10 ?*/}
          {/*  <>*/}
          {/*    <label*/}
          {/*      className={styles.addMoreImage}*/}
          {/*      htmlFor="upload-photo"/>*/}
          {/*    <input*/}
          {/*      onChange={({target: {files}}) => onInputFile(files)}*/}
          {/*      type="file"*/}
          {/*      name="photo"*/}
          {/*      id="upload-photo"/>*/}
          {/*  </>*/}
          {/*  : null}*/}
          {/*{images.files.map((image, index) => {*/}
          {/*  return <img*/}
          {/*    style={images.previewImage === index ? {border: "1px solid red"} : {}}*/}
          {/*    onClick={() => setImages(old => ({...old, previewImage: index}))}*/}
          {/*    className={styles.imagesList}*/}
          {/*    key={index}*/}
          {/*    src={URL.createObjectURL(image)}*/}
          {/*    alt=""/>*/}
          {/*})}*/}

        </div>
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
      </div>
    </div>

  )
}

export default CreatePublication;

