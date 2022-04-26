import { RootState } from './../../app/store';
import { ListResponse } from './../../models/common';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from 'models';

export interface cityState {
    loading: boolean;
    cityList: City[];
}

const initialState: cityState = {
    loading: false,
    cityList: [],
};

const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        fetchCityList(state) {
            state.loading = true;
        },
        fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
            state.loading = false;
            state.cityList = action.payload.data;
        },
        fetchCityListFailed(state) {
            state.loading = false;
        },
    },
});

//* actions
export const cityActions = citySlice.actions;

//* selectors
export const selectCityLoading = (state: RootState) => state.city.loading;
export const selectCityList = (state: RootState) => state.city.cityList;
export const selectCityMap = createSelector(selectCityList, (cityList) =>
    cityList.reduce((map, city) => {
        map[city.code] = city;
        return map;
    }, {})
);
export const selectCityOption = createSelector(selectCityList, (cityList) =>
    cityList.map((city) => ({
        label: city.name,
        value: city.code,
    }))
);

//*  reducer
const cityReducer = citySlice.reducer;
export default cityReducer;
