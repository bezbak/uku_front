import {put, call, takeEvery} from 'redux-saga/effects';
import api from '../../lib/api';
import {actions} from './slice';
import {actions as toast} from "../toast/slice";
import isEmpty from "lodash/isEmpty";
import Cookies from "js-cookie";

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

function apiPatch(url, values) {
  return fetch(`http://uku.kg/api/v1/${url}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${Cookies.get("token") ? Cookies.get("token") : ''}`,
    },
    body: values
  }).then(checkStatus)
    .then(checkException)
    .then(parseJSON)
}

function* profileRequest() {
  try {
    const response = yield call(api.get, 'account/profile/');
    yield put(actions.profileRequestSuccess(response));
  } catch (e) {
    yield put(actions.profileRequestFailure(e));
  }
}

function* updateProfileRequest({payload}) {
  const {value, callback} = payload;
  try {
    const response = yield call(api.patch, 'account/profile/update/', {data: value});
    yield put(actions.updateProfileRequestSuccess(response));
    yield put(toast.openRequestStatusSuccessSnackbar('Профиль успешно обновлены!'))
    yield call(callback);
  } catch (e) {
    yield put(actions.updateProfileRequestFailure(e));
    yield call(callback, e);
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

function* updateAvatarRequest({payload}) {
  const {value, callback} = payload;
  try {
    const response = yield call(apiPatch, 'account/avatar/', value);
    yield put(actions.updateAvatarRequestSuccess(response));
    yield put(toast.openRequestStatusSuccessSnackbar('Профиль успешно обновлены!'))
    yield call(callback);
  } catch (e) {
    yield put(actions.updateAvatarRequestFailure(e));
    yield call(callback, e);
  }
}

function* feedRequest({payload}) {
  try {
    const response = yield call(api.get, 'account/profile/feed/', {qs: {page: payload}});
    yield put(actions.feedRequestSuccess(response));
  } catch (e) {
    yield put(actions.feedRequestFailure(e));
    yield put(toast.openRequestStatusErrorSnackbar(e.message))
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

function* deletePublicationRequest(token) {
  const {id} = token

  try {
    const response = yield call(api.delete, `/publication/${id}/delete`);
    yield put(actions.deletePublicationRequestSuccess(response));
    yield put(toast.openRequestStatusSuccessSnackbar(response.message))
  } catch (e) {
    yield put(actions.deletePublicationRequestFailure(e));
  }
}

export default function* userProfileSagas() {
  yield takeEvery(`${actions.profileRequestStart}`, profileRequest);
  yield takeEvery(`${actions.updateProfileRequestStart}`, updateProfileRequest);
  yield takeEvery(`${actions.avatarGetRequestStart}`, avatarRequest);
  yield takeEvery(`${actions.updateAvatarRequestStart}`, updateAvatarRequest);
  yield takeEvery(`${actions.publicationRequestStart}`, publicationRequest);
  yield takeEvery(`${actions.deletePublicationRequestStart}`, deletePublicationRequest);
  yield takeEvery(`${actions.feedRequestStart}`, feedRequest);
}
