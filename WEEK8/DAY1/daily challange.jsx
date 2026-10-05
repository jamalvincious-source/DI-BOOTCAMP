import React, { useState } from "react";

const FormComponent = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Age:
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Male
        <input
          type="radio"
          name="gender"
          value="male"
          checked={formData.gender === "male"}
          onChange={handleChange}
        />
      </label>
      <label>
        Female
        <input
          type="radio"
          name="gender"
          value="female"
          checked={formData.gender === "female"}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Destination:
        <select
          name="destination"
          value={formData.destination}
          onChange={handleChange}
        >
          <option value="">Select a destination</option>
          <option value="Japan">Japan</option>
          <option value="France">France</option>
          <option value="USA">USA</option>
          <option value="Brazil">Brazil</option>
        </select>
      </label>
      <br />

      <label>
        Lactose Free:
        <input
          type="checkbox"
          name="lactoseFree"
          checked={formData.lactoseFree}
          onChange={handleChange}
        />
      </label>
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "male",
    destination: "Japan",
    lactoseFree: false
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();
    params.set("firstName", formData.firstName);
    params.set("lastName", formData.lastName);
    params.set("age", formData.age);
    params.set("gender", formData.gender);
    params.set("destination", formData.destination);
    params.set("lactoseFree", formData.lactoseFree ? "on" : "off");

    window.location.search = `?${params.toString()}`;
  };

  return (
    <div>
      <h2>Form Data</h2>
      <FormComponent
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <div>
        <h3>Entered Data</h3>
        <p>First Name: {formData.firstName}</p>
        <p>Last Name: {formData.lastName}</p>
        <p>Age: {formData.age}</p>
        <p>Gender: {formData.gender}</p>
        <p>Destination: {formData.destination}</p>
        <p>Lactose Free: {formData.lactoseFree ? "on" : "off"}</p>
      </div>
    </div>
  );
}

export default App;
