import React, { Component } from "react";
import data from "./data.json";

class Example2 extends Component {
  render() {
    return (
      <div>
        <h2>Skills</h2>
        {data.Skills.map((skillGroup, groupIndex) => (
          <div key={groupIndex}>
            <h3>{skillGroup.Area}</h3>
            <ul>
              {skillGroup.SkillSet.map((skill, index) => (
                <li key={`${groupIndex}-${index}`}>
                  {skill.Name} {skill.Hot ? "(Hot)" : ""}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default Example2;
