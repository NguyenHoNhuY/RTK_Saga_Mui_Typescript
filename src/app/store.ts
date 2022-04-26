import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import authReducer from 'features/auth/authSlice';
import cityReducer from 'features/city/citySlice';
import dashboardReducer from 'features/dashboard/dashboardSlice';
import studentReducer from 'features/student/studentSlice';
import createSagaMiddleware from 'redux-saga';
import { history } from 'utils';
import counterReducer from '../features/counter/counterSlice';
import rootSaga from './rootSaga';

const rootReducer = {
    router: connectRouter(history),
    counter: counterReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    student: studentReducer,
    city: cityReducer,
};

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        //* use default middleware of RTK and add sagaMiddleware
        getDefaultMiddleware().concat(sagaMiddleware),
});

//todo start saga middleware
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
