import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import todo from 'ducks/todo.duck';
import ui from 'ducks/ui.duck';

const rootReducer = {
    ui,
    todo
};

const reducer = combineReducers(rootReducer);

const middlewares = applyMiddleware(promiseMiddleware());

const configureStore = createStore(reducer, compose(middlewares));

export default configureStore;