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
  // console.log(values)
  const res = fetch(`http://167.71.67.196/api/v1/${url}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(values)
  })
  return res
}

function* phoneRequest({payload}) {
  const {value, callback} = payload;
  try {
    const data = yield call(apiPost, 'account/auth/', value);
    const response = yield call(() => new Promise(res => res(data.json())));
    yield put(actions.userPhoneNumber(value));
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
  console.log(values)
  try {
    const response = yield call(api.post, 'account/login-confirm/', { data: values });
    yield put(actions.conformCodeRequestSuccess(response));
    console.log(response)
    yield call(callback);
    console.log("try")
  } catch (e) {
    console.log(e)
    yield put(actions.conformCodeRequestFailure(e));
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
  yield takeEvery(`${actions.conformCodeRequestStart}`, conformCodeRequest);
  yield takeEvery(`${actions.logoutRequestStart}`, logoutRequest);
  yield takeEvery(`${actions.getStateRequestStart}`, getStateRequest);
}
