import React from 'react';
import styles from './styles.module.scss'
import MobileCreateHeader from "./MobileCreateHeader";
import MobilePreview from "./MobilePreview";
import MobileCreateImagesControl from "./MobileCreateImagesControl";
import MobileCreateTextControl from "./MobileCreateTextControl";
import cn from 'classnames';
import {useRecoilState} from "recoil";
import {mobileCreateAtom} from "./state";

function MobileCreatePublication() {

  const [state] = useRecoilState(mobileCreateAtom)
  const mobileCreatePublicationClasses = cn({
    [styles.mobileCreatePublication]: state.showCreateModal,
    "hide": !state.showCreateModal
  })

  return (
    <div className={mobileCreatePublicationClasses}>
      <div className={styles.mobileCreatePublicationContent}>
        <MobileCreateHeader/>
        <MobilePreview/>
        <MobileCreateImagesControl/>
        <MobileCreateTextControl/>
      </div>
    </div>
  );
}

export default MobileCreatePublication;