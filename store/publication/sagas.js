import {put, call, takeEvery} from 'redux-saga/effects';
import api from '../../lib/api';
import {actions} from './slice';
import {parseSubmissionError} from '../../lib/utils/store/sagas';


function* categoryPublicationRequest({payload}) {
  const {id, callback} = payload;
  try {
    const response = yield call(api.get, `publication/category/${id}`);
    console.log(response)
    yield put(actions.categoryPublicationRequestSuccess(response));
    yield call(callback);
  } catch (e) {
    yield put(actions.categoryPublicationRequestFailure(e));
    yield call(callback, parseSubmissionError(e));
  }
}

function* userPublicationRequest({payload}) {
  const {callback} = payload;
  try {
    const response = yield call(api.post, `publication/user/${id}`);
    console.log(response)
    yield put(actions.userPublicationRequestSuccess(response));
    yield call(callback);
  } catch (e) {
    yield put(actions.userPublicationRequestFailure(e));
    yield call(callback, parseSubmissionError(e));
  }
}


function* userCreatePublicationRequest({payload}) {
  const {values, callback} = payload;

  const data = {
    location: 53,
    category: 4,
  }
  const value = Object.assign(values, data)
  console.log(value)
  try {
    const response = yield call(api.post, `publication/create/`, {data: value});
    console.log(response)
    yield put(actions.userCreatePublicationRequestSuccess(response));
    yield call(callback);
  } catch (e) {
    yield put(actions.userCreatePublicationRequestFailure(e));
    yield call(callback, parseSubmissionError(e));
  }
}


export default function* publicationSagas() {
  yield takeEvery(`${actions.categoryPublicationRequestStart}`, categoryPublicationRequest);
  yield takeEvery(`${actions.userPublicationRequestStart}`, userPublicationRequest);
  yield takeEvery(`${actions.userCreatePublicationRequestStart}`, userCreatePublicationRequest);
}
