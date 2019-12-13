import React, {useState, useEffect} from "react"
import BookDetailsAuthors from "./BookDetailsAuthors"
import BookDetailsArray from "./BookDetailsArray"
import BookDetailsFromats from "./BookDetailsFormats"

function BookDetails({book, setNewBookDetails}) {
    if (!book) return (<></>)

    const [formData, setFormData] = useState(book)

    useEffect(()=> {
        setFormData(book)
    }, [book.id])

    let {
        id,
        authors,
        bookshelves,
        download_count,
        formats,
        languages,
        media_type,
        subjects,
        title
    } = formData


    const setNewArray = (itemsKey, newArray) => {
        setFormData(prev => ({
            ...prev,
             [itemsKey]: newArray
        }))
    }

    const handleChange = ({target}) => {
        const {name, value} = target
        setFormData(prev => ({
            ...prev,
            [name]:value

        }))
        if (name === "title") {
            setNewBookDetails(formData)
        }
    }
    return (
        <div>
            <h2>Book details</h2>

            <div className="title">
                <h3>Title</h3>
                <input 
                    className="input input-title"
                    type="text" 
                    name="title" 
                    value={title} 
                    onChange={handleChange}/>
            </div>

            <div className="mediatype">
                <h3>Media type</h3>
                <input 
                    className="input input-mediatype"
                    type="text" 
                    name="media_type" 
                    value={media_type} 
                    onChange={handleChange}/>
            </div>

            <BookDetailsArray 
                itemsName={"Languages"} 
                itemsKey={"languages"}
                inputArray={languages} 
                setNewArray={setNewArray}/>

            <BookDetailsArray 
                itemsName={"Subjects"} 
                itemsKey={"subjects"}
                inputArray={subjects} 
                setNewArray={setNewArray}/>

            <BookDetailsArray 
                itemsName={"Bookshelves"} 
                itemsKey={"bookshelves"}
                inputArray={bookshelves} 
                setNewArray={setNewArray}/>

            <BookDetailsAuthors 
                authors={authors} 
                itemsKey={"authors"}
                setNewAuthors={setNewArray} />

            <div className="downloadcount">
                <h3>Download count</h3>
                <input 
                    className="input-downloadcount"
                    type="number" 
                    name="download_count" 
                    value={download_count} 
                    onChange={handleChange}/>
            </div>

            <BookDetailsFromats 
                itemsKey={"formats"}
                formats={formats} 
                setNewFormats={setNewArray}
            />
        </div>
    )
}

export default BookDetails