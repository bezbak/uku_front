import React, {useState} from "react";
import classNames from 'classnames';
import Button from "../../Button";
import {Form, Field} from 'react-final-form'
import CloseIcon from '../../../public/icons/CloseIcon.svg'
import AddressIcon from '../../../public/icons/address.svg'
import ImagesSelectIcon from '../../../public/icons/imgAddIcon.svg'
import styles from './styles.module.scss'
import {useDispatch} from "react-redux";
import {actions} from "../../../store/publication/slice";
import Location from "../../Location";
import CategoryNavbar from "../../CategoryNavbar";
import CategoryModal from "../../CategoryModal";

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
const UserPublicationEdit = ({setEditPublication, edit, add}) => {
  const [selectedImages, setSelectedImages] = useState([])
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [onMouseOver, setOnMouseOver] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [address, setAddress] = useState()
  const [category, setCategory] = useState()
  const userCreatePublicationRequest = (payload) => dispatch(actions.userCreatePublicationRequestStart(payload));


  const onSubmit = (values) =>
    new Promise((resolve) => {
      userCreatePublicationRequest({
        values,
        callback: (response) => {
          if (!response) {
            console.log(response)
          } else {
            resolve(response);
          }
        }
      });
    })

  const removeImg =()=>{
    // selectedImages
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
             Уфа
             {address?.name}
             <AddressIcon/>
           </Button>
         </div>}
       </div>
        <div className={styles.userEditProfile__imageContent}>
          <img src={selectedImages[imgIndex]}/>
        </div>
        <Form
          onSubmit={onSubmit}
          render={({handleSubmit, values}) => (
            <form onSubmit={handleSubmit}>
              <div className={styles.userEditProfile__selectedImageContent}>
                {
                  selectedImages?.map((file, index) => {
                    return (
                      <div
                        onMouseOver={()=> {
                          setOnMouseOver(true)
                          setImgIndex(index)
                        }}
                        onMouseLeave={()=>setOnMouseOver(false)}
                        className={classNames(styles.userEditProfile__selectedImageContent_imageBox,
                          {[styles.userEditProfile__selectedImageContent_imageBox_selected]: (onMouseOver && imgIndex===index)})}>
                        <img src={file} key={index}/>
                        <CloseIcon
                          onClick={removeImg}
                          className={styles.userEditProfile__selectedImageContent_imageBox_deleteImage}/>
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
                {!edit && <Button type="button"
                                 className={styles.userEditProfile__descriptionContent__editButton}
                                 textClassName={styles.userEditProfile__descriptionContent__editButton_text}
                                 onClick={() => onSubmit(values)}
                >
                 Опубликовать
                </Button>
                }
                { edit && <Button type="button"
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