/**
 * Created by Denis on 19.06.2017.
 */
import { combineReducers } from 'redux';
import {LOADING_ACTION, UPDATE_ACTION} from './actions';

export const items = (state = {}, action) => {
    switch (action.type){
        case UPDATE_ACTION:
            return action.data;
        default:
            return state;
    };
};

export const editor = (state = {}, action) => {
    switch (action.type){
        case UPDATE_ACTION:
            return {};
        case LOADING_ACTION:
            return {loading: true};
        default:
            return state;
    };
};

export default combineReducers({items, editor});