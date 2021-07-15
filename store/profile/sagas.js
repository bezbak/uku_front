import {put, call, takeEvery} from 'redux-saga/effects';
import api from '../../lib/api';
import {actions} from './slice';
import {actions as toast} from "../toast/slice";

function* profileRequest() {
  try {
    const response = yield call(api.get, 'account/profile/');
    yield put(actions.profileRequestSuccess(response));
  } catch (e) {
    yield put(actions.profileRequestFailure(e));
  }
}

function* updateProfileRequest({payload}) {
  const {value,callback} = payload;
  try {
    const response = yield call(api.patch, 'account/profile/update/', {data:value});
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
  const {value,callback} = payload;
  try {
    const response = yield call(api.patch, 'account/avatar/', {data:value});
    yield put(actions.updateAvatarRequestSuccess(response));
    yield put(toast.openRequestStatusSuccessSnackbar('Профиль успешно обновлены!'))
    yield call(callback);
  } catch (e) {
    yield put(actions.updateAvatarRequestFailure(e));
    yield call(callback, e);
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

function* deletePublicationRequest(token) {
  const { id} = token

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
  yield takeEvery(`${actions.updateAvatarRequestStart}`, updateAvatarRequest);
  yield takeEvery(`${actions.publicationRequestStart}`, publicationRequest);
  yield takeEvery(`${actions.deletePublicationRequestStart}`, deletePublicationRequest);
  yield takeEvery(`${actions.feedRequestStart}`, feedRequest);
}
