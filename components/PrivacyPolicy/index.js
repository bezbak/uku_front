import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {parseMarkdown} from "../../public/lib/parser";
import {actions} from "../../store/system/slice";
import styles from './styles.module.scss'

const PrivacyPolicy = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.privacyPolicyRequestStart());
  })
  const privacyPolicy = useSelector((store) => store.system.privacyPolicy);
  return (
    <div className={styles.privacyPolicy}>
      <div className={styles.privacyPolicy__headline}>
        <span>
          {privacyPolicy?.title}
        </span>
      </div>
      <div className={styles.privacyPolicy__description}>
        <p>
          {parseMarkdown(privacyPolicy?.description)}
        </p>
      </div>
    </div>
  )
}
export default PrivacyPolicy;