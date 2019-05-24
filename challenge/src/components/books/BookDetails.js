import React, { Component } from 'react'
import 'components/books/BookDetails.css';

class BookDetails extends Component {

    render() {
        let book = this.props.book;

        return (
            <div className="bookDetails">
                <div className="row">
                    <div className="col-sm-8"><b>{book.title}</b> - ({book.languages[0]})</div>
                    <div className="col-sm-4">
                        <b>Categories:</b>
                        <ul>
                            {book.subjects.map(subject => (
                                <li key={subject}>{subject}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-8">
                        <b>{book.authors.length > 1 ? "Authors" : "Author"}</b>
                        <ul>
                            {book.authors.map(author => (
                                <li key={author.name}>
                                    {author.name} - ({author.birth_year} - {author.death_year ? author.death_year : ""})
                            </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-sm-4">
                        <b>Shelves:</b>
                        <ul>
                            {book.bookshelves.map(shelve => (
                                <li key={shelve}>{shelve}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        Downloaded <b>{book.download_count}</b> times.
                        <ul>
                            {Object.entries(book.formats).map(([format, url]) => {
                                return <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default BookDetails