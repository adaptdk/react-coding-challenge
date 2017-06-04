
import {FETCH_SUBJECTS} from '../actions/index';

const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action) {

    switch(action.type) {
        case FETCH_SUBJECTS:
            return action.payload.data;
        default:
            return state;
    }
}
