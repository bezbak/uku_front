import {put, call, takeEvery} from 'redux-saga/effects';
import api from '../../lib/api';
import {parseSubmissionError} from '../../lib/utils/store/sagas';
import {actions} from './slice';
import isEmpty from "lodash/isEmpty";

const parseLoginData = (data) => ({
  ...data,
  phone: data.phone.replace(/\D+/g, ''),
});
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
function apiPost(url, values) {
  const res = fetch(`http://uku.kg/api/v1/${url}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(values)
  })
  return res
}
function apiPatch(url, values,token) {
  console.log(token)
  const res = fetch(`http://uku.kg/api/v1/${url}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token,
      // 'Authorization': `Bearer ${token}`
      // 'X-CSRFToken': token,
    },
    body: JSON.stringify(values),
    credentials: 'same-origin'
  })
  return res
}

function* phoneRequest({payload}) {
  const {value, callback} = payload;
console.log(payload)
  try {
    const data = yield call(apiPost, 'account/auth/', value);
    console.log(data)
    const response = yield call(() => new Promise(res => res(data.json())));
    yield put(actions.userPhoneNumber(value));
    yield put(actions.successMessage(response.message));
    yield put(actions.phoneRequestSuccess(response));
    // const response = yield call(api.post, 'account/auth/', { data: value });
    // yield put(actions.phoneRequestSuccess(response));
    // yield put(actions.userPhoneNumber(value));
    yield call(callback);
  } catch (e) {
    yield put(actions.phoneRequestFailure(e));
    yield call(callback, parseSubmissionError(e));
  }
}

function* conformCodeRequest({payload}) {
  const {values, callback} = payload;
  try {
    const response = yield call(api.post, 'account/login-confirm/', { data: values });
    console.log(response)
    yield put(actions.conformCodeRequestSuccess(response));
    yield call(callback);
  } catch (e) {
    yield put(actions.conformCodeRequestFailure(e));
    yield call(callback, parseSubmissionError(e));
  }

}
function* newPhoneConformCodeRequest({payload}) {
  const {values, callback} = payload;
  try {
    const response = yield call(api.post, 'account/new-phone-conform/', { data: values });
    console.log(response)
    yield put(actions.newPhoneCodeRequestSuccess(response));
    yield call(callback);
  } catch (e) {
    yield put(actions.newPhoneCodeRequestFailure(e));
    yield call(callback, parseSubmissionError(e));
  }

}
function* oldPhoneConformCodeRequest({payload}) {
  const {values, callback} = payload;
  try {
    const response = yield call(api.post, 'account/old-phone-confirm/', { data: values });
    console.log(response)
    yield put(actions.oldPhoneCodeRequestSuccess(response));
    yield call(callback);
  } catch (e) {
    yield put(actions.oldPhoneCodeRequestFailure(e));
    yield call(callback, parseSubmissionError(e));
  }

}

function* changeOldPhoneRequest({payload}) {
  const {values, callback} = payload;
  try {
    const response = yield call(api.post, 'account/change-old-phone//', { data: values });
    console.log(response)
    yield put(actions.changeOldPhoneRequestSuccess(response));
    yield call(callback);
  } catch (e) {
    yield put(actions.changeOldPhoneRequestFailure(e));
    yield call(callback, parseSubmissionError(e));
  }

}

function* registrationRequest({payload}) {
  const {values,token, callback} = payload;

  try {
    const data = yield call(apiPatch, 'account/', values,token);
    console.log(data)
    const response = yield call(() => new Promise(res => res(data.json())));
    yield put(actions.registrationRequestSuccess(response));
    console.log(response)
    yield call(callback);
    console.log("try")
  } catch (e) {
    console.log(e)
    yield put(actions.registrationRequestFailure(e));
    yield call(callback, parseSubmissionError(e));
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
