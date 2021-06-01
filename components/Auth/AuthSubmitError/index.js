import { useForm, useFormState } from 'react-final-form';

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
          <p>Неверный код.</p>
          {/* <p>{submitError}</p> */}
          <button onClick={handleCloseClick}>
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default AuthSubmitError;
