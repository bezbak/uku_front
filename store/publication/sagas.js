import {put, call, takeEvery} from 'redux-saga/effects';
import api from '../../lib/api';
import {actions} from './slice';

function* uploadPublicationImageRequest({payload}) {
  const {values, callback} = payload;

  try {
    const response = yield call(api.post, `publication/image/upload/`, {data: values});
    yield put(actions.uploadPublicationImageRequestSuccess(response));
    yield call(callback);
  } catch (e) {
    yield put(actions.uploadPublicationImageRequestFailure(e));
  }
}

function* createPublicationRequest({payload}) {
  const {values, callback} = payload;

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
  const {id, callback} = payload;

  try {
    const response = yield call(api.get, `publication/${id}/`);
    yield put(actions.getPublicationInfoRequestSuccess(response));
    yield call(callback);
  } catch (e) {
    yield put(actions.getPublicationInfoRequestFailure(e));
  }
}

function* updatePublicationRequest({payload}) {
  const {id,values, callback} = payload;

  try {
    const response = yield call(api.put, `publication/${id}/update/`, {data: values});
    yield put(actions.updatePublicationRequestSuccess(response));
    yield call(callback);
  } catch (e) {
    yield put(actions.updatePublicationRequestFailure(e));
  }
}

function* deletePublicationRequest({payload}) {
  const {id, callback} = payload;

  try {
    const response = yield call(api.delete, `publication/${id}/delete/`);
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
  const { callback} = payload;

  try {
    const response = yield call(api.get, `publication/search/`,  {qs: {page: payload.page,q: payload.q, category_id: payload.category_id, location_id: payload.location_id}});
    yield put(actions.searchPublicationRequestSuccess(response));
    yield call(callback);
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
  const { id,callback} = payload;

  try {
    const response = yield call(api.post, `publication/comment/${id}/add_comment/`);
    yield put(actions.addCommentPublicationRequestSuccess(response));
    yield call(callback);
  } catch (e) {
    yield put(actions.addCommentPublicationRequestFailure(e));
  }
}

function* replyCommentPublicationRequest({payload}) {
  const { id,comment_id,callback} = payload;

  try {
    const response = yield call(api.post, `publication/comment/${id}/${comment_id}/add_replu/`);
    yield put(actions.replyCommentPublicationRequestSuccess(response));
    yield call(callback);
  } catch (e) {
    yield put(actions.replyCommentPublicationRequestFailure(e));
  }
}


export default function* publicationSagas() {
  yield takeEvery(`${actions.uploadPublicationImageRequestStart}`, uploadPublicationImageRequest);
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
