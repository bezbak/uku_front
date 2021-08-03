import {put, call, takeEvery, select} from 'redux-saga/effects';
import api from '../../lib/api';
import {actions} from './slice';
import {actions as profileAction} from '../profile/slice';


const accountId = (store) => store.account.id;


function* accountProfileRequest({payload}) {
    const {id} = payload
    try {
        const response = yield call(api.get, `publication/user/${id}`);
        yield put(actions.accountProfileRequestSuccess(response));
    } catch (e) {
        yield put(actions.accountProfileRequestFailure(e));
    }
}

function* accountPublicationsRequest({payload}) {
    try {
        const id = yield select(accountId)
        const response = yield call(api.get, `publication/user/${id}/publications`, {qs: {page: payload}});
        yield put(actions.accountPublicationsRequestSuccess(response));
    } catch (e) {
        yield put(actions.accountPublicationsRequestFailure(e));
    }
}

function* accountFollowRequest({payload}) {
    const {id, changedUserPublicationFeed} = payload;
    try {
        const response = yield call(api.get, `account/follow/${id}`);
        yield put(actions.accountFollowRequestSuccess({subscribe: response.subscribe, id: id}));
        yield put(profileAction.updateFeed(changedUserPublicationFeed));
    } catch (e) {
        yield put(actions.accountFollowRequestFailure(e));
    }
}

function* searchAccountRequest({payload}) {
    const {q} = payload;
    try {
        const response = yield call(api.get, `account/search/?q=${payload.q}`, {qs: {q: q}});
        yield put(actions.searchAccountRequestSuccess(response));
    } catch (e) {
        yield put(actions.searchAccountRequestFailure(e));
    }
}


export default function* accountProfileSagas() {
    yield takeEvery(`${actions.accountProfileRequestStart}`, accountProfileRequest);
    yield takeEvery(`${actions.accountFollowRequestStart}`, accountFollowRequest);
    yield takeEvery(`${actions.accountPublicationsRequestStart}`, accountPublicationsRequest);
    yield takeEvery(`${actions.searchAccountRequestStart}`, searchAccountRequest);
}
