import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import thunk from 'redux-thunk';

const logger = store => {
    return next => {
        return action => {
                console.log('[Middleware] Dispatching', action);
                const result = next(action);
                console.log('[Middleware] next state', store.getState());
                return result;
        }
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rooteReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer
});

const store = createStore(rooteReducer, composeEnhancers(applyMiddleware(thunk)));
  
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
