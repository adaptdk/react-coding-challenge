import React, { Component } from 'react';
import 'components/app/App.css';
import BookList from 'components/books/BookList';
import BookDetails from 'components/books/BookDetails';
import CategorySelector from '../books/CategorySelector';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: undefined,
      selectedItem: undefined
    }
  }

  setCategory(category) {
    this.setState({ selectedCategory: category });
  }

  setSelectedItem(item) {
    if (this.state.selectedItem !== undefined) {
      if (item.id === this.state.selectedItem.id) {
        item = undefined
      }
    }
    this.setState({ selectedItem: item })
  }

  renderBookList() {
    const { selectedCategory } = this.state
    if (!selectedCategory) {
      return null;
    }
    return <BookList setSelectedItem={this.setSelectedItem.bind(this)} selectedCategory={selectedCategory} />;
  }

  renderBookDetails() {
    const { selectedItem } = this.state
    if (!selectedItem) {
      return null;
    }
    return <BookDetails book={selectedItem} />
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>My Reading List</h1>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <CategorySelector setCategory={this.setCategory.bind(this)} />
          </div>
        </div>
        {this.renderBookList()}
        <hr />
        {this.renderBookDetails()}
      </div>
    );
  }
}

export default App;
