import { configureStore, combineReducers } from '@reduxjs/toolkit'
import BookStoreSlice from "./slices/bookstore";
import BookEditSlice from "./slices/bookEdit";

export const store = configureStore({
    reducer: combineReducers({
            BookStore: BookStoreSlice,
            BookEdit: BookEditSlice,
    }),
})