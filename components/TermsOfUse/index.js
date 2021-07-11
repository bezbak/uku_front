import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {parseMarkdown} from "../../public/lib/parser";
import {actions} from "../../store/system/slice";
import styles from './styles.module.scss'

const TermsOfUse = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(actions.termsOfUseRequestStart());
  })
  const termsOfUse = useSelector((store) => store.system.termsOfUse);
  return (
    <div className={styles.termsOfUse}>
      <div className={styles.termsOfUse__headline}>
        <span>
          {termsOfUse?.title}
        </span>
      </div>
      <div className={styles.termsOfUse__description}>
        <p>
          {parseMarkdown(termsOfUse?.description)}
        </p>
      </div>
    </div>
  )
}
export default TermsOfUse;