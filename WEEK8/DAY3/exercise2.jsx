import { useRef, useState } from "react";

function Exercise2() {
  const inputRef = useRef(null);
  const [characterCount, setCharacterCount] = useState(0);

  function handleInput() {
    if (inputRef.current) {
      setCharacterCount(inputRef.current.value.length);
    }
  }

  return (
    <main>
      <h1>Character Counter</h1>
      <label htmlFor="character-input">Enter some text</label>
      <input
        id="character-input"
        ref={inputRef}
        onInput={handleInput}
        type="text"
        placeholder="Start typing..."
      />
      <p aria-live="polite">Characters: {characterCount}</p>
    </main>
  );
}

export default Exercise2;
