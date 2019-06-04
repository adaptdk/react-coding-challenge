import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchingSubjects, fetchBooks} from '../redux';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBook: null
    }
  }
  componentDidMount() {
      this.props.makeRequestToServer();
    }
  renderSubjectButtons = (subjectsList) => {
    const subjectButtons = subjectsList.map((subject, i)=> {
      return (
        <button key={i} className="subjectsButtons" value={subject} onClick={e=>{this.props.fetchBooks(e.target.value)}}>{subject}</button>
      )
    });
    return subjectButtons;
  } 
  renderTitlestButtons = (booksList) => {
    const titleButtons = booksList.map((book, i)=> {
      return (
        <button key={i} className="titelsButtons" value={book.title} onClick={e=>{this.showBook(e.target.value)}}>{book.title}</button>
      )
    });
    return titleButtons;
  } 
  showBook = (bookName) => {
    const bookIndex = this.props.booksList.findIndex(item=>item.title === bookName);
    if (bookIndex !== -1) {
      this.setState({
        currentBook: this.props.booksList[bookIndex]
      });
    }
  }
  renderCurrentBook = (book) => {
    let authors =""
    let languages="" 
    let bookshelves=""

    if (book.authors) { 
       authors = book.authors.map(a=>a.name);
    }
    if (book.languages) {
       languages = book.languages.map(a=>a);
    }
    if (book.bookshelves) {
       bookshelves = book.bookshelves.map(a=>a);
    }
    return (
      <div className="currentBookInfoInnerDiv" >

        {book.title &&     
        <div className="bookInfOutBox">
          <div className="bookInfInBox">Title:</div>
          <div className="actualInfo">{book.title}</div>
        </div>}
        {authors && 
        <div className="bookInfOutBox">
          <div className="bookInfInBox">Authors:</div>
          <div className="actualInfo" >{authors}</div>
        </div>}
        {languages &&
        <div className="bookInfOutBox">
          <div className="bookInfInBox">Languages:</div>
          <div className="actualInfo" >{languages}</div>
        </div>}
        {bookshelves &&
        <div className="bookInfOutBox">
          <div className="bookInfInBox">Bookshelves:</div>
          <div className="actualInfo" >{bookshelves}</div>
        </div>
      }
    <div className="bookImgDiv" >
    {authors=="Austen, Jane" && <img className="bookImg" src={`http://prodimage.images-bn.com/pimages/9781499369748_p0_v3_s1200x630.jpg`}/>}
    {authors=="Thompson, Silvanus P. (Silvanus Phillips)" && <img  className="bookImg" src={`https://prodimage.images-bn.com/pimages/9780359077977_p0_v1_s550x406.jpg`}/>}
    {authors=="Carroll, Lewis" && <img  className="bookImg" src={`http://prodimage.images-bn.com/pimages/9780486416588_p0_v2_s1200x630.jpg`}/>}
    {authors=="Twain, Mark" && <img  className="bookImg" src={`http://www.setonbooks.com/sempics/M-HSEN-0118120.jpg`}/>}
    </div>
      </div> 
  )}
    render() {
      const {list, booksList} = this.props;
      const {currentBook} = this.state;
      console.log("currentBook", currentBook);
      return (
        <div className="mainDiv">
          <div className="buttonDiv">
            {list.length > 0 && this.renderSubjectButtons(list)}
          </div>
          <div className="titelsDiv"> 
          {booksList.length > 0 && this.renderTitlestButtons(booksList)}
          </div>
          <div className="currentBookInfoDiv" >{currentBook && this.renderCurrentBook(currentBook)}</div>
          </div>
      )
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      makeRequestToServer: ()=>dispatch(fetchingSubjects()),
      fetchBooks: (subject) => dispatch(fetchBooks(subject.toString()))
    }
  }

  const mapStateToProps = state => {
    return {
      list: state.subjects,
      booksList: state.currentBooks,
      fictionList:state.fiction,
      scienceList:state.science,
    }
  }
  export const MainContainer = connect(mapStateToProps,mapDispatchToProps)(Main)

 