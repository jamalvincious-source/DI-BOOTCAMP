import React, { Component } from "react";
import data from "./data.json";

class Example3 extends Component {
  render() {
    return (
      <div>
        <h2>Experiences</h2>
        {data.Experiences.map((experience, expIndex) => (
          <div key={expIndex}>
            <h3>{experience.companyName}</h3>
            <img
              src={experience.logo}
              alt={experience.companyName}
              width="80"
            />
            <p>
              <a href={experience.url} target="_blank" rel="noreferrer">
                {experience.url}
              </a>
            </p>
            {experience.roles.map((role, roleIndex) => (
              <div key={`${expIndex}-${roleIndex}`}>
                <p>
                  <strong>{role.title}</strong>
                </p>
                <p>{role.description}</p>
                <p>
                  {role.startDate} - {role.endDate}
                </p>
                <p>{role.location}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Example3;
