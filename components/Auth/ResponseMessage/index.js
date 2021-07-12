import {useEffect, useState} from "react";
import {shallowEqual, useSelector} from "react-redux";
import { useForm, useFormState } from 'react-final-form';
import classNames from 'classnames'
import Button from "../../Button";
import CloseIcon from '../../../public/icons/CloseIcon.svg'
import styles from './styles.module.scss'

function ResponseMessage() {
  const { reset } = useForm();
  const [isActive,setIsActive]= useState(true);
  const { values, submitSucceeded } = useFormState();
  const responseMessage = useSelector((store) => store.auth?.responseMessage, shallowEqual);

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
