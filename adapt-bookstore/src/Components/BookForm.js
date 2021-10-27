import React, {useEffect, useState} from 'react'
import {TextField} from "@mui/material";
import {BOOK_ADD, BOOK_SELECT} from "../extras/Context";
import {useDispatch, useSelector} from "react-redux";
import {updateChange} from "../Redux/slices/bookEdit";

const BookForm = (props) => {
    const dispatch = useDispatch();
    const {context, book} = props;
    const {title, id, download_count, bookshelves, languages, media_type, subjects, formats}
        = useSelector((state)=> state.BookEdit);
    const [subjectList, setSubjects] = useState(subjects.toString());
    const [bookShelves, setBookShelves] = useState(bookshelves.toString());
    const [langList, setLangList] = useState(languages.toString());
    const [authorData, setAuthorData] = useState({
        name: '',
        birth_year: '',
        death_year: ''
    });

    useEffect(()=>{
        if (context === BOOK_SELECT && book && book.authors){
            setAuthorData(book.authors[0])
        }
    },[context,book])

    // submit button disability check
        // subjects
    const checkedSubjects = [];
    subjectList.split(',').map((subject) => subject !== '' ? checkedSubjects.push(subject) : null );
        //shelves
    const checkedShelves = [];
    bookShelves.split(',').map((shelf) => shelf !== '' ? checkedShelves.push(shelf) : null );
        //languages
    const checkedLangs = [];
    langList.split(',').map((lang) => lang !== '' ? checkedLangs.push(lang) : null );

    let disableButton  = book.title === title && Number(book.id) === Number(id) && Number(book.download_count) === Number(download_count) && book.media_type === media_type &&
        JSON.stringify(book.subjects) === JSON.stringify(checkedSubjects) && JSON.stringify( book.bookshelves) === JSON.stringify(checkedShelves)
        && JSON.stringify( book.languages) === JSON.stringify(checkedLangs);

    if (context === BOOK_ADD){
        disableButton = !title || !authorData.name || !subjects || !id
    }
    let resources = [];
    if (context === BOOK_SELECT){
        if (Object.keys(formats)){
            for (const [key, value] of Object.entries(formats)) {
                resources.push(value);
            }
        }
    }

    const submitData = () => {
        let data; let author = [];
        if (context === BOOK_SELECT){
            author.push(authorData);
             data = {title, id, download_count, media_type, checkedSubjects, checkedLangs, checkedShelves, author};
            alert("Data to save:\n" + JSON.stringify(data));
            return;
        }
        const subject = subjectList.split(',');
        const language = langList.split(',');
        const shelves = bookShelves.split(',');
        author.push(authorData);
        data = {title, id, download_count, media_type, subject, language, shelves, author};
        alert("Data to save:\n" + JSON.stringify(data));
    };

    const changeHandler = (name, value, extra) => {
        switch (name){
            case "subjects": setSubjects(value);break;
            case "shelves": setBookShelves(value);break;
            case "langs": setLangList(value);break;
            case "author":
                setAuthorData({
                    ...authorData,
                    [extra]: value
                });
             break;
            default: dispatch(updateChange({name,value}));
        }
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            submitData();
        }}>
            <h4 className={'text-primary'}>{context === BOOK_SELECT ? "EDIT BOOK" : "ADD BOOK" }</h4>
            <TextField fullWidth sx={{mb:1}} id="standard-helperText" label="Id" variant="standard" value={id} type={"number"}
                onChange={(e)=> changeHandler('id', e.target.value)}
            />

            <TextField fullWidth sx={{mb:1}} id="standard-helperText" label="Title" variant="standard" value={title}
                onChange={(e)=> changeHandler('title', e.target.value)}
            />

            <TextField fullWidth sx={{mb:1}} id="standard-helperText" label="Author(s)" variant="standard" value={authorData.name}
                       onChange={(e)=> changeHandler('author', e.target.value, 'name')}
            />
            <TextField fullWidth sx={{mb:1}} id="standard-helperText" label="Author Birth Year" variant="standard" value={authorData.birth_year} type={"number"}
                       onChange={(e)=> changeHandler('author', e.target.value, 'birth_year')}
            />
            <TextField fullWidth sx={{mb:1}} id="standard-helperText" label="Author Death Year" variant="standard" value={authorData.death_year} type={"number"}
                       onChange={(e)=> changeHandler('author', e.target.value, 'death_year')}
            />

            <TextField fullWidth sx={{mb:1}} id="standard-helperText" label="Media" variant="standard" value={media_type}
                onChange={(e)=> changeHandler('media_type', e.target.value)}
            />

            <TextField fullWidth sx={{mb:1}} id="standard-helperText" label="Downloads" variant="standard" value={download_count} type={"number"}
                onChange={(e)=> changeHandler('download_count', e.target.value)}
            />

            <TextField fullWidth sx={{mb:1}} id="standard-helperText" label="Subjects" variant="standard" value={subjectList}
                onChange={(e)=> changeHandler('subjects', e.target.value)}
            />

            <TextField fullWidth sx={{mb:1}} id="standard-helperText" label="Shelves" variant="standard" value={bookShelves}
                onChange={(e)=> changeHandler('shelves', e.target.value)}
            />

            <TextField fullWidth sx={{mb:1}} id="standard-helperText" label="Languages" variant="standard" value={langList}
                onChange={(e)=> changeHandler('langs', e.target.value)}
            />
            <div>
                {resources.map((item,index)=>{
                    return (<div key={index}><a href={item} style={{fontSize: '10px'}}>{item}</a></div>)
                })}
            </div>
            <button disabled={disableButton}>{context === BOOK_ADD ? 'Add Book' : 'Edit Book'}</button>

        </form>
    )
}

export default BookForm;