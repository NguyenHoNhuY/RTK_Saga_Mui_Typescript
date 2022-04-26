import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models';

export interface LoggingPayload {
    username: string;
    password: string;
}
export interface AuthState {
    isLoggedIn: boolean;
    logging?: boolean;
    currentUser?: User;
}

const initialState: AuthState = {
    isLoggedIn: false,
    logging: false,
    currentUser: undefined,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoggingPayload>) {
            state.logging = true;
        },
        loginSuccess(state, action: PayloadAction<User>) {
            state.logging = false;
            state.currentUser = action.payload;
        },
        loginFailed(state, Action: PayloadAction<string>) {
            state.logging = false;
        },

        logout(state) {
            state.logging = false;
            state.currentUser = undefined;
        },
    },
});

//* Actions
export const authActions = authSlice.actions;
//* Selectors
export const selectIsLoggedIn = (state) => {
    return state.auth.isLoggedIn;
};
export const selectIsLogging = (state) => {
    return state.auth.logging;
};

//* Reducer
const authReducer = authSlice.reducer;
export default authReducer;
