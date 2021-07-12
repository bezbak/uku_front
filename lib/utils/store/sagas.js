import get from 'lodash/get';
import { FORM_ERROR } from 'final-form';

export const parseSubmissionError = (e) =>{
  if (e.message === 'Неверный код') {
    return { [FORM_ERROR]: e.message }
  }
  if (e.message === 'Вы слишком часто отправляете сообщение.') {
    return { [FORM_ERROR]: e.message }
  }
  if (e.message === 'Не удалось отправить сообщение. Попробуйте позже.') {
    return { [FORM_ERROR]: e.message }
  }
  return get(e, 'error.detail') ? { [FORM_ERROR]: e.message } : get(e, 'Error', e);
}


export const getResponseErrorMessage = (e, message = '') =>
  `${message} ${get(e, 'error.detail', e.message)}`;
