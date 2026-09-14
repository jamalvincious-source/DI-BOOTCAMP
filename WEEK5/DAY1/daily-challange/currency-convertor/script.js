(function () {

  // 1. API configuration
  // Sign up for a free key at https://www.exchangerate-api.com/
  // and paste it below. Never commit a real key to a public repo.
  const API_KEY =  "be200c94b9eea33ced2c0229";
  const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

  // Sensible defaults so the app has something useful pre-selected.
  const DEFAULT_FROM = "USD";
  const DEFAULT_TO = "KES";

  // 2. DOM elements
  const amountInput = document.getElementById("amount");
  const fromSelect = document.getElementById("fromCurrency");
  const toSelect = document.getElementById("toCurrency");
  const swapBtn = document.getElementById("swapBtn");
  const convertBtn = document.getElementById("convertBtn");
  const boardMsg = document.getElementById("boardMsg");
  const boardResult = document.getElementById("boardResult");
  const boardCaption = document.getElementById("boardCaption");

  let isConverting = false;
  let lastConversionResult = null; // raw numeric result of the last successful conversion

  // --- small helpers for the board display ---

  function showBoardMessage(text) {
    boardMsg.textContent = text;
    boardMsg.classList.remove("hidden");
    boardResult.classList.add("hidden");
  }

  function showBoardResult(text, isError) {
    boardResult.textContent = text;
    boardResult.classList.remove("hidden", "error");
    if (isError) boardResult.classList.add("error");
    boardMsg.classList.add("hidden");
  }

  function setControlsEnabled(enabled) {
    fromSelect.disabled = !enabled;
    toSelect.disabled = !enabled;
    swapBtn.disabled = !enabled;
    convertBtn.disabled = !enabled;
  }

  // 3. Fetch supported currencies (first async source)
  async function loadCurrencies() {
    showBoardMessage("Fetching currency list…");
    try {
      const response = await fetch(`${BASE_URL}/codes`);
      if (!response.ok) {
        throw new Error("Could not load currency list");
      }
      const data = await response.json();
      populateSelects(data.supported_codes);
      showBoardMessage("Pick your currencies and hit Convert.");
      setControlsEnabled(true);
    } catch (err) {
      console.error(err);
      showBoardResult("Oh no! The currency list didn't load. Check your API key and connection.", true);
    }
  }

  // 4. Populate currency selects
  function populateSelects(codes) {
    // codes is an array of [code, name] pairs, e.g. ["USD", "United States Dollar"]
    fromSelect.innerHTML = "";
    toSelect.innerHTML = "";

    codes.forEach(function (pair) {
      const code = pair[0];
      const name = pair[1];

      const fromOption = document.createElement("option");
      fromOption.value = code;
      fromOption.textContent = `${code} — ${name}`;
      fromSelect.appendChild(fromOption);

      const toOption = document.createElement("option");
      toOption.value = code;
      toOption.textContent = `${code} — ${name}`;
      toSelect.appendChild(toOption);
    });

    fromSelect.value = DEFAULT_FROM;
    toSelect.value = DEFAULT_TO;
  }

  // 5. Convert currencies (second async source)
  async function convertCurrency() {
    if (isConverting) return;

    const amount = amountInput.value;
    const from = fromSelect.value;
    const to = toSelect.value;

    if (!amount || Number(amount) < 0) {
      showBoardResult("Enter a valid amount first.", true);
      return;
    }

    isConverting = true;
    convertBtn.disabled = true;
    showBoardMessage("Converting…");

    try {
      const response = await fetch(`${BASE_URL}/pair/${from}/${to}/${amount}`);
      if (!response.ok) {
        throw new Error("Conversion request failed");
      }
      const data = await response.json();

      if (data.result !== "success") {
        throw new Error("Conversion not available for that pair");
      }

      const formattedAmount = Number(amount).toLocaleString();
      const formattedResult = data.conversion_result.toLocaleString(undefined, {
        maximumFractionDigits: 2
      });

      showBoardResult(`${formattedAmount} ${from} = ${formattedResult} ${to}`, false);
      boardCaption.textContent = `1 ${from} = ${data.conversion_rate} ${to}`;
      lastConversionResult = data.conversion_result;
    } catch (err) {
      console.error(err);
      showBoardResult("Oh no! That conversion isn't available…", true);
      boardCaption.textContent = "";
      lastConversionResult = null;
    } finally {
      isConverting = false;
      convertBtn.disabled = false;
    }
  }

  // 6. Switch currencies (bonus)
  async function switchCurrencies() {
    const previousFrom = fromSelect.value;
    const previousTo = toSelect.value;

    fromSelect.value = previousTo;
    toSelect.value = previousFrom;

    // If we already have a converted amount on the board, carry that
    // value over as the new starting amount instead of reusing the old one.
    // e.g. "100 USD = 12,950 KES" becomes "12,950 KES → USD", not "100 KES → USD".
    if (lastConversionResult !== null) {
      amountInput.value = lastConversionResult;
    }

    await convertCurrency();
  }

  // 7. Event listeners
  convertBtn.addEventListener("click", convertCurrency);
  swapBtn.addEventListener("click", switchCurrencies);

  // 8. Initialize application
  setControlsEnabled(false);
  loadCurrencies();

})();
