import React, { Component } from 'react';
import './App.css';
import DropdownSelection from './components/DropdownSelection';
import BooksList from './components/BooksList';
import InfoAboutBook from './components/InfoAboutBook';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSubject: undefined,
            selectedBook: undefined,
        }
    }

    changeSubject(value) {
        this.setState({
            selectedSubject: value,
        });
    }

    booksListPart() {
        const { selectedSubject } = this.state;
        if (!selectedSubject) {
            return <div></div>;
        }
        return <BooksList selectedSub={selectedSubject} setId={this.setId.bind(this)}/>;
    }

    infoAboutBookPart() {
        const { selectedBook } = this.state;
        if (!selectedBook) {
            return <div></div>;
        }
        return <InfoAboutBook idValue={selectedBook}/>;

    }

    setId(id) {
        this.setState({
            selectedBook: id,
        });
    }

    render() {
        return (
          <div>
              <h1>Book App</h1>
              <DropdownSelection changeSub={this.changeSubject.bind(this)}/>
              {this.booksListPart()}
              <br/>
              {this.infoAboutBookPart()}
          </div>
        );
    }
}

export default App;
