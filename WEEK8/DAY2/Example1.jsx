import React, { Component } from "react";
import data from "./data.json";

class Example1 extends Component {
  render() {
    return (
      <div>
        <h2>SocialMedias</h2>
        <ul>
          {data.SocialMedias.map((social, index) => (
            <li key={index}>
              <a href={social} target="_blank" rel="noreferrer">
                {social}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Example1;
