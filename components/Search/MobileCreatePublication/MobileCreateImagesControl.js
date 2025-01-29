import React from 'react';
import styles from './styles.module.scss'
import {useRecoilState} from "recoil";
import {mobileCreateAtom} from "./state";

function MobileCreateImagesControl(props) {

  const [state, setState] = useRecoilState(mobileCreateAtom)

  const onInputFile = event => {
    if(state.images.length === 0){
      setState(old => ({...old, images: [event.target.files[0]], previewImageIndex: 0}))
      event.target.value = null
      return
    }

    setState(old => ({...old, images: [...old.images, event.target.files[0]], previewImageIndex: 0}))
    event.target.value = null
  }

  const setSelectedPreview = index =>{
    setState(old=>({...old, previewImageIndex: index}))
  }

  return (
    <div className={styles.mobileCreateImagesControl}>
      {state.images && state.images.length === 10 ? null :
        <>
          <label
            className={styles.addMoreImage}
            htmlFor="upload-photo"/>
          <input
            onChange={(event) => onInputFile(event)}
            type="file"
            name="photo"
            accept=".png, .jpg, .jpeg"
            id="upload-photo"/>
        </>
      }
      {state.images && state.images.length ? state.images.map((item, index) => {
        return <img
          key={index}
          style={state.previewImageIndex === index ? {border:"1px solid red"} : {}}
          src={URL.createObjectURL(item)}
          alt="image"
          onClick={()=>setSelectedPreview(index)}
        />
      }) : null}
    </div>
  );
}

export default MobileCreateImagesControl;