import React, {useState} from 'react';
import styles from './style.module.scss'
import {useRecoilState} from "recoil";
import {detailPublicationState, modalStateFlag} from "../Detail/state";
import {updatePublication, uploadImages} from "../CreatePublication/functions";
import {toast} from "react-toastify";
import {getDetailPublication} from "../Detail/request";
import {useRouter} from "next/router";

const ModalUpdatePublication = () => {
  const [modalState, setModalState] = useRecoilState(modalStateFlag)
  const [recoilState, setRecoilState] = useRecoilState(detailPublicationState)
  const [photosState, setPhotosState] = useState([])
  const [photosId, setPhotosId] = useState([])
  const categoryID = recoilState?.category?.id
  const locationID = recoilState?.location?.id
  const description = recoilState?.description
  const publicationId = recoilState?.id
  const router = useRouter()

  console.log(router.query)

  React.useEffect(() => {
    setPhotosId(recoilState?.images?.map(item => {
      return item.id
    }))
  }, [recoilState.images])

  React.useEffect(async () => {
    const detail = await getDetailPublication()
    setRecoilState(detail)
  }, [modalState.deleteImageModal, modalState.updateModal])

  const deleteImageHandler = (e, key, flag, id) => {
    e.preventDefault()
    e.stopPropagation()
    setModalState(old => ({...old, [key]: flag, imageId: id}))
    router.push({
      pathname: '/detail/[pid]',
      query: {pid: publicationId, edit: false},
    })
  }

  const onInputFile = (file) => {
    setPhotosState(old => ([...old, ...file]))
  }

  const onClickUpdatePublication = () => {
    uploadImages(photosState).then(responseID => {
      updatePublication(categoryID, locationID, description, [...photosId, ...responseID], publicationId).then(res => {
        setPhotosState([])
        if (res.ok) {
          setModalState(old => ({...old, updateModal: false}))
          setPhotosState([])
          toast.success("Успешно изменено")
        } else {
          toast.error("Загруженный файл не является корректным файлом")
        }
      })
    })
  }

  const deleteImageLocal = (item) => {
    setPhotosState(photosState.filter(el => el.name !== item.name))
  }

  return (
    <div className={modalState.updateModal || router.query.edit === "true" ? styles.modal : "hide"}>
      <div className={styles.modalContent}>
        {
          recoilState &&
          <>
            <div className={styles.content_head}>
              <div>
                <span className={styles.close}
                      onClick={(e) => deleteImageHandler(e, "updateModal", false)}>&times;</span>
                <span className={styles.content_head_text}>Просмотр</span>
              </div>
              <div>
                <button>Вещи</button>
                <button>Уфа</button>
              </div>
            </div>
            <div className={styles.content_main}>
              {recoilState.images &&
              <div className={styles.prev_image}>
                <img src={recoilState?.images[0]?.image} alt="#"/>
              </div>
              }
              <div className={styles.content_main_images}>
                {
                  recoilState && recoilState.images && recoilState.images.map((item, index) => (
                    <div className={styles.content_main_imageItem}><img src={item.image} alt="imageItem" key={index}/>
                      <span className={styles.deleteImage}
                            onClick={() => deleteImageHandler("deleteImageModal", true, item.id)}>&times;</span>
                    </div>
                  ))
                }
                {Array.from(photosState)?.map((item, index) => {
                  return <div key={index} className={styles.content_main_imageItem}><img src={URL.createObjectURL(item)}
                                                                                         alt="imageItem" key={index}/>
                    <span className={styles.deleteImage} onClick={() => deleteImageLocal(item)}>&times;</span>
                  </div>
                })}
                {
                  photosId?.length < 10 && (photosState?.length + photosId?.length) < 10
                    ?
                    <>
                      <label
                        className={styles.addMoreImage}
                        htmlFor="upload-photo"/>
                      <div className={styles.input_wrapper}>
                        <input
                          onChange={({target: {files}}) => onInputFile(files)}
                          type="file"
                          name="photo"
                          id="upload-photo"
                        />
                      </div>
                    </>
                    :
                    null
                }
              </div>
            </div>
            <div className={styles.content_footer}>
              <textarea>{recoilState.description}</textarea>
              <button onClick={() => onClickUpdatePublication()}>Изменить</button>
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default ModalUpdatePublication;