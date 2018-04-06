import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { infoColumns, columns } from '../Table/TableColums';

class InfoAboutBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookId: undefined,
        };
    }

    componentWillMount() {
        this.loadData();
    }
    componentWillReceiveProps(nextProps) {
        const { idValue } = nextProps;
        this.loadData(idValue);
    }


    generateTable() {
        const { book } = this.state;
        return <ReactTable
            showPagination={false}
            data={book}
            columns={infoColumns({})}
            minRows={1}
        />;
    }

    loadData(idValue){
        fetch(`http://localhost:3010/books?id_like=${idValue}`)
            .then(response => response.json())
            .then(data => {
                this.setState({book: data})})
            .catch(err => console.error(this.props.url, err.toString()))
    }

    render() {
        return (
            <div>
                <h1>Info about book</h1>
                <br/>
                {this.generateTable()}
            </div>
        );
    }
}

export default InfoAboutBook;