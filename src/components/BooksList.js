import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { columns  as TableColumns } from '../Table/TableColums';


class BooksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scienceBooks: [],
            fictionBooks: [],
            selectedBook: undefined,
        };
    }

    componentDidMount(nextProps) {
        this.loadData();
    }

    loadData() {
        var booksScience = [];
        var booksFiction = [];
        fetch('http://localhost:3010/books')
            .then(response => response.json())
            .then(data => {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].subjects.length > 1) {
                        booksScience.push({name:
                            data[i].authors[0].name,
                            title: data[i].title,
                            id: data[i].id
                        });
                        booksFiction.push({name:
                            data[i].authors[0].name,
                            title: data[i].title,
                            id: data[i].id
                        });
                    } else if (data[i].subjects.length === 1 && data[i].subjects[0] === "Science") {
                        booksScience.push({name:
                            data[i].authors[0].name,
                            title: data[i].title,
                            id: data[i].id
                        });
                    } else if (data[i].subjects.length === 1 && data[i].subjects[0] === "Fiction")
                        booksFiction.push({name:
                            data[i].authors[0].name,
                            title: data[i].title,
                            id: data[i].id
                        });
                }
            })
            .catch(err => console.error(this.props.url, err.toString()))
        this.setState({
            scienceBooks: booksScience,
            fictionBooks: booksFiction,
        });
    }

    onTitleClick(id) {
        this.props.setId(id)
    }

    generateTable(param) {
        if (param === 'Science') {
            return <ReactTable
                className="-striped"
                data={this.state.scienceBooks}
                minRows={1}
                width="100px"
                columns={TableColumns({onTitleClick: this.onTitleClick.bind(this)})}/>;
        } else if (param === 'Fiction') {
            return <ReactTable
                className="-striped"
                data={this.state.fictionBooks}
                minRows={1}
                width="100px"
                columns={TableColumns({onTitleClick: this.onTitleClick.bind(this)})}/>;
        }
        return <div>Err</div>;
    }

    render() {
        return (
          <div>
              {this.generateTable(this.props.selectedSub)}
          </div>
        );
    }
}

export default BooksList;