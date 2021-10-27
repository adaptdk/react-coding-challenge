import React, {useEffect} from 'react'
import BooksFilter from "./BooksFilter";
import {useDispatch, useSelector} from "react-redux";
import {BookCategories as Subjects, BookSelect, subjectChange} from "../Redux/slices/bookstore";
import Grid from "@mui/material/Grid";
import Book from "./filter/books";

const BookCollections = () => {

    const {books} = useSelector((state)=> state.BookStore);
    const dispatch = useDispatch();

    useEffect(()=>{
       dispatch(Subjects())
    },[dispatch])

    const handleChange = (name, value) => {
        dispatch(subjectChange({name,value}));
    }

    const selectBook = (book) => {
        dispatch(BookSelect(book))
    }

    let booksList = <></>;

    if (books.length > 0 ){
        booksList = books.map((book, index) => {
           return (
               <React.Fragment key={index}>
                   <Book book={book} click={selectBook}/>
               </React.Fragment>
           )
        });
    }

    return (
        <Grid container>

            <Grid container item xs={12} sx={{justifyContent: 'center', width:'100%'}}>
                <BooksFilter handleChange={handleChange}/>
            </Grid>

            <Grid container item sx={{mt:2}}>
                {booksList}
            </Grid>

        </Grid>
    )
}

export default BookCollections;