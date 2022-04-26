import { RootState } from './../../app/store';
import { ListParams, PaginationParams, ListResponse } from './../../models/common';
import { Student } from './../../models/student';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StudentState {
    loading: boolean;
    list: Student[];
    filter: ListParams;
    pagination: PaginationParams;
}

const initialState: StudentState = {
    loading: false,
    list: [],
    filter: {
        _page: 1,
        _limit: 10,
    },
    pagination: {
        _page: 1,
        _limit: 10,
        _totalRows: 15,
    },
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        fetchStudentList(state, action: PayloadAction<ListParams>) {
            state.loading = true;
        },
        fetchStudentListSuccess(state, action: PayloadAction<ListResponse<Student>>) {
            state.list = action.payload.data;
            state.pagination = action.payload.pagination;
            state.loading = false;
        },
        fetchStudentListFailed(state) {
            state.loading = false;
        },
        setFilter(state, action: PayloadAction<ListParams>) {
            state.filter = action.payload;
        },
        setFilterSearch(state, action: PayloadAction<ListParams>) {},
    },
});

//todo Actions
export const studentActions = studentSlice.actions;

//todo Selectors
export const selectStudentList = (state: RootState) => state.student.list;
export const selectStudentLoading = (state: RootState) => state.student.loading;
export const selectStudentFilter = (state: RootState) => state.student.filter;
export const selectStudentPagination = (state: RootState) => state.student.pagination;

//toto Reducer
const studentReducer = studentSlice.reducer;
export default studentReducer;
