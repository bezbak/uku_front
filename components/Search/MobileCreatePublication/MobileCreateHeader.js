import React from 'react';
import styles from "./styles.module.scss";
import {useRecoilState} from "recoil";
import {mobileCreateAtom} from "./state";

function MobileCreateHeader() {
  const [, setState] = useRecoilState(mobileCreateAtom)

  return (
    <div onClick={() => setState(old=>({...old, showCreateModal: false}))} className={styles.mobileCreateHeader}>
      <img src="icons/md-plus.svg" alt=""/>
      <h3>Просмотр</h3>
      {/*<img src="icons/more-vertical.svg" alt=""/>*/}
    </div>
  );
}

export default MobileCreateHeader;