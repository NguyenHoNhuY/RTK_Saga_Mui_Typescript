import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import { history } from 'utils';
import { authActions, LoggingPayload } from './authSlice';

function* handleLogin(payload: LoggingPayload) {
    try {
        yield delay(1000);
        localStorage.setItem('access_token', 'fake_token');

        yield put(
            authActions.loginSuccess({
                id: 1,
                name: 'nguyen ho nhu y',
            })
        );
        history.push('admin');
    } catch (error) {
        yield put(authActions.loginFailed(error.message));
    }
}

function* handleLogout() {
    yield delay(500);
    localStorage.removeItem('access_token');
    history.replace('/login');
}

function* watchLoginFollow() {
    while (true) {
        const isLoggedIn = Boolean(localStorage.getItem('access_token'));
        if (!isLoggedIn) {
            const action: PayloadAction<LoggingPayload> = yield take(
                authActions.login.type
            );
            yield fork(handleLogin, action.payload);
        }
        yield take(authActions.logout.type);
        yield call(handleLogout);
    }
}

export default function* authSaga() {
    yield fork(watchLoginFollow);
}
