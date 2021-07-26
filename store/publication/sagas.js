import {put, call, takeEvery} from 'redux-saga/effects';
import api from '../../lib/api';
import {actions} from './slice';
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

function apiPost(url, values) {
  return fetch(`http://uku.kg/api/v1/${url}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Token ${Cookies.get("token") ? Cookies.get("token") : ''}`,
    },
    body: JSON.stringify(values)
  }).then(checkStatus)
    .then(checkException)
    .then(parseJSON)
}
function apiPostPhote(url, values) {
  return fetch(`http://uku.kg/api/v1/${url}`, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      // 'Authorization': `Token ${Cookies.get("token") ? Cookies.get("token") : ''}`,
    },
    body: values
  }).then(checkStatus)
    .then(checkException)
    .then(parseJSON)
}

function* setPublicationIdRequest({payload}) {
  const {id} = payload;
    yield put(actions.setPublicationId(id));
}

function* uploadPublicationImageRequest({payload}) {
  console.log(payload)

  try {
    const response = yield call(apiPostPhote, `publication/image/upload/`,  payload);
    yield put(actions.uploadPublicationImageRequestSuccess(response));
    yield call(callback);
  } catch (e) {
    yield put(actions.uploadPublicationImageRequestFailure(e));
  }
}

function* createPublicationRequest({payload}) {
  const {values, callback} = payload;
  console.log(payload)

  try {
    const response = yield call(api.post, `publication/create/`, {data: values});
    console.log(response)
    yield put(actions.createPublicationRequestSuccess(response));
    yield call(callback);
  } catch (e) {
    yield put(actions.createPublicationRequestFailure(e));
  }
}

function* getPublicationInfoRequest({payload}) {
  try {
    const publicationId = Cookies.get("PublicationId");
    const response = yield call(api.get, `publication/${publicationId}/`);
    yield put(actions.getPublicationInfoRequestSuccess(response));
    // yield call(callback);
  } catch (e) {
    yield put(actions.getPublicationInfoRequestFailure(e));
  }
}

function* updatePublicationRequest({payload}) {
  const {id,description, callback} = payload;
  console.log(payload)
  try {
    const response = yield call(api.put, `publication/${id}/update/`, {data: {description:description}});
    yield put(actions.updatePublicationRequestSuccess(response));
    yield call(callback);
  } catch (e) {
    yield put(actions.updatePublicationRequestFailure(e));
  }
}

function* deletePublicationRequest({payload}) {
  const {id, callback} = payload;
  console.log(payload)
  console.log(id)

  try {
    const response = yield call(api.delete, `publication/${id}/delete`);
    yield put(actions.deletePublicationRequestSuccess(response));
    yield call(callback);
  } catch (e) {
    yield put(actions.deletePublicationRequestFailure(e));
  }
}

function* deletePublicationImageRequest({payload}) {
  const { callback} = payload;

  try {
    const response = yield call(api.delete, `publication/delete/image/${id}/`);
    yield put(actions.deletePublicationImageRequestSuccess(response));
    yield call(callback);
  } catch (e) {
    yield put(actions.deletePublicationImageRequestFailure(e));
  }
}

function* searchPublicationRequest({payload}) {
console.log(payload)
  try {
    const response = yield call(api.get, `publication/search/`,  {qs: {page: payload.page,q: payload.q, category_id: payload.category_id, location_id: payload.location_id}});
    yield put(actions.searchPublicationRequestSuccess(response));
  } catch (e) {
    yield put(actions.searchPublicationRequestFailure(e));
  }
}

function* commentsPublicationRequest({payload}) {
  const { id,callback} = payload;

  try {
    const response = yield call(api.get, `publication/comment/${id}/`);
    yield put(actions.commentsPublicationRequestSuccess(response));
    yield call(callback);
  } catch (e) {
    yield put(actions.commentsPublicationRequestFailure(e));
  }
}

function* addCommentPublicationRequest({payload}) {
  const {addCommentText,    publication_id} = payload;

  try {
    const response = yield call(apiPost, `publication/comment/${publication_id}/add_comment/`, {text:addCommentText});
    yield put(actions.addCommentPublicationRequestSuccess(response));
    // yield call(callback);
  } catch (e) {
    yield put(actions.addCommentPublicationRequestFailure(e));
  }
}

function* replyCommentPublicationRequest({payload}) {
  const {addCommentText, commentsAuthorID,   publication_id} = payload;
  console.log(addCommentText)
  console.log(publication_id)
  try {
    const response = yield call(apiPost, `publication/comment/${publication_id}/${commentsAuthorID}/add_reply/`,{text:addCommentText});
    yield put(actions.replyCommentPublicationRequestSuccess(response));
    // yield call(callback);
  } catch (e) {
    yield put(actions.replyCommentPublicationRequestFailure(e));
  }
}


export default function* publicationSagas() {
  yield takeEvery(`${actions.uploadPublicationImageRequestStart}`, uploadPublicationImageRequest);
  // yield takeEvery(`${actions.setPublicationId}`, setPublicationIdRequest);
  yield takeEvery(`${actions.createPublicationRequestStart}`, createPublicationRequest);
  yield takeEvery(`${actions.getPublicationInfoRequestStart}`, getPublicationInfoRequest);
  yield takeEvery(`${actions.updatePublicationRequestStart}`, updatePublicationRequest);
  yield takeEvery(`${actions.deletePublicationRequestStart}`, deletePublicationRequest);
  yield takeEvery(`${actions.deletePublicationImageRequestStart}`, deletePublicationImageRequest);
  yield takeEvery(`${actions.searchPublicationRequestStart}`, searchPublicationRequest);
  yield takeEvery(`${actions.commentsPublicationRequestStart}`, commentsPublicationRequest);
  yield takeEvery(`${actions.addCommentPublicationRequestStart}`, addCommentPublicationRequest);
  yield takeEvery(`${actions.replyCommentPublicationRequestStart}`, replyCommentPublicationRequest);
}
