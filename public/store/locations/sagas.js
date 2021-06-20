import {put, call, takeEvery} from 'redux-saga/effects';
import api from '../../lib/api';
import {parseSubmissionError} from '../../lib/utils/store/sagas';
import {actions} from './slice';
import isEmpty from "lodash/isEmpty";

const parseLoginData = (data) => ({
  ...data,
  phone: data.phone.replace(/\D+/g, ''),
});

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

function* locationRequest() {
  try {
    const response = yield call(api.get, 'location/');
    yield put(actions.locationRequestSuccess(response));
  } catch (e) {
    yield put(actions.locationRequestFailure(e));
  }
}

export default function* locationSagas() {
  yield takeEvery(`${actions.locationRequestStart}`, locationRequest);
}
