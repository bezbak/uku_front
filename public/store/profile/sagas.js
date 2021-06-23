import {put, call, takeEvery} from 'redux-saga/effects';
import api from '../../lib/api';
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
function* profileRequest() {
  try {
    const response = yield call(api.get, 'account/profile/');
    yield put(actions.profileRequestSuccess(response));
  } catch (e) {
    yield put(actions.profileRequestFailure(e));
  }
}
function* updateProfileRequest() {
  try {
    const response = yield call(api.put, 'account/profile/update');
    yield put(actions.updateProfileRequestSuccess(response));
  } catch (e) {
    yield put(actions.updateProfileRequestFailure(e));
  }
}

function* avatarRequest() {
  try {
    const response = yield call(api.get, 'account/avatar/');
    yield put(actions.avatarGetRequestSuccess(response));
  } catch (e) {
    yield put(actions.avatarGetRequestFailure(e));
  }
}

function* updateAvatarRequest() {
  try {
    const response = yield call(api.patch, 'account/avatar/');
    yield put(actions.updateAvatarGetRequestSuccess(response));
  } catch (e) {
    yield put(actions.updateAvatarGetRequestFailure(e));
  }
}

function* feedRequest() {
  try {
    const response = yield call(api.get, 'account/profile/feed/');
    yield put(actions.feedRequestSuccess(response));
  } catch (e) {
    yield put(actions.feedRequestFailure(e));
  }
}
function* publicationRequest() {
  try {
    const response = yield call(api.get, 'account/profile/publication/');
    yield put(actions.publicationRequestSuccess(response));
  } catch (e) {
    yield put(actions.publicationRequestFailure(e));
  }
}

export default function* userProfileSagas() {
  yield takeEvery(`${actions.profileRequestStart}`, profileRequest);
  yield takeEvery(`${actions.updateProfileRequestStart}`, updateProfileRequest);
  yield takeEvery(`${actions.avatarGetRequestStart}`, avatarRequest);
  yield takeEvery(`${actions.updateAvatarGetRequestStart}`, updateAvatarRequest);
  yield takeEvery(`${actions.feedRequestStart}`, feedRequest);
  yield takeEvery(`${actions.publicationRequestStart}`, publicationRequest);
}
