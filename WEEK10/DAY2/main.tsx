import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DailyChallengeProject from "./daily challange project";
import "./daily-challenge.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element was not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <DailyChallengeProject />
  </StrictMode>,
);
