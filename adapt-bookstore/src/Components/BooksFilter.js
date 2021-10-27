import React, {useEffect} from 'react';
// import {Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {FetchBooks} from "../Redux/slices/bookstore";
import {Autocomplete, TextField} from "@mui/material";

const BooksFilter = (props) => {

    const {subjects, selectedSubject} = useSelector((state)=> state.BookStore);
    const {handleChange} = props;
    const dispatch = useDispatch()
    useEffect(() => {
        if (selectedSubject && subjects.includes(selectedSubject)){
            dispatch(FetchBooks(selectedSubject))
        }
    },[subjects, selectedSubject, dispatch])


    return (
            <Autocomplete
                value={selectedSubject}
                onChange={(event, newValue) => {
                    handleChange('selectedSubject', newValue);
                }}
                id="controllable-states-demo"
                options={subjects}
                sx={{ width: 300, mt:2}}
                renderInput={(params) => <TextField {...params} label="Subject" />}
            />
    )
}

export default  BooksFilter;