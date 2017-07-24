import React, { Component } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor   : '#f4ce42'
  }
};

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {subjects: [],books: [],displayedBooks:[],selectedSubjects:[],selectedBook: null};


     var subjects = new Promise((resolve, reject) => {
      fetch('http://localhost:3010/subjects')
    .then(function(response) { return response.json(); })
    .then(function(json) {
        resolve(json)
      }
    );
   });

      var books = new Promise((resolve, reject) => {
      fetch('http://localhost:3010/books')
    .then(function(response) { return response.json(); })
    .then(function(json) {
        resolve(json)
      }
    );
   });
     
     subjects.then((result) => {
      this.setState({subjects: result})

    });

     books.then((result) => {
      this.setState({books: result})
      console.log('selected book',this.state.selectedBook)
      
      

    });



    this.setState({modalIsOpen: false});



    
    //this.openModal = this.openModal.bind(this);   
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);



  }

  openModal(e) {

    
    this.setState({selectedBook:e});


    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }



  onItemClick(e) {  
       var currentBooks = this.state.displayedBooks;
       var currentSubjects = this.state.selectedSubjects;     
    if (this.refs[e].value == "not-selected") {
      this.refs[e].value = "selected";
      this.refs[e].className = "glyphicon glyphicon-ok";
      currentSubjects.push(e); 
      for (var i = 0; i < this.state.books.length; i++) {
        if (this.state.books[i].subjects.includes(e) && !currentBooks.includes(this.state.books[i])) {

          currentBooks.push(this.state.books[i]);
          
        }
    }
    }
    else {
      currentSubjects = currentSubjects.filter((subject) => subject != e);
      currentBooks = currentBooks.filter((book) => {
        var subjectIncludes = false;
        for (var i = 0; i <= currentSubjects.length; i++)
        {
          if (book.subjects.includes(currentSubjects[i])) subjectIncludes = true;
        }
        return subjectIncludes;
      })


      this.refs[e].className = "";
      this.refs[e].value = "not-selected";

    }

    this.setState({selectedSubjects: currentSubjects})
    this.setState({displayedBooks: currentBooks})
   
    




  }




  render() {
   var buttons = this.state.subjects.map((subject) => {
      let boundItemClick = this.onItemClick.bind(this,subject);
      return(<button ref={subject} key={subject} onClick={boundItemClick} value="not-selected">
        {subject}
      </button>);
      }
      );

      var books = this.state.displayedBooks.map((book) =>{
        let openModal = this.openModal.bind(this,book);

        return(<div className="flex-item">
          <p className="book-title">{book.title}</p>
          <p>{book.subjects}</p>
          <button  onClick={openModal}>Select</button>

          
        </div>)
      });

      var modal  = <div></div>
      
      if (this.state.selectedBook != null) {
           modal = <Modal 
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>{this.state.selectedBook.title}</h2>
          
          <div>Edit details</div>
          <form>
            Title<input value={this.state.selectedBook.title} />
            <ul>
             Authors:
             <br/>
            {this.state.selectedBook.authors.map(function(author)
              {
                return(<li>Author: <input value={author.name}/></li>)
              })
          }
          BookShelves:
          <br/>
          {this.state.selectedBook.bookshelves.map(function(bs)
              {
                return(<li>BookShelve: <input value={bs}/></li>)
              })
          }

          </ul>

          </form>
          <button onClick={this.closeModal}>close</button>
        </Modal>
      }





   




 

    return (

       <div>
        <div>{buttons}</div>
        <div className="flex-container">{books}</div>
        <div>{modal}</div>
       </div>
    );
    } 
  
};

export default Display;