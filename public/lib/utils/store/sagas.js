import get from 'lodash/get';
import { FORM_ERROR } from 'final-form';

export const parseSubmissionError = (e) =>{
  if (e.message === 'Неверный код') {
    return { [FORM_ERROR]: 'Неверный код' }
  }
  return get(e, 'error.detail') ? { [FORM_ERROR]: e.message } : get(e, 'Error', e);
}


export const getResponseErrorMessage = (e, message = '') =>
  `${message} ${get(e, 'error.detail', e.message)}`;
