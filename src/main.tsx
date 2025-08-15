import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Assuming you have an index.css for global styles
import App from "./App.js";

const rootElement = document.getElementById("root");
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
} else {
    throw new Error('Root element not found');
}
