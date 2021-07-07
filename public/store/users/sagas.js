import {put, call, takeEvery, select} from 'redux-saga/effects';
import {parseSubmissionError} from '../../lib/utils/store/sagas';
import api from '../../lib/api';
import {actions as toast} from '../toast/slice';
import {actions} from './slice';
import isEmpty from "lodash/isEmpty";

const getToken = (state) => state.auth

const HTTP_INTERNAL_SERVER_ERROR_CODE = 500;
const checkStatus = (response) => {
  if (response.ok) return response;

  if (response.status >= HTTP_INTERNAL_SERVER_ERROR_CODE) {
    return {
      throwError: true,
      json: {
        detail:
          'Ошибка на сервере! Если ошибка не исчезнет в ближайшее время - обратитесь к администратору',
      },
    };
  }

  return response.json().then((json) => ({
    json,
    throwError: true,
  }));
};
const checkException = (response) => {
  if (response.throwError === true) {
    const errorMessage = Object.keys(response.json).map((key) => response.json[key]);
    const error = new Error(errorMessage);
    error.error = response.json;
    throw error;
  }
  return response;
};

const parseJSON = (response) => {
  const contentType = response.headers.get('content-type');
  if (isEmpty(contentType)) return response;
  if (contentTypeResponseMapping[contentType]) return response;
  return response.json();
};

function apiPost(url, values, token) {
  const response = fetch(`http://uku.kg/api/v1/${url}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Token' + token,
    },
    body: JSON.stringify(values)
  })
  return response
}

const apiPatch = (url, values, token) =>
  fetch(`http://uku.kg/api/v1/${url}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Token' + token,
    },
    body: JSON.stringify(values),
    credentials: 'same-origin'
  })
    .then(checkStatus)
    .then(checkException)
    .then(parseJSON);


function* phoneRequest({payload}) {
  const {value, callback, title} = payload;
  try {
    const response = yield call(api.post, 'account/auth/', {data: value});
    yield put(actions.userPhoneNumber(value));
    yield put(actions.successMessage(response.message));
    yield put(actions.phoneRequestSuccess(response));
    yield put(actions.changePhoneTitle(title));
    if (response.message === "Сообщение отправлено" || response.message === "User создан! Сообщение отправлено") {
      yield put(toast.openRequestStatusSuccessSnackbar(`${response.message} на номеру ${value.phone}`))
      yield call(callback);
    } else {
      yield put(toast.openRequestStatusSuccessSnackbar(response.message))
    }
  } catch (e) {
    yield put(toast.openRequestStatusErrorSnackbar(`${e.message}`))
    yield put(actions.phoneRequestFailure(e));
    yield call(callback, e);
  }
}

function* conformCodeRequest({payload}) {
  const {values, callback} = payload;
  try {
    const response = yield call(api.post, 'account/login-confirm/', {data: values});
    console.log(response)
    yield put(actions.conformCodeRequestSuccess(response));
    yield call(callback, response);
  } catch (e) {
    console.log(e)
    if (e.message === "Неверный код") {
      yield put(toast.openRequestStatusErrorSnackbar(e.message))
    }
    yield put(toast.openRequestStatusErrorSnackbar(`Не правильной номер телефона или не заполнено поля номер телефона `))
    yield put(actions.conformCodeRequestFailure(e));
    yield call(callback, parseSubmissionError(e));
  }

}

function* newPhoneConformCodeRequest({payload}) {
  const {value, callback} = payload;
  try {
    const auth = yield select(getToken)
    const response = yield call(apiPost, 'account/new-phone-conform/', value, auth.token);
    console.log(response)
    yield put(actions.newPhoneCodeRequestSuccess(response));
    yield put(toast.openRequestStatusSuccessSnackbar(response.message))
    yield call(callback);
  } catch (e) {
    console.log(e)
    if (e.message === "Неверный код") {
      yield put(toast.openRequestStatusErrorSnackbar(e.message))
    }
    yield put(toast.openRequestStatusErrorSnackbar(`Не правильной номер телефона или не заполнено поля номер телефона `))

    yield put(actions.newPhoneCodeRequestFailure(e));
    yield call(callback, parseSubmissionError(e));
  }

}

function* oldPhoneConformCodeRequest({payload}) {
  const {value, callback} = payload;
  console.log(value)
  try {
    const auth = yield select(getToken)
    const response = yield call(apiPost, 'account/old-phone-confirm/', value, auth.token);
    console.log(response)
    yield put(actions.oldPhoneCodeRequestSuccess(response));
    yield put(toast.openRequestStatusSuccessSnackbar(response.message))
    yield call(callback);
  } catch (e) {
    if (e.message === "Неверный код") {
      yield put(toast.openRequestStatusErrorSnackbar(e.message))
    }
    yield put(toast.openRequestStatusErrorSnackbar(`Не правильной номер телефона или не заполнено поля номер телефона `))
    yield put(actions.oldPhoneCodeRequestFailure(e));
    yield call(callback, parseSubmissionError(e));
  }

}

function* changeOldPhoneRequest({payload}) {
  const {value, callback} = payload;
  try {
    const response = yield call(api.post, 'account/change-old-phone/', {data: value});
    console.log(response)
    yield put(actions.userPhoneNumber(value));
    yield put(actions.changeOldPhoneRequestSuccess(response));
    if (response.message === "Сообщение отправлено") {
      yield put(toast.openRequestStatusSuccessSnackbar(
        `${response.message} на номеру ${value.phone}`)
      )
      yield call(callback);
    } else {
      yield put(toast.openRequestStatusSuccessSnackbar(response.message))
    }
  } catch (e) {
    console.log(e)
    yield put(toast.openRequestStatusErrorSnackbar(`${e.message}`))
    yield put(actions.changeOldPhoneRequestFailure(e));
    yield call(callback, parseSubmissionError(e));
  }

}

function* registrationRequest({payload}) {
  const {values, token, callback} = payload;

  try {
    const data = yield call(apiPatch, 'account/', values, token);
    yield put(actions.registrationRequestSuccess(data));
    yield call(callback);
  } catch (e) {
    yield put(actions.registrationRequestFailure(e));
    yield call(callback, e);
  }

}

function* logoutRequest({payload}) {
  const {callback} = payload;
  try {
    yield call(api.post, 'account/logout/');
    yield put(actions.logoutRequestSuccess());
    yield call(callback);
  } catch (e) {
    yield put(actions.logoutRequestFailure(e));
  }
}

function* getStateRequest() {
  try {
    const response = yield call(api.get, 'account/get_state/');
    yield put(actions.getStateRequestSuccess(response));
  } catch (e) {
    yield put(actions.getStateRequestFailure(e));
  }
}

export default function* userAuthSagas() {
  yield takeEvery(`${actions.phoneRequestStart}`, phoneRequest);
  yield takeEvery(`${actions.changeOldPhoneRequestStart}`, changeOldPhoneRequest);
  yield takeEvery(`${actions.conformCodeRequestStart}`, conformCodeRequest);
  yield takeEvery(`${actions.newPhoneConformCodeRequestStart}`, newPhoneConformCodeRequest);
  yield takeEvery(`${actions.oldPhoneConformCodeRequestStart}`, oldPhoneConformCodeRequest);
  yield takeEvery(`${actions.registrationRequestStart}`, registrationRequest);
  yield takeEvery(`${actions.logoutRequestStart}`, logoutRequest);
  yield takeEvery(`${actions.getStateRequestStart}`, getStateRequest);
}
