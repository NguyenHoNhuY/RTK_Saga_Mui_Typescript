import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Theme } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from 'utils';
import App from './App';
import { store } from './app/store';
import './index.css';
import * as serviceWorker from './serviceWorker';

declare module '@mui/styles/defaultTheme' {
    interface DefaultTheme extends Theme {}
}
const theme = createTheme();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <HistoryRouter history={history}>
                    <CssBaseline />
                    <App />
                </HistoryRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
