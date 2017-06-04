
import {FETCH_BOOKS, SELECT_BOOK, SAVE_BOOK} from '../actions/index';

const INITIAL_STATE = { all: {}, selected: null };

function mapBookArrayToObject(array) {

    const obj = {};

    array.forEach((item) => {
        obj[item.id] = item;
    });

    return obj;
}

export default function (state = INITIAL_STATE, action) {

    switch(action.type) {

        case FETCH_BOOKS:
            return {...state, all: mapBookArrayToObject(action.payload.data) };
        case SELECT_BOOK:
            return {...state, selected: state.all[action.payload] || null };
        case SAVE_BOOK:
            const savedBook = action.payload.data;
            return {
                all: {...state.all, [savedBook.id]: savedBook},
                selected: savedBook,
            };
        default:
            return state;
    }
}
