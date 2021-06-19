import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import App from './App';
import { history } from './router/AppRouter';
import { LoadingPage } from './components';
import { firebase } from './firebase/firebase';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components'
import { startSetActions } from './redux/actions/actions';
import { startSetContacts } from './redux/actions/contacts';
import { startSetTheme } from './redux/actions/theme';
import { login, logout } from './redux/actions/auth';

const store = configureStore();

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    font-family: 'Roboto';
    body {
      height: 100%;
    }
  }
`;

const StyledApp = 
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>;
     
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(
      <React.StrictMode>
        {StyledApp}
      </React.StrictMode>
      , document.getElementById('root'));
    hasRendered = true;
  }
};

ReactDOM.render(
  <React.StrictMode>
    <LoadingPage />
  </React.StrictMode>,
  document.getElementById('root')
);

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetTheme());
    store.dispatch(startSetContacts());
    store.dispatch(startSetActions()).then(() => {
      renderApp();
      history.push('/actions');
      if (user) {
        if (history.location.pathname === '/login') {
          history.push('/actions');
        }
      }
    });

  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/login');
  }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
