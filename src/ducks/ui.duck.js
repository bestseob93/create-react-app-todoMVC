import { fromJS } from 'immutable';
import { createAction } from 'redux-actions';

const SHOW_WRITE = "ui/SHOW_WRITE";
const HIDE_WRITE = "ui/HIDE_WRITE";

const SHOW_SEARCH = "ui/SHOW_SEARCH";
const HIDE_SEARCH = "ui/HIDE_SEARCH";

export const showWrite = createAction(SHOW_WRITE);
export const hideWrite = createAction(HIDE_WRITE);

export const showSearch = createAction(SHOW_SEARCH);
export const hideSearch = createAction(HIDE_SEARCH);

const initialState = fromJS({
    visible: {
        search: false,
        write: false
    }
});

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case SHOW_SEARCH:
            return state.setIn(['visible', 'search'], true);
        case HIDE_SEARCH:
            return state.setIn(['visible', 'search'], false);
        case SHOW_WRITE:
            return state.setIn(['visible', 'write'], true);
        case HIDE_WRITE:
            return state.setIn(['visible', 'write'], false);
        default:
            return state;
    }
}