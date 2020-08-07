import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import loginReducer from './store/reducers/login';
import itemReducer from './store/reducers/items';
import filterReducer from './store/reducers/filters';
import carReducer from './store/reducers/car';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers = compose;

const rootReducer = combineReducers({
  login: loginReducer,
  items: itemReducer,
  filter: filterReducer,
  car: carReducer,
});
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
