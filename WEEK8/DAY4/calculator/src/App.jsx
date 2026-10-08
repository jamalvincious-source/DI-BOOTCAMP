import { useState } from "react";

const operations = {
  add: { label: "Addition", symbol: "+", calculate: (a, b) => a + b },
  subtract: { label: "Subtraction", symbol: "−", calculate: (a, b) => a - b },
  multiply: { label: "Multiplication", symbol: "×", calculate: (a, b) => a * b },
  divide: { label: "Division", symbol: "÷", calculate: (a, b) => a / b },
};

function App() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setResult(null);

    if (firstNumber.trim() === "" || secondNumber.trim() === "") {
      setError("Enter both numbers to calculate.");
      return;
    }

    const first = Number(firstNumber);
    const second = Number(secondNumber);

    if (!Number.isFinite(first) || !Number.isFinite(second)) {
      setError("Please enter valid numbers.");
      return;
    }

    if (operation === "divide" && second === 0) {
      setError("A number cannot be divided by zero.");
      return;
    }

    const answer = operations[operation].calculate(first, second);
    setResult(Number.isFinite(answer) ? answer : "Result is too large to display.");
  }

  function handleInputChange(setValue) {
    return (event) => {
      setValue(event.target.value);
      setError("");
      setResult(null);
    };
  }

  return (
    <main className="page">
      <div className="decoration decoration-one" aria-hidden="true" />
      <div className="decoration decoration-two" aria-hidden="true" />
      <section className="calculator" aria-labelledby="calculator-title">
        <div className="brand-line"><span className="brand-icon">✳</span> EVERYDAY TOOLS</div>
        <h1 id="calculator-title">A little math,<br /><span>made simple.</span></h1>
        <p className="intro">Two numbers in. Your answer, right here.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="number-fields">
            <label>
              <span>FIRST NUMBER</span>
              <input
                type="number"
                inputMode="decimal"
                step="any"
                value={firstNumber}
                onChange={handleInputChange(setFirstNumber)}
                placeholder="e.g. 24"
                aria-label="First number"
              />
            </label>
            <div className="operator-mark" aria-hidden="true">{operations[operation].symbol}</div>
            <label>
              <span>SECOND NUMBER</span>
              <input
                type="number"
                inputMode="decimal"
                step="any"
                value={secondNumber}
                onChange={handleInputChange(setSecondNumber)}
                placeholder="e.g. 8"
                aria-label="Second number"
              />
            </label>
          </div>

          <label className="operation-select">
            <span>CHOOSE AN OPERATION</span>
            <select
              value={operation}
              onChange={(event) => {
                setOperation(event.target.value);
                setResult(null);
                setError("");
              }}
              aria-label="Operation"
            >
              {Object.entries(operations).map(([key, value]) => (
                <option value={key} key={key}>{value.label}</option>
              ))}
            </select>
          </label>

          <button className="calculate-button" type="submit">
            {operation === "add" ? "Add Them" : "Calculate"}
            <span aria-hidden="true">↗</span>
          </button>
        </form>

        <div className={`answer-panel${result !== null ? " has-result" : ""}`} aria-live="polite">
          {error ? (
            <p className="error-message" role="alert">{error}</p>
          ) : result !== null ? (
            <>
              <span className="answer-label">YOUR ANSWER</span>
              <p className="answer">{typeof result === "number" ? result.toLocaleString(undefined, { maximumFractionDigits: 10 }) : result}</p>
            </>
          ) : (
            <p className="answer-hint">Your answer will appear here</p>
          )}
        </div>
        <p className="footer-note">A fresh perspective on the everyday.</p>
      </section>
    </main>
  );
}

export default App;
