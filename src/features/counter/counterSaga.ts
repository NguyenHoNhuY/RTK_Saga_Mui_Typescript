import { PayloadAction } from '@reduxjs/toolkit';
import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { incrementSaga, incrementSagaSuccess } from './counterSlice';

function* handleIncrementSaga(action: PayloadAction<number>) {
    console.log('waiting 2s');
    //todo wait 2s
    yield delay(2000);
    console.log('waiting done, dispatch action');
    //todo dispatch action success
    yield put(incrementSagaSuccess(action.payload));
}

export default function* counterSaga() {
    console.log('counter saga');
    //todo takeEvery thuc hien lan luot tung cong viec cu the
    yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
    //todo takeLatest thuc hien cong viec tiep theo neu cong viec truoc van chua hoan thanh
    yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
}
