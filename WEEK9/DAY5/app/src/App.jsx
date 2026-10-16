import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ageDownAsync, ageUpAsync } from "./features/age/ageSlice.js";

function AgeDisplay() {
  const { age, loading } = useSelector((state) => state.age);

  return (
    <section className="age-card" aria-busy={loading} aria-label="Age tracker">
      <div className="card-topline">
        <span className="live-indicator"><span /> LIVE TRACKER</span>
        <span className="card-index">NO. 001</span>
      </div>

      <div className="age-reading" aria-live="polite" aria-atomic="true">
        <p className="age-label">YOUR AGE</p>
        <div className="age-value-row">
          <span className={`age-value${loading ? " is-updating" : ""}`}>{age}</span>
          <span className="age-unit">years</span>
        </div>
      </div>

      <div className="update-note" aria-live="polite">
        {loading ? (
          <>
            <span className="spinner" aria-hidden="true" />
            <span>Updating your age…</span>
          </>
        ) : (
          <>
            <span className="ready-mark" aria-hidden="true">✓</span>
            <span>All up to date</span>
          </>
        )}
      </div>
    </section>
  );
}

function AgeControls() {
  const dispatch = useDispatch();
  const { age, loading } = useSelector((state) => state.age);

  function handleSubmit(event) {
    event.preventDefault();
    if (!loading) dispatch(ageUpAsync());
  }

  return (
    <form className="controls" onSubmit={handleSubmit}>
      <p className="controls-label">MAKE A CHANGE</p>
      <div className="button-row">
        <button
          className="control-button increase-button"
          type="submit"
          disabled={loading}
        >
          <span className="button-symbol" aria-hidden="true">+</span>
          <span>Age Up</span>
          <span className="button-arrow" aria-hidden="true">↗</span>
        </button>
        <button
          className="control-button decrease-button"
          type="button"
          onClick={() => dispatch(ageDownAsync())}
          disabled={loading || age === 0}
        >
          <span className="button-symbol" aria-hidden="true">−</span>
          <span>Age Down</span>
          <span className="button-arrow" aria-hidden="true">↘</span>
        </button>
      </div>
      <p className="helper-text">Each update takes a moment. Good things do.</p>
    </form>
  );
}

export default function App() {
  const error = useSelector((state) => state.age.error);

  return (
    <main className="page-shell">
      <div className="background-shape shape-one" aria-hidden="true" />
      <div className="background-shape shape-two" aria-hidden="true" />
      <div className="content">
        <header className="site-header">
          <a className="brand" href="/" aria-label="Little by Little home">
            <span className="brand-symbol" aria-hidden="true">+</span>
            <span>LITTLE BY LITTLE</span>
          </a>
          <span className="exercise-tag">REDUX TOOLKIT / DAILY CHALLENGE</span>
        </header>

        <section className="intro">
          <p className="eyebrow">A MOMENT IN TIME</p>
          <h1>Growing,<br /><span>one click at a time.</span></h1>
          <p className="intro-copy">
            Age is just a number. Change yours and watch Redux handle the wait.
          </p>
        </section>

        <AgeDisplay />
        {error && <p className="error-message" role="alert">{error}</p>}
        <AgeControls />

        <footer className="site-footer">
          <span>ASYNC ACTIONS, CALM STATE</span>
          <span>AGE TRACKER · 2026</span>
        </footer>
      </div>
    </main>
  );
}
