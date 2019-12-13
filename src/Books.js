import React, {useState, useEffect, useRef} from "react"
import BookDetails from "./BookDetails"

function Books(props) {
    if (!props.subject) return (<></>)

    const subject = props.subject ? `?subjects_like=${props.subject}` : ""

    const BOOKS_URL = `http://localhost:3010/books${subject}`
    const [isLoading, setIsLoading] = useState(null)
    const [err, setErr] = useState(null)
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [lastId, setLastId] = useState(-1)

    const getBooks = ()=> {
        setIsLoading(true)
        fetch(BOOKS_URL)
            .then(res => res.json())
            .then(json => {
                setBooks(json)
                setIsLoading(false)
            })
            .catch(err => setErr(err))
    }

    useEffect(()=>{
        getBooks()
    }, [subject])
    
    const handleSelection = (e) => {
        e.preventDefault()
        const id = parseInt(e.target.id)
        setSelectedBook(books.find(b => b.id === id))
    }

    const firstSelection = useRef(null)
    const addBook = (e) => {
        e.preventDefault()
        const emptyBook =  {
            "id": lastId,
            "authors": [],
            "bookshelves": [],
            "download_count": 0,
            "formats": {
                "text/plain; charset=utf-8": "",
                "application/pdf": "",
                "application/rdf+xml": "",
                "application/x-mobipocket-ebook": "",
                "application/epub+zip": "",
                "text/plain; charset=us-ascii": "",
                "text/html; charset=utf-8": ""
            },
            "languages": [],
            "media_type": "Text",
            "subjects": [],
            "title": "New Book"
        }
        setLastId(prev => prev - 1)
        setBooks(prev => {
            setSelectedBook(emptyBook)
            firstSelection.current.focus()
            return ([
            emptyBook,
            ...prev
            ])
        })
    }
    const setNewBookDetails = (newBookDetails)=> {
        setBooks(prev => {
            const newArray = [...prev].map(currentDetails => {
                if (currentDetails.id === newBookDetails.id) {
                    return newBookDetails
                } else {
                    return currentDetails
                }
            })
            return newArray
        })
    }

    const displayBooks = books.map((book, idx) => (
            <li key={idx} className="books-item">
                <a  
                    ref={idx === 0 ? firstSelection : null}
                    className="btn btn-book"
                    onClick={handleSelection} 
                    id={book.id} 
                    href="#">{book.title}
                </a>
            </li>
    ))

    return (
        <div className="books">
            <h2>{subject && "Books"}</h2>
            <a 
                className={`btn btn-book-add btn-add`} 
                href="#"
                onClick={addBook}
            >
                New book
            </a>
            <ul className="books-items">{displayBooks}</ul>
            <BookDetails book={selectedBook} setNewBookDetails={setNewBookDetails} />
        </div>
    )
}

export default Books