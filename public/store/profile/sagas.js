import {put, call, select, takeEvery} from 'redux-saga/effects';
import api from '../../lib/api';
import {actions} from './slice';
import isEmpty from "lodash/isEmpty";
import {useSelector} from "react-redux";


const getToken = (state) => state.auth

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

function apiGet (url, token) {
  console.log(token)
  const res = fetch(`http://uku.kg/api/v1/${url}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    },
  }) .then(response => response.json())
return res
}


function* profileRequest() {
  try {
    const auth = yield select(getToken)
    console.log(auth.token)
    const response = yield call(apiGet, 'account/profile/', auth.token);
    console.log(response)
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
    const auth = yield select(getToken)
    console.log(auth.token)
    const response = yield call(apiGet, 'account/avatar/',auth.token);
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
    const auth = yield select(getToken)
    console.log(auth.token)
    const response = yield call(apiGet, 'account/profile/feed/',auth.token);
    yield put(actions.feedRequestSuccess(response));
  } catch (e) {
    yield put(actions.feedRequestFailure(e));
  }
}
function* publicationRequest(token) {
  const {payload} = token

  try {
    const auth = yield select(getToken)
    console.log(auth.token)
    const response = yield call(apiGet, 'account/profile/publication/', auth.token);
    yield put(actions.publicationRequestSuccess(response));
  } catch (e) {
    yield put(actions.publicationRequestFailure(e));
  }
}
function* deletePublicationRequest(token) {
  const {payload,id} = token

  try {
    const response = yield call(api.delete, `account/profile/publication/${id}`);
    yield put(actions.deletePublicationRequestSuccess(response));
  } catch (e) {
    yield put(actions.deletePublicationRequestFailure(e));
  }
}
export default function* userProfileSagas() {
  yield takeEvery(`${actions.profileRequestStart}`, profileRequest);
  yield takeEvery(`${actions.updateProfileRequestStart}`, updateProfileRequest);
  yield takeEvery(`${actions.avatarGetRequestStart}`, avatarRequest);
  yield takeEvery(`${actions.updateAvatarGetRequestStart}`, updateAvatarRequest);
  yield takeEvery(`${actions.publicationRequestStart}`, publicationRequest);
  yield takeEvery(`${actions.deletePublicationRequestStart}`, deletePublicationRequest);
  yield takeEvery(`${actions.feedRequestStart}`, feedRequest);
}
