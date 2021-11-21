import React from 'react';
import styles from './styles.module.scss'
import {useRecoilState} from "recoil";
import {mobileCreateAtom} from "./state";

function MobilePreview() {
  const [state] = useRecoilState(mobileCreateAtom)

  return (
    <div className={styles.mobilePreview}>
      <img src={
        state.previewImageIndex !== null ?
        URL.createObjectURL(state.images[state.previewImageIndex]) :
        "images/noImages.svg"} alt="
        "/>
    </div>
  );
}

export default MobilePreview;