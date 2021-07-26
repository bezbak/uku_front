import React, {useState} from "react";
import classNames from 'classnames';
import {Form, Field} from 'react-final-form'
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {actions} from "../../../store/publication/slice";
import Button from "../../Button";
import Location from "../../Location";
import CategoryModal from "../../CategoryModal";
import CloseIcon from '../../../public/icons/CloseIcon.svg'
import AddressIcon from '../../../public/icons/address.svg'
import ImagesSelectIcon from '../../../public/icons/imgAddIcon.svg'
import styles from './styles.module.scss'
import Cookies from "js-cookie";

const ImageSelectInput = ({input, setSelectedImages}) => {
  const onChangeImg = (e) => {
    input.onChange(e.target.files)

    for (let i = 0; i < e.target.files.length; i++) {
      // setImages(selectedImages => [...selectedImages, URL.createObjectURL(e.target.files[i])])
      setSelectedImages(selectedImages => [...selectedImages, URL.createObjectURL(e.target.files[i])])
    }
  }
  return (
    <label className={styles.userEditProfile__chooseImage}>
      <ImagesSelectIcon/>
      <input type="file"
             style={{visibility: 'hidden'}}
             onChange={onChangeImg}
             className={styles.userEditProfile__chooseImage_input}
             multiple
      />
    </label>
  )
}
const UserPublicationEdit = ({setEditPublication, editPublicationId, edit, add}) => {
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([])
  const [region, setRegion] = useState(Cookies.get("regionName"));
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [onMouseOver, setOnMouseOver] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [address, setAddress] = useState({name: region})
  const [category, setCategory] = useState()

  const publicationId = useSelector((store) => store.publication.publication_id, shallowEqual);
  const publicationInfo = useSelector((store) => store.publication.publicationInfo, shallowEqual);
  const categoryId = useSelector((store) => store.category.category_id, shallowEqual);
  const locationId = useSelector((store) => store.location.location_id, shallowEqual);

  const uploadPublicationImageRequest = (payload) => dispatch(actions.uploadPublicationImageRequestStart(payload));
  const createPublicationRequest = (payload) => dispatch(actions.createPublicationRequestStart(payload));
  const updatePublicationRequest = (payload) => dispatch(actions.updatePublicationRequestStart(payload));


  const onSubmit = (value) => {
    const files = Array.from(value.images ? value.images : [])
    let formData = new FormData()
    files.forEach((file, i) => {
      formData.append(`images`, file)
    })
    if (edit) {
      uploadPublicationImageRequest(formData)
      return new Promise((resolve) => {
        updatePublicationRequest({
          id: editPublicationId,
          description: value.description,
          callback: (response) => {
            if (!response) {
              setEditPublication(false)
            } else {
              resolve(response);
            }
          }
        });
      })
    }
    if (add) {
      uploadPublicationImageRequest(formData)
      return new Promise((resolve) => {
        createPublicationRequest({
          values: {
            location: locationId,
            category: categoryId,
            description: value.description
          },
          callback: (response) => {
            if (!response) {
              setEditPublication(false)
            } else {
              resolve(response);
            }
          }
        });
      })
    }
  }
  const removeImg = (index) => {
    const newList = selectedImages;
    newList.splice(index, 1)
    setSelectedImages(newList)
  }

  return (
    <>
      <div className={styles.userEditProfile}>
        <div className={styles.userEditProfile_header}>
          <div className={styles.userEditProfile__closeBox}>
            <Button className={styles.userEditProfile__closeBox_closeButton}
                    onClick={() => setEditPublication(false)}>
              <CloseIcon/>
            </Button>
            <span>
              Просмотр
            </span>

          </div>
          {edit && <div className={styles.userEditProfile_header_right}>
            <Button className={styles.userEditProfile_header_right_buttons}
                    textClassName={styles.userEditProfile_header_right_buttons_text}
                    onClick={() => setCategoryModalOpen(!categoryModalOpen)}>
              Вещи
              {category}
              {category?.image}
            </Button>
            <Button className={styles.userEditProfile_header_right_buttons}
                    textClassName={styles.userEditProfile_header_right_buttons_text}
                    onClick={() => setIsModalOpen(!isModalOpen)}>

              {address?.name}
              <AddressIcon/>
            </Button>
          </div>}
        </div>
        <div className={styles.userEditProfile__imageContent}>
          <img src={selectedImages[imgIndex] ? selectedImages[imgIndex] : 'images/img1.png'}/>
        </div>
        <Form
          onSubmit={onSubmit}
          render={({handleSubmit, values}) => (
            <form onSubmit={handleSubmit}>
              <div className={styles.userEditProfile__selectedImageContent}>
                {
                  selectedImages?.map((file, index) => {
                    return (
                      <div key={index}
                           onMouseOver={() => {
                             setOnMouseOver(true)
                             setImgIndex(index)
                           }}
                           onMouseLeave={() => setOnMouseOver(false)}
                           className={classNames(styles.userEditProfile__selectedImageContent_imageBox,
                             {[styles.userEditProfile__selectedImageContent_imageBox_selected]: (onMouseOver && imgIndex === index)})}>
                        <img src={file}/>
                        {(onMouseOver && imgIndex === index) && <CloseIcon
                          onClick={() => removeImg(index)}
                          className={styles.userEditProfile__selectedImageContent_imageBox_deleteImage}/>}
                      </div>
                    )
                  })
                }
                <Field name="images"
                       type="file"
                       component={ImageSelectInput} setSelectedImages={setSelectedImages}/>
              </div>
              <div className={styles.userEditProfile__descriptionContent}>
                <Field name="description" component="textarea"
                       className={styles.userEditProfile__descriptionContent_textArea}
                />

                {!edit &&
                <Button type="button"
                        className={styles.userEditProfile__descriptionContent__editButton}
                        textClassName={styles.userEditProfile__descriptionContent__editButton_text}
                        onClick={() => onSubmit(values)}
                >
                  Опубликовать
                </Button>}

                {edit && <Button type="button"
                                 className={styles.userEditProfile__descriptionContent__editButton}
                                 textClassName={styles.userEditProfile__descriptionContent__editButton_text}
                                 onClick={() => onSubmit(values)}
                >
                  Изменить
                </Button>}
              </div>
            </form>
          )}
        />
      </div>
      {isModalOpen && <Location modalOpen={isModalOpen} getAddress={setAddress}/>}
      {categoryModalOpen && <CategoryModal modalOpen={categoryModalOpen} getCategory={setCategory}/>}
    </>
  )
}
export default UserPublicationEdit;