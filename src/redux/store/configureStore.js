import { createStore, combineReducers , applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import actionsReducer from '../reducers/actions';
import contactsReducer from '../reducers/contacts';
import filterReducer from '../reducers/filters';
import themeReducer from '../reducers/theme';
import authReducer from '../reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
    const store = createStore(
        combineReducers({
            actions: actionsReducer,
            contacts: contactsReducer,
            filters: filterReducer,
            theme: themeReducer,
            auth: authReducer,
        }), 
        composeEnhancers(applyMiddleware(thunk)));
    return store;
};

export default configureStore;