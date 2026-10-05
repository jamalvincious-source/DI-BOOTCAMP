import React, { Component } from "react";

class FavoriteColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteColor: "red"
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ favoriteColor: "yellow" });
    }, 1000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("in getSnapshotBeforeUpdate");
    console.log("Previous color:", prevState.favoriteColor);
    return prevState.favoriteColor;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("after update");
    console.log("Snapshot:", snapshot);
    console.log("Current color:", this.state.favoriteColor);
  }

  changeColor = () => {
    this.setState({ favoriteColor: "blue" });
  };

  render() {
    return (
      <div>
        <h2>My favorite color is {this.state.favoriteColor}</h2>
        <button onClick={this.changeColor}>Change color</button>
      </div>
    );
  }
}

export default FavoriteColor;
