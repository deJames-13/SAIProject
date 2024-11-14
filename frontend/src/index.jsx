import { StyledEngineProvider } from '@mui/material/styles';
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import 'regenerator-runtime/runtime';
import App from "./App";
import "./index.css";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "./context";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <StyledEngineProvider injectFirst>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </StyledEngineProvider>
  </BrowserRouter>
);
