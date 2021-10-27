import React from 'react'
import {ButtonBase} from "@mui/material";

const Book = (props) => {
    const {book, click} = props;
    const readMore = book.title.length  >= 50 ? <ButtonBase> ... </ButtonBase> : "";

    return (
        <div className="card col-sm-3 mr-2" style={{maxHeight: '300px', cursor:"pointer"}} onClick={()=>click(book)}>
            <div className="card-body text-center book-title">
                <h6 className="card-text">{book.title.slice(0,50)}{readMore}</h6>
            </div>
            <div className='text-center p-2'>
                <p>Written by</p>
                {book.authors.map((author,index)=><span key={index}>{author.name}</span>)}
            </div>
        </div>
        )
}

export default  Book;