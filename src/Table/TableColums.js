import React from 'react';
import InlineEdit from 'react-edit-inline';
import axios from 'axios';

const ColumnComponent = props => (
    <div>
        {props.children && React.cloneElement(props.children, props)}
    </div>
);

export const columns = ({onTitleClick}) => ([
    {
        Header: 'Id',
        accessor: 'id',
        Cell: row => (
            <div style={{"text-decoration": "underline"}}>
                <ColumnComponent>
                    <i onClick={() => onTitleClick(row.value)}>{row.value}</i>
                </ColumnComponent>
            </div>
        ),
    },
    {
        Header: 'Name',
        accessor: 'name',

    },
    {
        Header: 'Title',
        accessor: 'title',

    }
]);

function connectObject(obj) {
    var str = '';
    for (var key in obj) {
        str += key + ': ' + obj[key] + '\n';
    }
    return str;
}

function NameIt(id, data) {
    const title = data.message;
    axios.patch(`http://localhost:3010/books/${id}`, {title});
}

var bookId;

function getId(value) {
    bookId = value;
}

export const infoColumns = ({onTitleClick}) => ([
    {
        Header: 'Id',
        accessor: 'id',
        Cell: row => (
            <ColumnComponent>
                    <i onChange={getId(row.value)} onClick={() => onTitleClick(row.value)}>{row.value}</i>
            </ColumnComponent>
        ),
    },
    {
        Header: 'Authors Name',
        accessor: 'authors[0].name',
        Cell: row => (
            <ColumnComponent>
                <i>{row.value}</i>
            </ColumnComponent>
        ),
    },
    {
        Header: 'Birth Year',
        accessor: 'authors[0].birth_year',
        Cell: row => (
            <ColumnComponent>
                <i>{row.value}</i>
            </ColumnComponent>
        ),
    },
    {
        Header: 'Death Year',
        accessor: 'authors[0].death_year',
        Cell: row => (
            <ColumnComponent>
                <i>{row.value}</i>
            </ColumnComponent>
        ),
    },
    {
        Header: 'Bookshelves',
        accessor: 'bookshelves',
        Cell: row => (
            <ColumnComponent>
                <i>{row.value.join(', ')}</i>
            </ColumnComponent>
        ),
    },
    {
        Header: 'Download count',
        accessor: 'download_count',
    },
    {
        Header: 'Formats',
        accessor: 'formats',
        Cell: row => (
            <ColumnComponent>
                <i>{connectObject(row.value)}</i>
            </ColumnComponent>
        ),
    },
    {
        Header: 'Media Type',
        accessor: 'media_type',

    },
    {
        Header: 'Subjects',
        accessor: 'subjects',
        Cell: row => (
            <ColumnComponent>
                <i>{row.value.join(', ')}</i>
            </ColumnComponent>
        ),
    },
    {
        Header: 'Title',
        accessor: 'title',
        Cell: row => (
            <InlineEdit
                text={row.value}
                paramName={"message"}
                change={NameIt.bind(row.value, bookId)}
            />
        ),
    }
]);