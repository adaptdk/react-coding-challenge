import React from 'react'
import BookCollections from "./Components/BookCollections";
import NavBar from "./Components/AppBar";
import BookModal from "./Components/BookModal";

function App () {
  return (
      <div>
        <NavBar/>
        <BookCollections/>
         <BookModal/>
      </div>
  )
}

export default App;
