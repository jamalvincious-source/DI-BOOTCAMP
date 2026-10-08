import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "Life is what happens when you are busy making other plans.", author: "John Lennon" },
  { text: "Do not wait for the perfect moment. Take the moment and make it perfect.", author: "Zoey Sayward" },
  { text: "What you do today can improve all your tomorrows.", author: "Ralph Marston" }
];

const colorPalettes = [
  { background: "#f8fafc", quote: "#1d4ed8", button: "#2563eb" },
  { background: "#fff7ed", quote: "#c2410c", button: "#ea580c" },
  { background: "#f5f3ff", quote: "#6d28d9", button: "#7c3aed" },
  { background: "#f0fdf4", quote: "#15803d", button: "#16a34a" },
  { background: "#fff1f2", quote: "#be123c", button: "#e11d48" },
  { background: "#ecfeff", quote: "#0f766e", button: "#14b8a6" }
];

function App() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [paletteIndex, setPaletteIndex] = useState(0);

  const currentQuote = quotes[quoteIndex];
  const palette = colorPalettes[paletteIndex];

  function getNewQuote() {
    let nextIndex = quoteIndex;

    while (nextIndex === quoteIndex) {
      nextIndex = Math.floor(Math.random() * quotes.length);
    }

    setQuoteIndex(nextIndex);

    let nextPalette = paletteIndex;
    while (nextPalette === paletteIndex) {
      nextPalette = Math.floor(Math.random() * colorPalettes.length);
    }

    setPaletteIndex(nextPalette);
  }

  return (
    <main
      className="app"
      style={{ backgroundColor: palette.background, color: palette.quote }}
    >
      <section className="quote-box">
        <h1>Random Quote</h1>
        <blockquote style={{ color: palette.quote }}>{currentQuote.text}</blockquote>
        <p className="author">- {currentQuote.author}</p>
        <button
          type="button"
          onClick={getNewQuote}
          style={{ backgroundColor: palette.button }}
        >
          New Quote
        </button>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
