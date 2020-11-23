import React, { Component } from 'react';
import {
  Container,
  Header,
  Button,
  List,
  Image
} from "semantic-ui-react";

class Book extends Component {
  render() {
    // const {book} = this.props
    return (
      <Container text>
        <Header>{this.props.book.title}</Header>
        <Image
          src={this.props.book.img_url}
          size="small"
        />
        <p>{this.props.book.description}</p>
        <Button
          color="red"
          content="Like"
          icon="heart"
          label={{
            basic: true,
            color: "red",
            pointing: "left",
            content: "2,048"
          }}
          onClick={this.props.clickHandler}
        />
        <Header>Liked by</Header>
        <List>
          {this.props.book.users.map(user => <List.Item icon="user" content={user.username} />)}
        </List>
      </Container>    
    );
  }
}

export default Book;