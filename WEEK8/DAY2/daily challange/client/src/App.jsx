import React, { Component } from 'react';

class App extends Component {
  state = {
    message: '',
    input: '',
    response: ''
  };

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:5000/api/hello');
      const data = await res.json();
      this.setState({ message: data.message });
    } catch (error) {
      console.error('Error fetching /api/hello:', error);
    }
  }

  handleChange = (event) => {
    this.setState({ input: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/world', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: this.state.input })
      });

      const data = await res.json();
      this.setState({ response: data.message });
    } catch (error) {
      console.error('Error posting to /api/world:', error);
    }
  };

  render() {
    return (
      <div style={{ padding: '30px', fontFamily: 'Arial' }}>
        <h1>{this.state.message}</h1>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.input}
            onChange={this.handleChange}
            placeholder="Type something"
            style={{ padding: '10px', width: '300px', marginRight: '10px' }}
          />
          <button type="submit">Submit</button>
        </form>

        {this.state.response && (
          <p style={{ marginTop: '20px', fontWeight: 'bold' }}>
            {this.state.response}
          </p>
        )}
      </div>
    );
  }
}

export default App;
