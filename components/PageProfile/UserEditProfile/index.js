import React, {useState} from "react";
import classNames from 'classnames';
import Button from "../../Button";
import {Form, Field, useFormState} from 'react-final-form'
import CloseIcon from '../../../public/icons/CloseIcon.svg'
import ImagesSelectIcon from '../../../public/icons/imgAddIcon.svg'
import styles from './styles.module.scss'

const ImageSelectInput = ({input,setSelectedImages})=>{
  const onChangeImg = (e) => {
    input.onChange(e.target.files)
    for (let i =0 ; i<e.target.files.length; i++)
    setSelectedImages(selectedImages=>[...selectedImages,URL.createObjectURL(e.target.files[i])])
  }
  return(
    <label className={styles.userEditProfile__chooseImage}>
      <ImagesSelectIcon/>
      <input type="file"
             style={{visibility:'hidden'}}
             onChange={onChangeImg}
             className={styles.userEditProfile__chooseImage_input}
             multiple
      />
    </label>
  )
}
const UserEditProfile = ({setEditPublication,editPublicationId}) => {
  const [selectedImages, setSelectedImages] = useState([])

  const onSubmit = ( values)=>{
    console.log(values)
  }

  return (
    <div className={styles.userEditProfile}>
      <div  className={styles.userEditProfile__closeBox}>
        <Button  className={styles.userEditProfile__closeBox_closeButton} onClick={ ()=>setEditPublication(false)}>
          <CloseIcon/>
        </Button>
        <span>
          Просмотр
        </span>
      </div>
      <div className={styles.userEditProfile__imageContent}>
        <img src={'images/loginBg'} />
      </div>
      <Form
        onSubmit={onSubmit}
        render={({handleSubmit, values}) => (
          <form onSubmit={handleSubmit}>
            <div className={styles.userEditProfile__selectedImageContent}>
              {
                selectedImages?.map((file,index)=>{
                  console.log(file)
                  return (
                   <div  className={classNames(styles.userEditProfile__selectedImageContent_imageBox, {[styles.userEditProfile__selectedImageContent_imageBox_selected]:true})}>
                     <img src={file} key={index}/>
                     <CloseIcon  className={styles.userEditProfile__selectedImageContent_imageBox_deleteImage}/>
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
             <Button type="submit"
                     className={styles.userEditProfile__descriptionContent__editButton}
                     textClassName={styles.userEditProfile__descriptionContent__editButton_text}
                     onClick={() => onSubmit(values)}>Изменить
             </Button>
           </div>
          </form>
        )}
      />
    </div>
  )
}
export default UserEditProfile;