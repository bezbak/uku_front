import isEmpty from "lodash/isEmpty";
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {parseSubmissionError} from '../../public/lib/utils/store/sagas';
import api from '../../public/lib/api';
import {actions as toast} from '../toast/slice';
import {actions} from './slice';

const getToken = (store) => store.auth.token
const getPhone = (store) => store.auth.phone

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

const contentTypeResponseMapping = {
  'application/zip': true,
  'application/ms-excel': true,
};

const parseJSON = (response) => {
  const contentType = response.headers.get('content-type');
  if (isEmpty(contentType)) return response;
  if (contentTypeResponseMapping[contentType]) return response;
  return response.json();
};

const apiGet = (url, token) => {
  return fetch(`http://uku.kg/api/v1/${url}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    },
  }).then(checkStatus)
    .then(checkException)
    .then(parseJSON)
}

function apiPost(url, values, token) {
  return fetch(`http://uku.kg/api/v1/${url}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    },
    body: JSON.stringify(values)
  }).then(checkStatus)
    .then(checkException)
    .then(parseJSON)
}

const apiPatch = (url, values, token) =>
  fetch(`http://uku.kg/api/v1/${url}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    },
    body: JSON.stringify(values),
  })
    .then(checkStatus)
    .then(checkException)
    .then(parseJSON);


function* phoneRequest({payload}) {
  const {value, callback} = payload;
  try {
    const response = yield call(api.post, 'account/auth/', {data: value});
    yield put(actions.userPhoneNumber(value));
    yield put(actions.successMessage(response.message));
    yield put(actions.phoneRequestSuccess(response));
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

function* sendSmsToOldPhoneRequest({payload}) {
  const {callback} = payload;
  try {
    const token = yield select(getToken)
    const response = yield call(apiGet, 'account/send-sms-to-old-phone/', token);
    yield put(actions.changePhoneTitle("oldPhone"));
    yield put(actions.sendSmsToOldPhoneRequestSuccess(response));
    yield put(toast.openRequestStatusSuccessSnackbar(
        `${response.message}`))
    yield call(callback);
  } catch (e) {
    yield put(toast.openRequestStatusErrorSnackbar(`${e.message}`))
    yield put(actions.sendSmsToOldPhoneRequestFailure(e));
    yield call(callback, e);
  }
}

function* conformCodeRequest({payload}) {
  const {value, callback} = payload;
  try {
    const phone = yield select(getPhone)
    const values =Object.assign(value, phone)
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

function* oldPhoneConformCodeRequest({payload}) {
  const {value, callback} = payload;
  try {
    const token = yield select(getToken)
    const response = yield call(apiPost, 'account/old-phone-confirm/', value, token);
    yield put(actions.oldPhoneCodeRequestSuccess(response));
    yield put(toast.openRequestStatusSuccessSnackbar(response.message))
    yield call(callback);
  } catch (e) {
    if (e.message === "Неверный код") {
      yield put(toast.openRequestStatusErrorSnackbar(e.message))
    }
    yield put(toast.openRequestStatusErrorSnackbar(e.message));
    yield put(actions.oldPhoneCodeRequestFailure(e));
    yield call(callback,e);
  }

}

function* newPhoneConformCodeRequest({payload}) {
  const {value, callback} = payload;
  try {
    const token = yield select(getToken)
    const response = yield call(apiPost, 'account/new-phone-conform/', value, token);
    yield put(actions.newPhoneCodeRequestSuccess(response));
    yield put(toast.openRequestStatusSuccessSnackbar(response.message))
    yield call(callback);
  } catch (e) {
    if (e.message === "Неверный код") {
      yield put(toast.openRequestStatusErrorSnackbar(e.message))
    }
    yield put(toast.openRequestStatusErrorSnackbar(e.message))
    yield put(actions.newPhoneCodeRequestFailure(e));
    yield call(callback);
  }

}

function* changeOldPhoneRequest({payload}) {
  const {value, callback} = payload;
  try {
    const token = yield select(getToken)
    const response = yield call(apiPost, 'account/change-old-phone/',  value, token);
    yield put(actions.changeOldPhoneRequestSuccess(response));
    yield put(actions.userPhoneNumber(value));
    console.log(response);
    yield put(actions.changePhoneTitle("newPhone"));
    yield put(toast.openRequestStatusSuccessSnackbar(response.message))
    yield call(callback);
  } catch (e) {
    console.log(e)
    yield put(toast.openRequestStatusErrorSnackbar(`${e.message}`))
    yield put(actions.changeOldPhoneRequestFailure(e));
    yield call(callback, e);
  }

}

function* registrationRequest({payload}) {
  const {values, callback} = payload;

  try {
    const token = yield select(getToken)
    const data = yield call(apiPatch, 'account/', values, token);
    yield put(actions.registrationRequestSuccess(data));
    yield call(callback);
  } catch (e) {
    yield put(toast.openRequestStatusErrorSnackbar(e.message))
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
  yield takeEvery(`${actions.sendSmsToOldPhoneRequestStart}`, sendSmsToOldPhoneRequest);
  yield takeEvery(`${actions.newPhoneConformCodeRequestStart}`, newPhoneConformCodeRequest);
  yield takeEvery(`${actions.oldPhoneConformCodeRequestStart}`, oldPhoneConformCodeRequest);
  yield takeEvery(`${actions.registrationRequestStart}`, registrationRequest);
  yield takeEvery(`${actions.logoutRequestStart}`, logoutRequest);
  yield takeEvery(`${actions.getStateRequestStart}`, getStateRequest);
}
