import React, {useState} from "react"

function BookDetailsOneAuthor({author, idx, setAuthor}) {

    const handleAuthorChange = (property, prevValue, newValue) => {
        const newAuthor = {...author}
        newAuthor[property] = newValue
        setAuthor(author, newAuthor)
    }   
        
    return (
        <div className="author">
            <div className="author-prop author-name">
                <label htmlFor={`author-name-${idx}`}>Author name</label>
                <input
                    className="input-author-name"
                    type="text" 
                    name={`author-name-${idx}`}
                    value={author.name}
                    onChange={e => 
                        handleAuthorChange("name", author.name, e.target.value)}
                />
            </div>
            <div className="author-prop author-birthyear">
                <label htmlFor={`author-birthyear-${idx}`}>birth year</label>
                <input 
                    className="input-author-birthyear"
                    type="number" 
                    name={`author-birthyear-${idx}`}
                    value={author.birth_year} 
                    onChange={e => 
                        handleAuthorChange("birth_year", author.birth_year, e.target.value)}
                />
            </div>
            <div className="author-prop author-deathyear">
                <label htmlFor={`author-deathyear-${idx}`}>death year</label>
                <input
                    className="input-author-deathyear"
                    type="number" 
                    name={`author-deathyear-${idx}`} 
                    value={author.death_year} 
                    onChange={e => 
                        handleAuthorChange("death_year", author.death_year,e.target.value)}
                />
            </div>
        </div>
    )
}
export default BookDetailsOneAuthor