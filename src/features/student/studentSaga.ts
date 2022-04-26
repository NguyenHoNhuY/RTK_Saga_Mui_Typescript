import { PayloadAction } from '@reduxjs/toolkit';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { ListParams, ListResponse } from './../../models/common';
import { studentActions } from './studentSlice';

function* fetchStudentList(action: PayloadAction<ListParams>) {
    try {
        const response: ListResponse<Student> = yield call(
            studentApi.getAll,
            action.payload
        );
        yield put(studentActions.fetchStudentListSuccess(response));
    } catch (error) {
        console.log('fetch student list failed :', error);
        yield put(studentActions.fetchStudentListFailed());
    }
}

function* setFilterDebounce(action: PayloadAction<ListParams>) {
    yield put(studentActions.setFilter(action.payload));
}

export function* studentSaga() {
    yield takeLatest(studentActions.fetchStudentList, fetchStudentList);
    yield debounce(800, studentActions.setFilterSearch.type, setFilterDebounce);
}
