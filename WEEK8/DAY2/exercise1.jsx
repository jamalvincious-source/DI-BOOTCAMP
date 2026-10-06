import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import ErrorBoundary from "./ErrorBoundary";

// Functional components
const HomeScreen = () => <h1>home</h1>;
const ProfileScreen = () => <h1>profile</h1>;
const ShopScreen = () => {
  throw new Error("Shop component crashed!");
  return <h1>shop</h1>;
};

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark">
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
          <Nav.Link as={NavLink} to="/shop">Shop</Nav.Link>
        </Nav>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <HomeScreen />
            </ErrorBoundary>
          }
        />
        <Route
          path="/profile"
          element={
            <ErrorBoundary>
              <ProfileScreen />
            </ErrorBoundary>
          }
        />
        <Route
          path="/shop"
          element={
            <ErrorBoundary>
              <ShopScreen />
            </ErrorBoundary>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
