import {put, call, select, takeEvery} from 'redux-saga/effects';
import isEmpty from "lodash/isEmpty";
import api from '../../lib/api';
import {actions} from './slice';


const getToken = (store) => store.auth.token

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

function apiGet(url, token) {
  console.log(token)
  const response = fetch(`http://uku.kg/api/v1/${url}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    },
  }).then(response => response.json())
  return response
}


function* userAllFavoriteReques() {
  try {
    const token = yield select(getToken)
    const response = yield call(api.get, 'account/favorite/', token);
    yield put(actions.userAllFavoriteRequestSuccess(response));
  } catch (e) {
    yield put(actions.userFavoriteRequestFailure(e));
  }
}

function* userFavoriteAccountRequest({id}) {
  try {
    const token = yield select(getToken)
    const response = yield call(api.get, `/account/favorite/${id}`,token);
    yield put(actions.userFavoriteAccountRequestSuccess(response));
  } catch (e) {
    yield put(actions.userAllFavoriteAccountRequestFailure(e));
  }
}


export default function* userFavoriteSagas() {
  yield takeEvery(`${actions.userAllFavoriteRequestStart}`, userAllFavoriteReques);
  yield takeEvery(`${actions.userFavoriteAccountRequestStart}`, userFavoriteAccountRequest);
}
