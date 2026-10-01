import React, { Component } from 'react';
import './Exercise.css';

const style_header = {
  color: 'white',
  backgroundColor: 'DodgerBlue',
  padding: '10px',
  fontFamily: 'Arial',
};

class Exercise extends Component {
  render() {
    return (
      <>
        <h1 id="exercise-3-title" style={style_header}>This is a title</h1>
        <p className="para">This is a paragraph with some text.</p>
        <a href="https://www.example.com">Visit Example.com</a>
        <form onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="exercise-name">Name: </label>
          <input id="exercise-name" name="name" type="text" />
          <button type="submit">Submit</button>
        </form>
        <img
          src="https://picsum.photos/200"
          alt="Random landscape"
          width="200"
          height="200"
        />
        <ul>
          <li>First item</li>
          <li>Second item</li>
          <li>Third item</li>
        </ul>
      </>
    );
  }
}

export default Exercise;
