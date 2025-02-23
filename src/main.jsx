// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { Redux, ReactRedux } from "../study/index.js";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <HashRouter>
    <App />
    <Redux />
    {/* <ReactRedux /> */}
  </HashRouter>
  // </StrictMode>
);
