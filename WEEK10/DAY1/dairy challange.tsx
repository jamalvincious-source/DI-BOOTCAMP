import { useRef, useState } from "react";
import type { FormEvent, Key, ReactNode } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
}

interface ListProps<T> {
  items: T[];
  getKey: (item: T) => Key;
  renderItem: (item: T) => ReactNode;
}

function List<T>({ items, getKey, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item) => (
        <li key={getKey(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

const initialBooks: Book[] = [
  { id: 1, title: "Pride and Prejudice", author: "Jane Austen" },
  { id: 2, title: "Things Fall Apart", author: "Chinua Achebe" },
  { id: 3, title: "The Hobbit", author: "J. R. R. Tolkien" },
];

export default function BookApp() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const nextBookId = useRef(initialBooks.length + 1);

  function addBook(): void {
    const trimmedTitle = title.trim();
    const trimmedAuthor = author.trim();

    if (!trimmedTitle || !trimmedAuthor) {
      return;
    }

    const newBook: Book = {
      id: nextBookId.current,
      title: trimmedTitle,
      author: trimmedAuthor,
    };
    nextBookId.current += 1;
    setBooks((currentBooks: Book[]) => [...currentBooks, newBook]);
    setTitle("");
    setAuthor("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    addBook();
  }

  return (
    <main>
      <h1>Book List</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Book title
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </label>
        <label>
          Author
          <input
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            required
          />
        </label>
        <button type="submit">Add book</button>
      </form>

      <h2>Books ({books.length})</h2>
      <List<Book>
        items={books}
        getKey={(book) => book.id}
        renderItem={(book) => (
          <article>
            <h3>{book.title}</h3>
            <p>by {book.author}</p>
          </article>
        )}
      />
    </main>
  );
}