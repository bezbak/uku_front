import { useForm, useFormState } from 'react-final-form';
import Button from "../../Button";
import CloseIcon from '../../../public/icons/CloseIcon.svg'
import styles from './styles.module.scss'

function AuthSubmitError() {
  const { reset } = useForm();
  const { values, submitError } = useFormState();
  const isSubmitError = Boolean(submitError);
  const handleCloseClick = () => reset(values);
  if (isSubmitError) {
    return (
      <div className={styles.root}>
        <div>
           <p>{submitError}</p>
          <Button onClick={handleCloseClick} className={styles.root_closeButton}>
            <CloseIcon/>
          </Button>
        </div>
      </div>
    );
  }

  return null;
}

export default AuthSubmitError;
