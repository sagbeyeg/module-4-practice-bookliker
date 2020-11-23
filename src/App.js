import React from "react";
import Book from "./Components/Book";
import {
  Menu
} from "semantic-ui-react";
import BookList from './Containers/BookList'

class App extends React.Component{
  state = {
    books: [],
    currentBook: {
      id: '',
      title: 'Book title',
      description: 'Book description',
      img_url: 'https://react.semantic-ui.com/images/wireframe/image.png',
      users: [],
      liked: ''
  },
    
  }

  componentDidMount = () => {
    const books = 'http://localhost:3000/books'

    fetch(books)
    .then(resp => resp.json())
    .then(books => {
      this.setState({
        books: books
      }, 
      // () => console.log(this.state.books)
      )
    })
  }

  renderBook = (e) => {
    const title = e.target.innerText
    const currentBook = this.state.books.find(book => book.title === title)
    console.log(currentBook)

    this.setState({
      currentBook: {
        id: currentBook.id,
        title: currentBook.title,
        description: currentBook.description,
        img_url: currentBook.img_url,
        users: currentBook.users,
        liked: false
      }
    }, ()=>console.log(this.state))
  }
  
  
  clickHandler = () => {
    const bookId = this.state.currentBook.id
    console.log(this.state.currentBook.liked)
    if (this.state.currentBook.liked === false) {
      console.log("You clicked me")
      const configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json"
        },
        body: JSON.stringify({
          users: [...this.state.currentBook.users, {id: 1, username: "pouros"}]
        })
      }
      
      fetch(`http://localhost:3000/books/${bookId}`, configObj)
      .then(resp => resp.json())
      .then(bookObj => {
        console.log(bookObj)
        let copiedArray = this.state.books
        let oldBook = copiedArray.findIndex(oldBook => oldBook.id === bookObj.id)
        copiedArray[oldBook] = bookObj
        this.setState({
          currentBook: {...this.state.currentBook,
            liked: true,
            users: [...this.state.currentBook.users, {id: 1, username:"pouros"}]
          }
        })
      })
    } else {
      let userToRemove = {id: 1, username:"pouros"}
      const configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json"
        },
        body: JSON.stringify({
          users: this.state.currentBook.users.slice(0, -1)
        })
      }

      fetch(`http://localhost:3000/books/${bookId}`, configObj)
      .then(resp => resp.json())
      .then(bookObj => {
        console.log(bookObj)
        let copiedArray = this.state.books
        let oldBook = copiedArray.findIndex(oldBook => oldBook.id === bookObj.id)
        copiedArray[oldBook] = bookObj
        this.setState({
          currentBook: {...this.state.currentBook,
            liked: false,
            users: this.state.currentBook.users.slice(0, -1)
          }
        })
      })
    }
  }
  
  render(){
    return (
      <div>
        <Menu inverted>
          <Menu.Item header>Bookliker</Menu.Item>
        </Menu>
        <main>
          <BookList books={this.state.books} renderBook={this.renderBook}/>
          <Book book={this.state.currentBook} clickHandler={this.clickHandler}/>
        </main>
      </div>
    );
  }
}

export default App;
