import React, {useState} from 'react';
import styles from './styles.module.scss'
import {useRecoilState} from "recoil";
import {categoryAtom} from "../../CreatePublication/state";
import {locationAtom} from "../../HeaderNavbar/Location/state";
import {toast} from "react-toastify";
import {createPublication, uploadImages} from "../../CreatePublication/functions";
import {mobileCreateAtom} from "./state";
import {useRouter} from "next/router";

function MobileCreateTextControl(props) {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [state, setState] = useRecoilState(mobileCreateAtom)
  const [category] = useRecoilState(categoryAtom)
  const [location] = useRecoilState(locationAtom)

  const onClickCreatePublication = (categoryID, locationID, description, images) => {
    if (images.length !== 1) {
      setState(old => {
        let newObj = {...old}
        let b = newObj.images[0];
        newObj.images[0] = newObj.images[old.previewImageIndex];
        newObj.images[old.previewImageIndex] = b;
        return newObj
      })
    }

    if (!text.trim()) {
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
          setText("")
          router.push(`/detail/${data.publication_id}`)
        } else {
          toast.error("Что-то пошло не так")
        }
      }).finally(() => {
        setLoading(false)
      })
    })
  }


  return (
    <div className={styles.mobileCreateTextControl}>
      <textarea
        name="text"
        id="text"
        cols="30"
        rows="6"
        onChange={({target: {value}}) => setText(value)}
        value={text}
      />
      <button
        onClick={()=>onClickCreatePublication(category.id, location.id, text, state.images)}
        disabled={!text.trim()}>
        <img src="/icons/sendMobile.svg" alt=""/>
      </button>
    </div>
  );
}

export default MobileCreateTextControl;