import React, { Component } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    console.log("Error caught by the boundary:", error, info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger mt-3">
          <h2>Something went wrong.</h2>
          <p>Please try another page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

function HomeScreen() {
  return <h1>Home</h1>;
}

function ProfileScreen() {
  return <h1>Profile</h1>;
}

function ShopScreen() {
  throw new Error("Shop page crashed");
}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <div className="container-fluid">
          <NavLink className="nav-link text-white" to="/">
            Home
          </NavLink>
          <NavLink className="nav-link text-white" to="/profile">
            Profile
          </NavLink>
          <NavLink className="nav-link text-white" to="/shop">
            Shop
          </NavLink>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<ErrorBoundary><HomeScreen /></ErrorBoundary>} />
          <Route path="/profile" element={<ErrorBoundary><ProfileScreen /></ErrorBoundary>} />
          <Route path="/shop" element={<ErrorBoundary><ShopScreen /></ErrorBoundary>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
