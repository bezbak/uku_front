import { useForm, useFormState } from 'react-final-form';
import Button from "../../Button";
import CloseIcon from '../../../public/icons/CloseIcon.svg'
import styles from './styles.module.scss'
import {shallowEqual, useSelector} from "react-redux";

function ResponseMessage() {
  const { reset } = useForm();
  const { values, submitSucceeded } = useFormState();
  const responseMessage = useSelector((store) => store.auth?.responseMessage, shallowEqual);

  const handleCloseClick = () => reset(values);

  if (responseMessage) {
    return (
      <div className={styles.root}>
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
