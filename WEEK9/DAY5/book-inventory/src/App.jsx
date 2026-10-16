import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectBooks,
  selectFantasyBooks,
  selectHorrorBooks,
  selectScienceFictionBooks,
} from "./features/books/bookSelectors.js";

const collections = [
  { id: "all", label: "All books", selector: selectBooks },
  { id: "horror", label: "Horror", selector: selectHorrorBooks },
  { id: "fantasy", label: "Fantasy", selector: selectFantasyBooks },
  { id: "science-fiction", label: "Science Fiction", selector: selectScienceFictionBooks },
];

function BookCard({ book, index }) {
  return (
    <article className="book-card">
      <div className={`book-cover cover-${book.color}`}>
        <span className="cover-number">{String(index + 1).padStart(2, "0")}</span>
        <span className="cover-mark" aria-hidden="true">{book.mark}</span>
        <span className="cover-genre">{book.genre}</span>
      </div>
      <div className="book-info">
        <p className="book-genre">{book.genre}</p>
        <h3>{book.title}</h3>
        <p className="book-author">by {book.author}</p>
      </div>
    </article>
  );
}

function BookList({ books }) {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <span aria-hidden="true">✳</span>
        <p>No books in this collection yet.</p>
      </div>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book, index) => (
        <BookCard book={book} index={index} key={book.id} />
      ))}
    </div>
  );
}

export default function App() {
  const [activeCollection, setActiveCollection] = useState("all");
  const activeSelector = collections.find(
    (collection) => collection.id === activeCollection,
  ).selector;
  const books = useSelector(activeSelector);
  const totalBooks = useSelector(selectBooks).length;

  return (
    <main className="page">
      <div className="page-glow glow-one" aria-hidden="true" />
      <div className="page-glow glow-two" aria-hidden="true" />
      <div className="layout">
        <header className="site-header">
          <a className="brand" href="/" aria-label="Between the Lines home">
            <span className="brand-icon" aria-hidden="true">b.</span>
            <span>BETWEEN THE LINES</span>
          </a>
          <span className="header-label">A LITTLE LIBRARY / NO. 01</span>
        </header>

        <section className="intro">
          <p className="eyebrow">THE READING ROOM</p>
          <h1>Stories for<br /><span>every kind of curious.</span></h1>
          <p className="intro-copy">
            A small collection with big worlds inside. Pick a shelf and see what calls to you.
          </p>
        </section>

        <section className="collection" aria-labelledby="collection-heading">
          <div className="collection-heading">
            <div>
              <p className="eyebrow">THE COLLECTION</p>
              <h2 id="collection-heading">Browse the shelves</h2>
            </div>
            <p className="inventory-total"><span>{totalBooks}</span> BOOKS IN LIBRARY</p>
          </div>

          <div className="filter-bar" role="group" aria-label="Filter books by genre">
            {collections.map((collection) => (
              <button
                aria-pressed={activeCollection === collection.id}
                className={`filter-button${activeCollection === collection.id ? " active" : ""}`}
                key={collection.id}
                onClick={() => setActiveCollection(collection.id)}
                type="button"
              >
                {collection.label}
                {collection.id === "all" && <span>{totalBooks}</span>}
              </button>
            ))}
          </div>

          <div className="results-heading" aria-live="polite">
            <span>{collections.find((collection) => collection.id === activeCollection).label}</span>
            <span>{books.length} {books.length === 1 ? "BOOK" : "BOOKS"}</span>
          </div>

          <BookList books={books} />
        </section>

        <footer className="site-footer">
          <span>THOUGHTFULLY SORTED WITH REDUX TOOLKIT</span>
          <span>TURN THE PAGE ↗</span>
        </footer>
      </div>
    </main>
  );
}
