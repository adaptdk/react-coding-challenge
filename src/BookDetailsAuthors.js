import React, {useState, useEffect} from "react"
import BookDetailsOneAuthor from "./BookDetailsOneAuthor"

function BookDetailsAuthors({itemsKey, authors, setNewAuthors}) {
    if (!authors) return (<></>)

    const [localAuthorsArray, setlocalAuthorsArray] = useState(authors)
    useEffect(()=> {
        setlocalAuthorsArray(authors)
    }, [authors])

    useEffect(()=> {
        setNewAuthors(itemsKey, localAuthorsArray)
    }, [localAuthorsArray])

    const setAuthor = (prevAuthor, newAuthor) => {
        setlocalAuthorsArray(prev => {
            return prev.map(author => 
                prevAuthor === author ? newAuthor : author)
        })
    }

    const addMore = (fromLink)=> {
        if (fromLink){
            fromLink.preventDefault()
        }
        const emptyAuthor = {
            "birth_year":"",
            "death_year":"",
            "name":""
        }
        setlocalAuthorsArray(prevAuthors => (
            [
                ...prevAuthors,
                emptyAuthor
            ]
        ))
    }

    const displayAuthors = localAuthorsArray.map((author, idx) => (
        <li key={idx}>
            <BookDetailsOneAuthor
                author={author} 
                setAuthor={setAuthor}
                idx={idx}
            />
        </li>
    ))

    return (
        <div>
            <h3>Authors</h3>
            <ul className="authors">{displayAuthors}</ul>
            <a  className={`btn btn-authors btn-add`} 
                onClick={addMore} 
                href="#"
            >
                Add author
            </a>
        </div>
    )
}
export default BookDetailsAuthors