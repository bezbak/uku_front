import { useForm, useFormState } from 'react-final-form';
import classNames from 'classnames'
import Button from "../../Button";
import CloseIcon from '../../../public/icons/CloseIcon.svg'
import styles from './styles.module.scss'
import {shallowEqual, useSelector} from "react-redux";
import {useEffect, useState} from "react";

function ResponseMessage() {
  const { reset } = useForm();
  const [isActive,setIsActive]= useState(true);
  const { values, submitSucceeded } = useFormState();
  const responseMessage = useSelector((store) => store.auth?.responseMessage, shallowEqual);

  // useEffect(()=>{
  //   setTimeout(()=>setIsActive(false),3000)
  // })
  const handleCloseClick = () => {
    setIsActive(false)
    reset(values)
  };

  if (responseMessage) {
    return (
      <div className={classNames(styles.root,{[styles.root_close]:isActive})}>
        <div>
          <p>{responseMessage}</p>
          <Button onClick={handleCloseClick} className={styles.root_closeButton}>
            <CloseIcon/>
          </Button>
        </div>
      </div>
    );
  }

  return null;
}

export default ResponseMessage;
