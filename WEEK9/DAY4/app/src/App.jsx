import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./features/users/userSlice.js";

function UserData() {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (status === "loading" || status === "idle") {
    return (
      <section className="profile-card status-card" aria-live="polite">
        <span className="spinner" aria-hidden="true" />
        <h2>Finding your profile</h2>
        <p>Fetching user details from the API…</p>
      </section>
    );
  }

  if (status === "failed") {
    return (
      <section className="profile-card status-card" aria-live="polite">
        <div className="status-icon error-icon" aria-hidden="true">!</div>
        <h2>We couldn’t load the user</h2>
        <p className="error-copy" role="alert">{error}</p>
        <button className="retry-button" type="button" onClick={() => dispatch(fetchUser())}>
          Try again <span aria-hidden="true">↗</span>
        </button>
      </section>
    );
  }

  return (
    <section className="profile-card" aria-labelledby="profile-name">
      <div className="profile-topline">
        <span className="status-pill"><span /> API CONNECTED</span>
        <span className="user-id">USER / {String(user.id).padStart(2, "0")}</span>
      </div>

      <div className="identity">
        <div className="avatar" aria-hidden="true">{user.name.charAt(0)}</div>
        <div>
          <p className="eyebrow">YOUR USER PROFILE</p>
          <h2 id="profile-name">{user.name}</h2>
          <p className="username">@{user.username}</p>
        </div>
      </div>

      <div className="details-grid">
        <div className="detail">
          <span className="detail-label">EMAIL</span>
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </div>
        <div className="detail">
          <span className="detail-label">PHONE</span>
          <a href={`tel:${user.phone}`}>{user.phone}</a>
        </div>
        <div className="detail">
          <span className="detail-label">COMPANY</span>
          <span>{user.company.name}</span>
        </div>
        <div className="detail">
          <span className="detail-label">LOCATION</span>
          <span>{user.address.city}, {user.address.street}</span>
        </div>
      </div>

      <a className="website-link" href={`https://${user.website}`} target="_blank" rel="noreferrer">
        Visit {user.website} <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}

export default function App() {
  return (
    <main className="page-shell">
      <div className="page-orb orb-one" aria-hidden="true" />
      <div className="page-orb orb-two" aria-hidden="true" />
      <div className="content">
        <header className="page-header">
          <a className="brand" href="/" aria-label="Redux Lab home">
            <span className="brand-mark" aria-hidden="true">r.</span>
            <span>REDUX LAB</span>
          </a>
          <span className="header-note">ASYNC DATA / EXERCISE 01</span>
        </header>

        <div className="intro">
          <p className="eyebrow">A LITTLE STATE OF THE ART</p>
          <h1>Meet your<br /><span>user data.</span></h1>
          <p className="intro-copy">
            One small request, a complete profile. Redux Thunk handles the async work;
            the store keeps everything in sync.
          </p>
        </div>

        <UserData />

        <footer className="page-footer">
          <span>POWERED BY REDUX TOOLKIT</span>
          <span>FETCH · STORE · DISPLAY</span>
        </footer>
      </div>
    </main>
  );
}
