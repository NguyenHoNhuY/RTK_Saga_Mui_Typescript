import { ListResponse } from './../../models/common';
import { cityActions } from './citySlice';
import { takeLatest, call, put } from 'redux-saga/effects';
import { City } from 'models';
import cityApi from 'api/cityApi';

function* fetchCityList() {
    try {
        const response: ListResponse<City> = yield call(cityApi.getAll);
        yield put(cityActions.fetchCityListSuccess(response));
    } catch (error) {
        console.log('Failed to fetch city data :', error);
        yield put(cityActions.fetchCityListFailed());
    }
}

export default function* citySaga() {
    console.log('city saga');
    yield takeLatest(cityActions.fetchCityList.type, fetchCityList);
}
