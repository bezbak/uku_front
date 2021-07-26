import {put, call, takeEvery, select} from 'redux-saga/effects';
import api from '../../lib/api';
import {actions} from './slice';

const getCategoryId = (store) => store.category.category_id;
const getLocationId = (store) => store.location.location_id;

function* categoryRequest() {
  try {
    const response = yield call(api.get, 'category/');
    yield put(actions.categoryRequestSuccess(response));
    yield put(actions.setCategoryId(response[0].id));
  } catch (e) {
    yield put(actions.categoryRequestFailure(e));
  }
}

function* setCategoryIdRequest({payload}) {
  const {id} = payload;
  yield put(actions.setCategoryId(id));
}

function* categoryPublicationsRequest({payload}) {
  const {page} = payload
  try {
    const categoryId = yield select(getCategoryId)
    const locationId = yield select(getLocationId)
    const response = yield call(api.get, `publication/category/${categoryId}`, {
      qs: {
        page: page,
        location: locationId
      }
    });
    yield put(actions.categoryPublicationsRequestSuccess(response));
  } catch (e) {
    yield put(actions.categoryPublicationsRequestFailure(e));
  }
}


export default function* categorySagas() {
  yield takeEvery(`${actions.categoryRequestStart}`, categoryRequest);
  yield takeEvery(`${actions.categoryPublicationsRequestStart}`, categoryPublicationsRequest);
}
