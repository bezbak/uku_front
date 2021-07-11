import {put, call, takeEvery} from 'redux-saga/effects';
import api from '../../public/lib/api';
import {actions} from './slice';


function* contactRequest() {
  try {
    const response = yield call(api.get, 'system/contact/');
    yield put(actions.contactInfoRequestSuccess(response));
  } catch (e) {
    yield put(actions.conformCodeRequestFailure(e));
  }
}

function* faqRequest() {
  try {
    const response = yield call(api.get, 'system/faq/');
    yield put(actions.faqInfoRequestSuccess(response));
  } catch (e) {
    yield put(actions.faqInfoRequestFailure(e));
  }

}

function* privacyPolicyRequest() {
  try {
    const response = yield call(api.get, 'system/privacy-policy/');
    yield put(actions.privacyPolicyRequestSuccess(response));
  } catch (e) {
    yield put(actions.privacyPolicyRequestFailure(e));
  }

}


function* termsOfUseStart() {
  try {
    const response = yield call(api.get, 'system/terms-of-use/');
    yield put(actions.termsOfUseRequestSuccess(response));
  } catch (e) {
    yield put(actions.termsOfUseRequestFailure(e));
  }

}

export default function* systemSagas() {
  yield takeEvery(`${actions.contactInfoRequestStart}`, contactRequest);
  yield takeEvery(`${actions.faqInfoRequestStart}`, faqRequest);
  yield takeEvery(`${actions.privacyPolicyRequestStart}`, privacyPolicyRequest);
  yield takeEvery(`${actions.termsOfUseRequestStart}`, termsOfUseStart);
}
