import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ScrollToTop from "../src/components/Scroll/ScrollToTop";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // notification dependency
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // Wrap the application with BrowserRouter for routing
  <BrowserRouter>
    {/* Add the ScrollToTop component to handle scrolling behavior */}
    <ScrollToTop />
    {/* Render the main App component */}
    <App />
    {/* Add the ToastContainer for displaying toast notifications */}
    <ToastContainer autoClose={3000} />
  </BrowserRouter>
);
