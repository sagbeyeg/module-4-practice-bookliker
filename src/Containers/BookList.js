import React, { Component } from 'react';
import {
  Menu
} from "semantic-ui-react";

class BookList extends Component { 
  render() {
    return (
      <div>
        <Menu vertical inverted>
          {this.props.books.map((book) => 
            <Menu.Item as={"a"} onClick={this.props.renderBook}>
              {book.title}
            </Menu.Item>, 
          )}
        </Menu>
      </div>
    );
  }
}

export default BookList;