import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: '',
    title: '',
    download_count: '',
    media_type: '',
    bookshelves: [],
    languages: [],
    subjects: [],
    authors: [],
    formats: {},
}

export const BookEditSlice = createSlice({
    name: 'BookEdit',
    initialState,
    reducers: {
        statePopulate: (state, action) => {
            const {title, id, download_count, authors, bookshelves, languages, media_type, subjects, formats } = action.payload;
            return {...state, title, download_count, authors, bookshelves, languages, media_type, subjects, formats, id}
        },
        updateChange: (state, action) => {
            const {payload} = action;
            return{
                ...state,
                [payload.name]: payload.value
            }
        },
        cleanState: (state, action) => {
            return{
                ...state,
                id: '',
                title: '',
                download_count: '',
                media_type: '',
                bookshelves: [],
                languages: [],
                subjects: [],
                authors: [
                    {
                        name: '',
                        birth_year: '',
                        death_year: ''
                    }
                ],
                formats: {},
            }
        }
    },
})


export const StatePopulate = (book) => dispatch => {
    dispatch(statePopulate(book))
}

export const {  statePopulate, updateChange, cleanState } = BookEditSlice.actions;
export default BookEditSlice.reducer;