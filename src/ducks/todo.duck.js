import { fromJS } from 'immutable';
import * as api from 'services/API/todo';
import * as rs from 'services/requestStatus';

const ADD_TODO = "todo/ADD_TODO";
const EDIT_TODO = "todo/EDIT_TODO";
const DELETE_TODO = "todo/DELETE_TODO";
const SEARCH_TODO = "todo/SEARCH_TODO";

const GET_TODO_LIST = "todo/GET_TODO_LIST";

const TOGGLE_DONE = "todo/TOGGLE_DONE";

export const addTodo = (data) => ({
    type: ADD_TODO,
    payload: api.requestAddTodo(data)
});

export const editTodo = (index, data) => ({
    type: EDIT_TODO,
    payload: api.requestEditTodo(index, data)
});

export const deleteTodo = (index) => ({
    type: DELETE_TODO,
    payload: api.requestDeleteTodo(index)
});

export const searchTodo = (query) => ({
    type: SEARCH_TODO,
    payload: api.requestSearchTodo(query)
});

export const getTodoList = (listType) => ({
    type: GET_TODO_LIST,
    payload: api.requestGetTodoList(listType)
});

export const toggleDone = (index) => ({
    type: TOGGLE_DONE,
    payload: api.requestToggleDone(index)
});

const initialState = fromJS({
    requests: {
        add: {
            ...rs.request
        },
        edit: {
            ...rs.request
        },
        delete: {
            ...rs.request
        },
        getTodo: {
            ...rs.request
        },
        done: {
            ...rs.request
        },
        search: {
            ...rs.request
        }
    },
    items: []
});

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case `${ADD_TODO}_PENDING`:
            return state.mergeIn(['requests', 'add'], fromJS(rs.pending));
        case `${ADD_TODO}_FULFILLED`:
            return state.mergeIn(['requests', 'add'], fromJS(rs.fulfilled));
        case `${ADD_TODO}_REJECTED`:
            return state.mergeIn(['requests', 'add'], fromJS(rs.rejected));
        case `${EDIT_TODO}_PENDING`:
            return state.mergeIn(['requests', 'edit'], fromJS(rs.pending));
        case `${EDIT_TODO}_FULFILLED`:
            return state.mergeIn(['requests', 'edit'], fromJS(rs.fulfilled));
        case `${EDIT_TODO}_REJECTED`:
            return state.mergeIn(['requests', 'edit'], fromJS(rs.rejected));
        case `${DELETE_TODO}_PENDING`:
            return state.mergeIn(['requests', 'delete'], fromJS(rs.pending));
        case `${DELETE_TODO}_FULFILLED`:
            return state.mergeIn(['requests', 'delete'], fromJS(rs.fulfilled));
        case `${DELETE_TODO}_REJECTED`:
            return state.mergeIn(['requests', 'delete'], fromJS(rs.rejected));
        case `${SEARCH_TODO}_PENDING`:
            return state.mergeIn(['requests', 'search'], fromJS(rs.pending));
        case `${SEARCH_TODO}_FULFILLED`:
            return state.mergeIn(['requests', 'search'], fromJS(rs.fulfilled))
                        .set('items', fromJS(action.payload));
        case `${SEARCH_TODO}_REJECTED`:
            return state.mergeIn(['requests', 'search'], fromJS(rs.rejected));
        case `${GET_TODO_LIST}_PENDING`:
            return state.mergeIn(['requests', 'getTodo'], fromJS(rs.pending));
        case `${GET_TODO_LIST}_FULFILLED`:
            return state.mergeIn(['requests', 'getTodo'], fromJS(rs.fulfilled))
                        .set('items', fromJS(action.payload));
        case `${GET_TODO_LIST}_REJECTED`:
            return state.mergeIn(['requests', 'getTodo'], fromJS(rs.rejected));
        case `${TOGGLE_DONE}_PENDING`:
            return state.mergeIn(['requests', 'done'], fromJS(rs.pending));
        case `${TOGGLE_DONE}_FULFILLED`:
            return state.mergeIn(['requests', 'done'], fromJS(rs.fulfilled));
        case `${TOGGLE_DONE}_REJECTED`:
            return state.mergeIn(['requests', 'done'], fromJS(rs.rejected));
        default:
            return state;
    }
}